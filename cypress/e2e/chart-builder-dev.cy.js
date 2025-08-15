describe('Chart Builder Functionality (Dev Server)', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    // Visit the chart spec for testing chart builder functionality
    cy.visit('/?spec=chart');
  });

  it('should allow user to switch to chart view and access chart builder', () => {
    // Wait for data-explorer to load
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    
    // Click on Chart tab
    cy.get('button[id^="tab-Chart-"]', { timeout: 10000 }).click();
    
    // Verify chart builder elements exist
    cy.get('.chart-builder', { timeout: 10000 }).should('exist');
    cy.get('.chart-builder-wrapper').should('exist');
    cy.get('#chartType').should('exist');
    cy.get('#xAxis').should('exist');
    cy.get('#yAxis').should('exist');
  });

  it('should allow user to select x-axis and create basic line chart', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');

    // Switch to Chart view
    cy.get('button[id^="tab-Chart-"]').click();
    cy.get('.chart-builder', { timeout: 10000 }).should('exist');
    
    // Configure chart
    cy.get('#chartType').select('line');
    cy.get('#xAxis').select(1); // Select the first available option
    cy.get('input[name^="yAxis"]:first').check();
    cy.get('button').contains('Add view').click();
    cy.wait(3000);
    
    // Verify chart is rendered
    cy.get('.js-plotly-plot', { timeout: 15000 }).should('exist');
    cy.get('.plot-container').should('exist');
    cy.get('.main-svg').should('exist');
  });

  it('should allow user to create different chart types - bar chart', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');

    cy.get('button[id^="tab-Chart-"]').click();
    cy.get('.chart-builder', { timeout: 10000 }).should('exist');
    
    // Configure bar chart
    cy.get('#chartType').select('bar');
    cy.get('#xAxis').select(1); // Select first available option
    cy.get('input[name^="yAxis"]:first').check();
    cy.get('button').contains('Add view').click();
    cy.wait(3000);
    
    // Verify chart is rendered
    cy.get('.js-plotly-plot', { timeout: 15000 }).should('exist');
    cy.get('.plot-container').should('exist');
  });

  it('should allow user to select multiple y-axis fields', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');

    cy.get('button[id^="tab-Chart-"]').click();
    cy.get('.chart-builder', { timeout: 10000 }).should('exist');
    
    // Configure chart with multiple y-axis
    cy.get('#chartType').select('line');
    cy.get('#xAxis').select(1);
    cy.get('input[name^="yAxis"]:eq(0)').check();
    cy.get('input[name^="yAxis"]:eq(1)').check();
    cy.get('button').contains('Add view').click();
    cy.wait(3000);
    
    // Verify chart is rendered
    cy.get('.js-plotly-plot', { timeout: 15000 }).should('exist');
    cy.get('.plot-container').should('exist');
  });

  it('should maintain chart configuration when switching between views', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');

    // Configure chart
    cy.get('button[id^="tab-Chart-"]').click();
    cy.get('.chart-builder', { timeout: 10000 }).should('exist');
    
    cy.get('#chartType').select('line');
    cy.get('#xAxis').select(1);
    cy.get('input[name^="yAxis"]:first').check();
    cy.get('button').contains('Add view').click();
    cy.wait(3000);
    
    // Switch to table and back
    cy.get('button[id^="tab-Table-"]').click();
    cy.wait(1000);
    cy.get('.ReactTable', { timeout: 10000 }).should('exist');
    
    cy.get('button[id^="tab-Chart-"]').click();
    cy.wait(1000);
    
    // Verify configuration is maintained
    cy.get('#chartType').should('have.value', 'line');
  });

  it('should render responsive charts that adapt to container size', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');

    cy.get('button[id^="tab-Chart-"]').click();
    cy.get('.chart-builder', { timeout: 10000 }).should('exist');
    
    // Create chart
    cy.get('#chartType').select('bar');
    cy.get('#xAxis').select(1);
    cy.get('input[name^="yAxis"]:first').check();
    cy.get('button').contains('Add view').click();
    cy.wait(3000);
    
    cy.get('.js-plotly-plot', { timeout: 15000 }).should('exist');
    
    // Test different viewport sizes
    cy.viewport(1280, 720);
    cy.get('.js-plotly-plot').should('exist');
    
    cy.viewport(768, 1024);
    cy.get('.js-plotly-plot').should('exist');
  });

  it('should allow chart type updates and re-render correctly', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');

    cy.get('button[id^="tab-Chart-"]').click();
    cy.get('.chart-builder', { timeout: 10000 }).should('exist');
    
    // Create bar chart
    cy.get('#chartType').select('bar');
    cy.get('#xAxis').select(1);
    cy.get('input[name^="yAxis"]:first').check();
    cy.get('button').contains('Add view').click();
    cy.wait(3000);
    
    cy.get('.js-plotly-plot', { timeout: 15000 }).should('exist');
    
    // Change to line chart
    cy.get('#chartType').select('line');
    cy.get('button').contains('Add view').click();
    cy.wait(3000);
    
    cy.get('.js-plotly-plot').should('exist');
  });

  it('should maintain UI responsiveness during chart operations', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');

    cy.get('button[id^="tab-Chart-"]').click();
    cy.get('.chart-builder', { timeout: 10000 }).should('exist');
    
    const startTime = Date.now();
    
    cy.get('#chartType').select('line');
    cy.get('#xAxis').select(1);
    cy.get('input[name^="yAxis"]:first').check();
    cy.get('button').contains('Add view').click();
    
    cy.get('.js-plotly-plot', { timeout: 15000 }).should('exist').then(() => {
      const loadTime = Date.now() - startTime;
      expect(loadTime).to.be.lessThan(10000);
    });
    
    // Verify UI elements are not disabled
    cy.get('#chartType').should('not.be.disabled');
    cy.get('#xAxis').should('not.be.disabled');
    cy.get('button').contains('Add view').should('not.be.disabled');
  });
});