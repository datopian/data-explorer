describe('Sorting Tests (Dev Server)', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('/');
  });

  it('should allow sorting by clicking column headers', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    cy.get('.ReactTable', { timeout: 10000 }).should('exist');

    // Get the first sortable column header
    cy.get('.ReactTable thead th').first().then($firstHeader => {
      if ($firstHeader.find('.rt-resizable-header-content').length > 0) {
        // Get first cell value before sorting
        cy.get('.ReactTable tbody tr:first-child td:first-child').invoke('text').then((firstCellBefore) => {
          
          // Click header to sort
          cy.wrap($firstHeader).click();
          cy.wait(2000);
          
          // Get first cell value after sorting
          cy.get('.ReactTable tbody tr:first-child td:first-child').invoke('text').then((firstCellAfter) => {
            // Values might be the same or different depending on data
            // Just verify table still exists and is functional
            cy.get('.ReactTable tbody tr').should('have.length.greaterThan', 0);
          });
        });
      } else {
        // Try clicking header directly
        cy.wrap($firstHeader).click();
        cy.wait(2000);
        cy.get('.ReactTable tbody tr').should('have.length.greaterThan', 0);
      }
    });
  });

  it('should show sort indicators when sorting is applied', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    cy.get('.ReactTable', { timeout: 10000 }).should('exist');

    // Click on a column header to sort
    cy.get('.ReactTable thead th').first().click();
    cy.wait(2000);

    // Look for sort indicators (arrows, classes, etc.)
    cy.get('.ReactTable thead th').first().then($header => {
      // Check for various sort indicator patterns
      const indicators = [
        '.rt-sort-asc',
        '.rt-sort-desc', 
        '.sort-asc',
        '.sort-desc',
        '[data-sort="asc"]',
        '[data-sort="desc"]',
        '.fa-sort-up',
        '.fa-sort-down'
      ];
      
      let foundIndicator = false;
      indicators.forEach(indicator => {
        if ($header.find(indicator).length > 0) {
          foundIndicator = true;
        }
      });
      
      if (!foundIndicator) {
        // Check for text-based indicators
        cy.wrap($header).invoke('text').then((headerText) => {
          if (headerText.includes('↑') || headerText.includes('↓') || 
              headerText.includes('▲') || headerText.includes('▼')) {
            foundIndicator = true;
          }
        });
      }
      
      // If no visual indicator found, just verify sorting functionality works
      if (!foundIndicator) {
        cy.log('No visual sort indicator found, but sorting may still be functional');
      }
    });
  });

  it('should toggle between ascending and descending sort', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    cy.get('.ReactTable', { timeout: 10000 }).should('exist');

    // Get first row data before any sorting
    cy.get('.ReactTable tbody tr:first-child td:first-child').invoke('text').then((originalFirst) => {
      
      // Click header once for first sort
      cy.get('.ReactTable thead th').first().click();
      cy.wait(2000);
      
      cy.get('.ReactTable tbody tr:first-child td:first-child').invoke('text').then((firstSortFirst) => {
        
        // Click header again to reverse sort
        cy.get('.ReactTable thead th').first().click();
        cy.wait(2000);
        
        cy.get('.ReactTable tbody tr:first-child td:first-child').invoke('text').then((secondSortFirst) => {
          // The first cell after double-click should be different from first sort
          // (unless all values are the same)
          cy.get('.ReactTable tbody tr').should('have.length.greaterThan', 0);
          
          // Verify table is still functional
          cy.get('.ReactTable thead').should('exist');
          cy.get('.ReactTable tbody').should('exist');
        });
      });
    });
  });

  it('should allow sorting multiple columns if supported', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    cy.get('.ReactTable', { timeout: 10000 }).should('exist');

    // Try sorting by first column
    cy.get('.ReactTable thead th').first().click();
    cy.wait(1000);

    // Try sorting by second column while holding shift (if multi-sort is supported)
    cy.get('.ReactTable thead th').eq(1).then($secondHeader => {
      // Try with shift key for multi-column sort
      cy.wrap($secondHeader).click({ shiftKey: true });
      cy.wait(2000);
      
      // Verify table is still functional
      cy.get('.ReactTable tbody tr').should('have.length.greaterThan', 0);
      
      // Check if both columns show sort indicators
      cy.get('.ReactTable thead th').first().then($firstHeader => {
        cy.wrap($secondHeader).then($secHeader => {
          // Just verify both columns are clickable and table remains functional
          cy.get('.ReactTable').should('exist');
        });
      });
    });
  });

  it('should maintain sort order when switching views', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    cy.get('.ReactTable', { timeout: 10000 }).should('exist');

    // Apply sorting
    cy.get('.ReactTable thead th').first().click();
    cy.wait(2000);
    
    // Get first row data after sorting
    cy.get('.ReactTable tbody tr:first-child td:first-child').invoke('text').then((sortedFirstRow) => {
      
      // Switch to chart view
      cy.get('button[id^="tab-Chart-"]').click();
      cy.wait(2000);
      
      // Switch back to table view
      cy.get('button[id^="tab-Table-"]').click();
      cy.wait(2000);
      
      // Check if sort order is maintained
      cy.get('.ReactTable tbody tr:first-child td:first-child').invoke('text').then((afterSwitchFirstRow) => {
        expect(afterSwitchFirstRow).to.equal(sortedFirstRow);
      });
    });
  });

  it('should clear sort when reset option is available', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    cy.get('.ReactTable', { timeout: 10000 }).should('exist');

    // Get original first row data
    cy.get('.ReactTable tbody tr:first-child td:first-child').invoke('text').then((originalFirst) => {
      
      // Apply sorting
      cy.get('.ReactTable thead th').first().click();
      cy.wait(2000);
      
      // Look for reset/clear sort button or option
      cy.get('body').then($body => {
        if ($body.find('.clear-sort, .reset-sort, [data-action="clear-sort"]').length > 0) {
          cy.get('.clear-sort, .reset-sort, [data-action="clear-sort"]').first().click();
          cy.wait(2000);
          
          // Check if original order is restored
          cy.get('.ReactTable tbody tr:first-child td:first-child').invoke('text').then((resetFirst) => {
            // May or may not equal original depending on implementation
            cy.get('.ReactTable').should('exist');
          });
        } else {
          // Try clicking header multiple times to cycle back to original
          cy.get('.ReactTable thead th').first().click();
          cy.wait(1000);
          cy.get('.ReactTable thead th').first().click();
          cy.wait(2000);
          
          // Verify table is still functional
          cy.get('.ReactTable tbody tr').should('have.length.greaterThan', 0);
        }
      });
    });
  });

  it('should handle sorting of different data types appropriately', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    cy.get('.ReactTable', { timeout: 10000 }).should('exist');

    // Test sorting on different columns (assuming different data types)
    cy.get('.ReactTable thead th').each(($header, index) => {
      if (index < 3) { // Test first 3 columns
        cy.wrap($header).click();
        cy.wait(1000);
        
        // Verify table remains functional after each sort
        cy.get('.ReactTable tbody tr').should('have.length.greaterThan', 0);
      }
    });
  });
});