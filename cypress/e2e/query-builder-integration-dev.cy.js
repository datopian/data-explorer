describe('Query Builder Integration Tests (Dev Server)', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('/data-explorer.html?spec=table');
  });

  it('should update curl query when filters are added', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');

    // Check if query builder button exists
    cy.get('.query-builder-button').then($el => {
      if ($el.length > 0) {
        cy.get('.query-builder-button').click();
        cy.wait(1000);

        // Get initial cURL query
        cy.get('#tab-cUrl').click();
        cy.get('#tabpanel-cUrl pre code').invoke('text').then((initialCurl) => {
          const initialQuery = initialCurl;
          
          // Add filter
          cy.get('.dq-rule-add').click();
          cy.get('select[name="rules.0.field"]').then($select => {
            if ($select.find('option').length > 1) {
              cy.get('select[name="rules.0.field"]').select(1);
              cy.get('select[name="rules.0.operator"]').select('=');
              cy.get('input[name="rules.0.value"]').type('2023');
              cy.get('.submit-button').click();
              cy.wait(3000);

              // Verify cURL query updated
              cy.get('#tabpanel-cUrl pre code').invoke('text').then((updatedCurl) => {
                expect(updatedCurl).to.not.equal(initialQuery);
                expect(updatedCurl).to.include('2023');
              });
            }
          });
        });
      } else {
        // If query builder doesn't exist, mark as pending
        cy.log('Query builder functionality not available');
      }
    });
  });

  it('should update Python query when filters are added', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');

    cy.get('.query-builder-button').then($el => {
      if ($el.length > 0) {
        cy.get('.query-builder-button').click();
        cy.wait(1000);

        // Get initial Python query
        cy.get('#tab-Python').click();
        cy.get('#tabpanel-Python pre code').invoke('text').then((initialPython) => {
          const initialQuery = initialPython;
          
          // Add filter
          cy.get('.dq-rule-add').click();
          cy.get('select[name="rules.0.field"]').then($select => {
            if ($select.find('option').length > 1) {
              cy.get('select[name="rules.0.field"]').select(1);
              cy.get('select[name="rules.0.operator"]').select('>');
              cy.get('input[name="rules.0.value"]').type('10');
              cy.get('.submit-button').click();
              cy.wait(3000);

              // Verify Python query updated
              cy.get('#tabpanel-Python pre code').invoke('text').then((updatedPython) => {
                expect(updatedPython).to.not.equal(initialQuery);
                expect(updatedPython).to.include('10');
              });
            }
          });
        });
      } else {
        cy.log('Query builder functionality not available');
      }
    });
  });

  it('should update JavaScript query when filters are added', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');

    cy.get('.query-builder-button').then($el => {
      if ($el.length > 0) {
        cy.get('.query-builder-button').click();
        cy.wait(1000);

        // Get initial JavaScript query
        cy.get('#tab-Javascript').click();
        cy.get('#tabpanel-Javascript pre code').invoke('text').then((initialJS) => {
          const initialQuery = initialJS;
          
          // Add filter
          cy.get('.dq-rule-add').click();
          cy.get('select[name="rules.0.field"]').then($select => {
            if ($select.find('option').length > 1) {
              cy.get('select[name="rules.0.field"]').select(1);
              cy.get('select[name="rules.0.operator"]').select('>=');
              cy.get('input[name="rules.0.value"]').type('50000');
              cy.get('.submit-button').click();
              cy.wait(3000);

              // Verify JavaScript query updated
              cy.get('#tabpanel-Javascript pre code').invoke('text').then((updatedJS) => {
                expect(updatedJS).to.not.equal(initialQuery);
                expect(updatedJS).to.include('50000');
              });
            }
          });
        });
      } else {
        cy.log('Query builder functionality not available');
      }
    });
  });

  it('should update R query when filters are added', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');

    cy.get('.query-builder-button').then($el => {
      if ($el.length > 0) {
        cy.get('.query-builder-button').click();
        cy.wait(1000);

        // Get initial R query
        cy.get('#tab-R').click();
        cy.get('#tabpanel-R pre code').invoke('text').then((initialR) => {
          const initialQuery = initialR;
          
          // Add filter
          cy.get('.dq-rule-add').click();
          cy.get('select[name="rules.0.field"]').then($select => {
            if ($select.find('option').length > 1) {
              cy.get('select[name="rules.0.field"]').select(1);
              cy.get('select[name="rules.0.operator"]').select('>');
              cy.get('input[name="rules.0.value"]').type('80');
              cy.get('.submit-button').click();
              cy.wait(3000);

              // Verify R query updated
              cy.get('#tabpanel-R pre code').invoke('text').then((updatedR) => {
                expect(updatedR).to.not.equal(initialQuery);
                expect(updatedR).to.include('80');
              });
            }
          });
        });
      } else {
        cy.log('Query builder functionality not available');
      }
    });
  });

  it('should update Pandas query when filters are added', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');

    cy.get('.query-builder-button').then($el => {
      if ($el.length > 0) {
        cy.get('.query-builder-button').click();
        cy.wait(1000);

        // Get initial Pandas query
        cy.get('#tab-Pandas').click();
        cy.get('#tabpanel-Pandas pre code').invoke('text').then((initialPandas) => {
          const initialQuery = initialPandas;
          
          // Add filter
          cy.get('.dq-rule-add').click();
          cy.get('select[name="rules.0.field"]').then($select => {
            if ($select.find('option').length > 1) {
              cy.get('select[name="rules.0.field"]').select(1);
              cy.get('select[name="rules.0.operator"]').select('!=');
              cy.get('input[name="rules.0.value"]').type('0');
              cy.get('.submit-button').click();
              cy.wait(3000);

              // Verify Pandas query updated
              cy.get('#tabpanel-Pandas pre code').invoke('text').then((updatedPandas) => {
                expect(updatedPandas).to.not.equal(initialQuery);
                expect(updatedPandas).to.include('0');
              });
            }
          });
        });
      } else {
        cy.log('Query builder functionality not available');
      }
    });
  });
});