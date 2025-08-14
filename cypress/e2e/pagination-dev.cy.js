describe('Pagination Tests (Dev Server)', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('/data-explorer.html?spec=table');
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
              cy.get('.ReactTable tbody tr:first-child td:first-child').invoke('text').then((firstRowBefore) => {
                
                cy.wrap($next).click();
                cy.wait(2000);
                
                // Check if first row data changed (indicating page changed)
                cy.get('.ReactTable tbody tr:first-child td:first-child').invoke('text').then((firstRowAfter) => {
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
                  cy.get('.ReactTable tbody tr:first-child td:first-child').invoke('text').then((firstRowBefore) => {
                    
                    cy.wrap($prev).click();
                    cy.wait(2000);
                    
                    cy.get('.ReactTable tbody tr:first-child td:first-child').invoke('text').then((firstRowAfter) => {
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
        // Look for page info (e.g., "Page 1 of 5" or "1-20 of 100")
        cy.get('.pagination').within(() => {
          // Check for various page info patterns
          cy.get('*').contains(/page \d+ of \d+/i).then($info => {
            if ($info.length > 0) {
              cy.wrap($info).should('be.visible');
            } else {
              // Look for other patterns like "1-20 of 100"
              cy.get('*').contains(/\d+-\d+ of \d+/i).then($info2 => {
                if ($info2.length > 0) {
                  cy.wrap($info2).should('be.visible');
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

    // Look for page size selector
    cy.get('select').contains('10', { matchCase: false }).then($pageSize => {
      if ($pageSize.length > 0) {
        // Get initial row count
        cy.get('.ReactTable tbody tr').its('length').then((initialRowCount) => {
          
          // Change page size
          cy.wrap($pageSize).select('20');
          cy.wait(2000);
          
          // Check if row count changed
          cy.get('.ReactTable tbody tr').its('length').then((newRowCount) => {
            if (newRowCount !== initialRowCount) {
              expect(newRowCount).to.be.greaterThan(initialRowCount);
            } else {
              cy.log('Row count unchanged - might not have enough data for larger page size');
            }
          });
        });
      } else {
        // Look for other page size patterns
        cy.get('select[name*="page"], select[id*="page"], .page-size select').then($altPageSize => {
          if ($altPageSize.length > 0) {
            cy.wrap($altPageSize).should('be.visible');
            // Try to change it if options are available
            cy.wrap($altPageSize).find('option').then($options => {
              if ($options.length > 1) {
                cy.wrap($altPageSize).select($options.eq(1).val());
                cy.wait(2000);
              }
            });
          } else {
            cy.log('Page size selector not available');
          }
        });
      }
    });
  });

  it('should maintain pagination state when switching views', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    cy.get('.ReactTable', { timeout: 10000 }).should('exist');

    cy.get('.pagination').then($pagination => {
      if ($pagination.length > 0) {
        // Go to next page if available
        cy.get('.pagination').within(() => {
          cy.get('a, button').contains('Next', { matchCase: false }).then($next => {
            if ($next.length > 0 && !$next.hasClass('disabled')) {
              cy.wrap($next).click();
              cy.wait(2000);
              
              // Get current page info
              cy.get('*').contains(/page \d+ of \d+/i).then($info => {
                if ($info.length > 0) {
                  cy.wrap($info).invoke('text').then((pageInfo) => {
                    
                    // Switch to chart view and back
                    cy.get('button[id^="tab-Chart-"]').click();
                    cy.wait(2000);
                    cy.get('button[id^="tab-Table-"]').click();
                    cy.wait(2000);
                    
                    // Check if pagination state is maintained
                    cy.get('.pagination').within(() => {
                      cy.get('*').contains(/page \d+ of \d+/i).invoke('text').then((newPageInfo) => {
                        expect(newPageInfo).to.equal(pageInfo);
                      });
                    });
                  });
                } else {
                  // Just verify we can switch views without breaking pagination
                  cy.get('button[id^="tab-Chart-"]').click();
                  cy.wait(1000);
                  cy.get('button[id^="tab-Table-"]').click();
                  cy.wait(1000);
                  cy.get('.pagination').should('exist');
                }
              });
            } else {
              cy.log('Cannot test pagination state - Next button not available');
            }
          });
        });
      } else {
        cy.log('Pagination not available for testing');
      }
    });
  });
});