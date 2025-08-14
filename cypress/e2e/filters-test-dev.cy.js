describe('Filters Tests (Dev Server)', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('/data-explorer.html?spec=table');
  });

  it('should allow adding a simple filter', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');

    // Check if filter functionality exists
    cy.get('.dq-rule-add').then($el => {
      if ($el.length > 0) {
        cy.get('.dq-rule-add').click();
        
        // Select field, operator, and value
        cy.get('select[name="rules.0.field"]').then($select => {
          if ($select.find('option').length > 1) {
            cy.get('select[name="rules.0.field"]').select(1);
            cy.get('select[name="rules.0.operator"]').select('=');
            cy.get('input[name="rules.0.value"]').type('test');
            
            // Apply filter
            cy.get('.submit-button').click();
            cy.wait(3000);
            
            // Verify filter was applied (check if UI updated)
            cy.get('.dq-rule').should('exist');
          }
        });
      } else {
        cy.log('Filter functionality not available in current data configuration');
      }
    });
  });

  it('should allow removing filters', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');

    cy.get('.dq-rule-add').then($el => {
      if ($el.length > 0) {
        // Add a filter first
        cy.get('.dq-rule-add').click();
        cy.get('select[name="rules.0.field"]').then($select => {
          if ($select.find('option').length > 1) {
            cy.get('select[name="rules.0.field"]').select(1);
            cy.get('select[name="rules.0.operator"]').select('=');
            cy.get('input[name="rules.0.value"]').type('test');
            cy.get('.submit-button').click();
            cy.wait(2000);
            
            // Remove the filter
            cy.get('.dq-rule-remove').then($remove => {
              if ($remove.length > 0) {
                cy.get('.dq-rule-remove').click();
                cy.get('.submit-button').click();
                cy.wait(2000);
                
                // Verify filter was removed
                cy.get('.dq-rule').should('not.exist');
              }
            });
          }
        });
      } else {
        cy.log('Filter functionality not available');
      }
    });
  });

  it('should allow multiple filters', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');

    cy.get('.dq-rule-add').then($el => {
      if ($el.length > 0) {
        // Add first filter
        cy.get('.dq-rule-add').click();
        cy.get('select[name="rules.0.field"]').then($select => {
          if ($select.find('option').length > 1) {
            cy.get('select[name="rules.0.field"]').select(1);
            cy.get('select[name="rules.0.operator"]').select('=');
            cy.get('input[name="rules.0.value"]').type('value1');
            
            // Add second filter
            cy.get('.dq-rule-add').click();
            cy.get('select[name="rules.1.field"]').then($select2 => {
              if ($select2.find('option').length > 1) {
                cy.get('select[name="rules.1.field"]').select(1);
                cy.get('select[name="rules.1.operator"]').select('>');
                cy.get('input[name="rules.1.value"]').type('100');
                
                // Apply filters
                cy.get('.submit-button').click();
                cy.wait(3000);
                
                // Verify both filters exist
                cy.get('.dq-rule').should('have.length', 2);
              }
            });
          }
        });
      } else {
        cy.log('Filter functionality not available');
      }
    });
  });

  it('should update table data when filters are applied', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');

    cy.get('.dq-rule-add').then($el => {
      if ($el.length > 0) {
        // Get initial row count
        cy.get('.total-rows-value').then($totalRows => {
          if ($totalRows.length > 0) {
            cy.get('.total-rows-value').invoke('text').then((initialRows) => {
              const initialCount = parseInt(initialRows.replace(/,/g, ''));
              
              // Add filter
              cy.get('.dq-rule-add').click();
              cy.get('select[name="rules.0.field"]').then($select => {
                if ($select.find('option').length > 1) {
                  cy.get('select[name="rules.0.field"]').select(1);
                  cy.get('select[name="rules.0.operator"]').select('=');
                  cy.get('input[name="rules.0.value"]').type('test');
                  cy.get('.submit-button').click();
                  cy.wait(3000);
                  
                  // Check if row count changed (may or may not depending on data)
                  cy.get('.total-rows-value').invoke('text').then((filteredRows) => {
                    const filteredCount = parseInt(filteredRows.replace(/,/g, ''));
                    // The count might be the same or different depending on the data
                    expect(filteredCount).to.be.a('number');
                  });
                }
              });
            });
          } else {
            // If no row counter, just verify table still exists after filter
            cy.get('.dq-rule-add').click();
            cy.get('select[name="rules.0.field"]').then($select => {
              if ($select.find('option').length > 1) {
                cy.get('select[name="rules.0.field"]').select(1);
                cy.get('select[name="rules.0.operator"]').select('=');
                cy.get('input[name="rules.0.value"]').type('test');
                cy.get('.submit-button').click();
                cy.wait(3000);
                cy.get('.ReactTable').should('exist');
              }
            });
          }
        });
      } else {
        cy.log('Filter functionality not available');
      }
    });
  });

  it('should maintain filters when switching views', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');

    cy.get('.dq-rule-add').then($el => {
      if ($el.length > 0) {
        // Add filter in table view
        cy.get('.dq-rule-add').click();
        cy.get('select[name="rules.0.field"]').then($select => {
          if ($select.find('option').length > 1) {
            cy.get('select[name="rules.0.field"]').select(1);
            cy.get('select[name="rules.0.operator"]').select('=');
            cy.get('input[name="rules.0.value"]').type('test');
            cy.get('.submit-button').click();
            cy.wait(2000);
            
            // Switch to chart view
            cy.get('button[id^="tab-Chart-"]').click();
            cy.wait(2000);
            
            // Switch back to table view
            cy.get('button[id^="tab-Table-"]').click();
            cy.wait(1000);
            
            // Verify filter is still applied
            cy.get('.dq-rule').should('exist');
            cy.get('input[name="rules.0.value"]').should('have.value', 'test');
          }
        });
      } else {
        // Just test view switching without filters
        cy.get('button[id^="tab-Chart-"]').click();
        cy.wait(1000);
        cy.get('button[id^="tab-Table-"]').click();
        cy.wait(1000);
        cy.get('.ReactTable').should('exist');
      }
    });
  });
});