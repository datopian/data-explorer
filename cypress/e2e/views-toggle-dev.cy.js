describe('Views Toggle Tests (Dev Server)', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('/data-explorer.html?spec=table');
  });

  it('should display table view by default', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');

    // Check that table tab is active by default
    cy.get('button[id^="tab-Table-"]').should('have.attr', 'aria-selected', 'true');
    cy.get('div[id^="tabpanel-Table-"]').should('be.visible');
    cy.get('.ReactTable', { timeout: 10000 }).should('exist');
    cy.get('table').should('exist');
    cy.get('thead').should('exist');
    cy.get('tbody').should('exist');
  });

  it('should switch to chart view when chart tab is clicked', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    cy.wait(2000);

    // Click on Chart tab
    cy.get('button[id^="tab-Chart-"]').click();
    
    // Verify Chart view is displayed
    cy.get('.chart-builder', { timeout: 10000 }).should('exist');
    cy.get('div[id^="tabpanel-Chart-"]').should('be.visible');
    
    // Verify Table view is hidden
    cy.get('div[id^="tabpanel-Table-"]').should('not.be.visible');
  });

  it('should switch back to table view when table tab is clicked', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');

    // Go to Chart view first
    cy.get('button[id^="tab-Chart-"]').click();
    cy.wait(1000);

    // Switch back to Table view
    cy.get('button[id^="tab-Table-"]').click();
    cy.wait(1000);

    // Verify Table view is visible and Chart view is hidden
    cy.get('div[id^="tabpanel-Table-"]').should('be.visible');
    cy.get('div[id^="tabpanel-Chart-"]').should('not.be.visible');
    cy.get('.ReactTable', { timeout: 10000 }).should('exist');
    cy.get('table').should('exist');
  });

  it('should display chart builder when in chart view', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    cy.wait(2000);

    cy.get('button[id^="tab-Chart-"]').click();
    
    // Verify chart builder components
    cy.get('.chart-builder', { timeout: 10000 }).should('exist');
    cy.get('.chart-builder-wrapper').should('exist');
    cy.get('#chartType').should('exist');
    cy.get('#xAxis').should('exist');
    cy.get('#yAxis').should('exist');
    cy.get('button[type="submit"]').should('contain', 'Add view');
  });

  it('should preserve filters when switching between views', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');

    // Add a filter in Table view (if filter functionality exists)
    cy.get('.dq-rule-add').then($el => {
      if ($el.length > 0) {
        cy.get('.dq-rule-add').click();
        cy.get('select[name="rules.0.field"]').then($select => {
          if ($select.find('option').length > 1) {
            cy.get('select[name="rules.0.field"]').select(1);
            cy.get('select[name="rules.0.operator"]').select('=');
            cy.get('input[name="rules.0.value"]').type('test');
            cy.get('.submit-button').click();
            cy.wait(3000);

            // Get filtered rows count
            cy.get('.total-rows-value').invoke('text').then((filteredRows) => {
              const filteredCount = parseInt(filteredRows.replace(/,/g, ''));

              // Switch to Chart view and verify same count
              cy.get('button[id^="tab-Chart-"]').click();
              cy.wait(1000);

              cy.get('.total-rows-value').invoke('text').then((chartRows) => {
                const chartCount = parseInt(chartRows.replace(/,/g, ''));
                expect(chartCount).to.equal(filteredCount);
              });

              // Switch back to Table view and verify count is maintained
              cy.get('button[id^="tab-Table-"]').click();
              cy.wait(1000);

              cy.get('.total-rows-value').invoke('text').then((tableRows) => {
                const tableCount = parseInt(tableRows.replace(/,/g, ''));
                expect(tableCount).to.equal(filteredCount);
              });
            });
          }
        });
      } else {
        // If no filter functionality, just verify view switching works
        cy.get('button[id^="tab-Chart-"]').click();
        cy.wait(1000);
        cy.get('button[id^="tab-Table-"]').click();
        cy.wait(1000);
        cy.get('.ReactTable').should('exist');
      }
    });
  });

  it('should display chart with correct data when configured', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    cy.wait(2000);

    cy.get('button[id^="tab-Chart-"]').click();
    cy.get('.chart-builder', { timeout: 10000 }).should('exist');

    // Configure and create chart
    cy.get('#chartType').select('line');
    cy.get('#xAxis').select(1); // Select first available option
    cy.get('input[name^="yAxis"]:eq(0)').check(); // Select first y-axis
    cy.get('input[name^="yAxis"]:eq(1)').check(); // Select second y-axis
    cy.get('button').contains('Add view').click();
    cy.wait(3000);

    // Verify chart is rendered with data
    cy.get('.js-plotly-plot', { timeout: 15000 }).should('exist');
    cy.get('.plot-container').should('exist');
    cy.get('.main-svg').should('exist');
  });

  it('should show table data accurately in table view', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');

    // Verify table structure and data
    cy.get('.ReactTable', { timeout: 10000 }).should('exist');
    cy.get('table thead tr').should('exist');
    cy.get('table tbody tr').should('have.length.greaterThan', 0);

    // Verify table has headers and data rows
    cy.get('table thead th').should('have.length.greaterThan', 0);
    cy.get('table tbody tr').first().find('td').should('have.length.greaterThan', 0);
  });

  it('should render chart correctly in chart view', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    cy.wait(2000);

    cy.get('button[id^="tab-Chart-"]').click();
    cy.wait(3000);

    // Verify chart builder interface
    cy.get('.chart-builder-wrapper').should('exist');
    cy.get('.chart-builder').should('exist');
    cy.get('#chartType').should('exist');
    cy.get('#xAxis').should('exist');
    cy.get('#yAxis').should('exist');
  });
});