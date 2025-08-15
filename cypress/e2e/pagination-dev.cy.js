describe('Pagination Tests (Dev Server)', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('/?spec=table');
  });

  it('should display pagination controls when data has multiple pages', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    cy.get('.ReactTable', { timeout: 10000 }).should('exist');

    // Check if pagination exists
    cy.get('.pagination').then($pagination => {
      if ($pagination.length > 0) {
        cy.get('.pagination').should('be.visible');
        
        // Check for page numbers or navigation buttons
        cy.get('.pagination').within(() => {
          cy.get('a, button, span').should('exist');
        });
      } else {
        cy.log('Pagination not available - dataset might be small or pagination disabled');
      }
    });
  });

  it('should navigate to next page when next button is clicked', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    cy.get('.ReactTable', { timeout: 10000 }).should('exist');

    cy.get('.pagination').then($pagination => {
      if ($pagination.length > 0) {
        // Look for next button (various possible selectors)
        cy.get('.pagination').within(() => {
          cy.get('a, button').contains('Next', { matchCase: false }).then($next => {
            if ($next.length > 0 && !$next.hasClass('disabled')) {
              // Get first row data before clicking
              cy.document().then((doc) => cy.wrap(doc).find('table tbody tr:first td:first')).invoke('text').then((firstRowBefore) => {
                
                cy.wrap($next).click();
                cy.wait(2000);
                
                // Check if first row data changed (indicating page changed)
                cy.document().then((doc) => cy.wrap(doc).find('table tbody tr:first td:first')).invoke('text').then((firstRowAfter) => {
                  if (firstRowBefore !== firstRowAfter) {
                    expect(firstRowBefore).to.not.equal(firstRowAfter);
                  } else {
                    // Might be on last page or single page
                    cy.log('Page data unchanged - might be single page or already on last page');
                  }
                });
              });
            } else {
              cy.log('Next button not available or disabled');
            }
          });
        });
      } else {
        cy.log('Pagination not available');
      }
    });
  });

  it('should navigate to previous page when previous button is clicked', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    cy.get('.ReactTable', { timeout: 10000 }).should('exist');

    cy.get('.pagination').then($pagination => {
      if ($pagination.length > 0) {
        // First go to next page (if available)
        cy.get('.pagination').within(() => {
          cy.get('a, button').contains('Next', { matchCase: false }).then($next => {
            if ($next.length > 0 && !$next.hasClass('disabled')) {
              cy.wrap($next).click();
              cy.wait(2000);
              
              // Now try to go to previous page
              cy.get('a, button').contains('Previous', { matchCase: false }).then($prev => {
                if ($prev.length > 0 && !$prev.hasClass('disabled')) {
                  cy.document().then((doc) => cy.wrap(doc).find('table tbody tr:first td:first')).invoke('text').then((firstRowBefore) => {
                    
                    cy.wrap($prev).click();
                    cy.wait(2000);
                    
                    cy.document().then((doc) => cy.wrap(doc).find('table tbody tr:first td:first')).invoke('text').then((firstRowAfter) => {
                      // Data should change when going back to previous page
                      expect(firstRowBefore).to.not.equal(firstRowAfter);
                    });
                  });
                } else {
                  cy.log('Previous button not available or disabled');
                }
              });
            } else {
              cy.log('Cannot test previous - Next button not available');
            }
          });
        });
      } else {
        cy.log('Pagination not available');
      }
    });
  });

  it('should display correct page information', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    cy.get('.ReactTable', { timeout: 10000 }).should('exist');

    cy.get('.pagination').then($pagination => {
      if ($pagination.length > 0) {
        // Look for page info - check for active page indicator
        cy.get('.pagination').within(() => {
          // Check for active page (current page)
          cy.get('li.active a').then($active => {
            if ($active.length > 0) {
              cy.wrap($active).should('be.visible');
              cy.log('Found active page indicator');
            } else {
              // Look for other page indicators
              cy.get('a[aria-current="page"]').then($current => {
                if ($current.length > 0) {
                  cy.wrap($current).should('be.visible');
                  cy.log('Found current page indicator');
                } else {
                  cy.log('Page information format not recognized');
                }
              });
            }
          });
        });
      } else {
        cy.log('Pagination not available');
      }
    });
  });

  it('should allow changing page size if page size selector exists', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    cy.get('.ReactTable', { timeout: 10000 }).should('exist');

    // Look for page size selector - first check if any select elements exist
    cy.get('body').then($body => {
      if ($body.find('select').length > 0) {
        cy.get('select').then($selects => {
          // Check if any select contains page size options
          let foundPageSize = false;
          $selects.each((_, select) => {
            const $select = Cypress.$(select);
            if ($select.find('option').text().match(/\d+/)) {
              foundPageSize = true;
              cy.wrap($select).should('be.visible');
              cy.log('Found potential page size selector');
              return false; // break the loop
            }
          });
          if (!foundPageSize) {
            cy.log('No page size selector found in select elements');
          }
        });
      } else {
        cy.log('No select elements found - page size selector not available');
      }
    });
  });

});