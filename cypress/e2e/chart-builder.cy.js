describe('Chart Builder Functionality', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('http://localhost:9090/?component=App&fixture=with_widgets%2Fdata_explorer');
  });

  it('should allow user to switch to chart view and access chart builder', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');

    cy.wait(2000);
    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');

    cy.get('@iframeBody').find('button[id^="tab-Chart-"]').click();
    
    cy.get('@iframeBody').find('.chart-builder', { timeout: 10000 }).should('exist');
    cy.get('@iframeBody').find('.chart-builder-wrapper').should('exist');
    cy.get('@iframeBody').find('#chartType').should('exist');
    cy.get('@iframeBody').find('#xAxis').should('exist');
    cy.get('@iframeBody').find('#yAxis').should('exist');
  });

  it('should allow user to select x-axis and create basic line chart', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');

    cy.wait(2000);
    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');

    cy.get('@iframeBody').find('button[id^="tab-Chart-"]').click();
    cy.get('@iframeBody').find('.chart-builder', { timeout: 10000 }).should('exist');
    
    cy.get('@iframeBody').find('#chartType').select('line');
    cy.get('@iframeBody').find('#xAxis').select('ENG.Week');
    cy.get('@iframeBody').find('#yAxis0').check();
    cy.get('@iframeBody').find('button').contains('Add view').click();
    cy.wait(2000);
    
    cy.get('@iframeBody').find('.js-plotly-plot').should('exist');
    cy.get('@iframeBody').find('.plot-container').should('exist');
    cy.get('@iframeBody').find('.main-svg').should('exist');
  });

  it('should allow user to create different chart types - bar chart', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');

    cy.wait(2000);
    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');

    cy.get('@iframeBody').find('button[id^="tab-Chart-"]').click();
    cy.get('@iframeBody').find('.chart-builder', { timeout: 10000 }).should('exist');
    
    cy.get('@iframeBody').find('#chartType').select('bar');
    cy.get('@iframeBody').find('#xAxis').select('ENG.Year');
    cy.get('@iframeBody').find('#yAxis4').check();
    cy.get('@iframeBody').find('button').contains('Add view').click();
    cy.wait(2000);
    
    cy.get('@iframeBody').find('.js-plotly-plot').should('exist');
    cy.get('@iframeBody').find('.plot-container').should('exist');
  });

  it('should allow user to select multiple y-axis fields', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');

    cy.wait(2000);
    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');

    cy.get('@iframeBody').find('button[id^="tab-Chart-"]').click();
    cy.get('@iframeBody').find('.chart-builder', { timeout: 10000 }).should('exist');
    
    cy.get('@iframeBody').find('#chartType').select('line');
    cy.get('@iframeBody').find('#xAxis').select('ENG.Week');
    cy.get('@iframeBody').find('#yAxis0').check();
    cy.get('@iframeBody').find('#yAxis4').check();
    cy.get('@iframeBody').find('button').contains('Add view').click();
    cy.wait(2000);
    
    cy.get('@iframeBody').find('.js-plotly-plot').should('exist');
    cy.get('@iframeBody').find('.plot-container').should('exist');
  });

  it('should maintain chart configuration when switching between views', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');

    cy.wait(2000);
    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');

    cy.get('@iframeBody').find('button[id^="tab-Chart-"]').click();
    cy.get('@iframeBody').find('.chart-builder', { timeout: 10000 }).should('exist');
    
    cy.get('@iframeBody').find('#chartType').select('line');
    cy.get('@iframeBody').find('#xAxis').select('ENG.Week');
    cy.get('@iframeBody').find('#yAxis0').check();
    cy.get('@iframeBody').find('button').contains('Add view').click();
    cy.wait(2000);
    
    cy.get('@iframeBody').find('button[id^="tab-Table-"]').click();
    cy.wait(1000);
    cy.get('@iframeBody').find('.ReactTable').should('exist');
    
    cy.get('@iframeBody').find('button[id^="tab-Chart-"]').click();
    cy.wait(1000);
    cy.get('@iframeBody').find('#chartType').should('have.value', 'line');
    cy.get('@iframeBody').find('#xAxis').should('have.value', 'ENG.Week');
  });

  it('should render responsive charts that adapt to container size', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');

    cy.wait(2000);
    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');

    cy.get('@iframeBody').find('button[id^="tab-Chart-"]').click();
    cy.get('@iframeBody').find('.chart-builder', { timeout: 10000 }).should('exist');
    
    cy.get('@iframeBody').find('#chartType').select('bar');
    cy.get('@iframeBody').find('#xAxis').select('ENG.Year');
    cy.get('@iframeBody').find('#yAxis0').check();
    cy.get('@iframeBody').find('button').contains('Add view').click();
    cy.wait(2000);
    
    cy.get('@iframeBody').find('.js-plotly-plot').should('exist');
    
    cy.viewport(1280, 720);
    cy.get('@iframeBody').find('.js-plotly-plot').should('exist');
    
    cy.viewport(768, 1024);
    cy.get('@iframeBody').find('.js-plotly-plot').should('exist');
  });

  it('should allow chart type updates and re-render correctly', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');

    cy.wait(2000);
    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');

    cy.get('@iframeBody').find('button[id^="tab-Chart-"]').click();
    cy.get('@iframeBody').find('.chart-builder', { timeout: 10000 }).should('exist');
    
    cy.get('@iframeBody').find('#chartType').select('bar');
    cy.get('@iframeBody').find('#xAxis').select('ENG.Year');
    cy.get('@iframeBody').find('#yAxis0').check();
    cy.get('@iframeBody').find('button').contains('Add view').click();
    cy.wait(2000);
    
    cy.get('@iframeBody').find('.js-plotly-plot').should('exist');
    
    cy.get('@iframeBody').find('#chartType').select('line');
    cy.get('@iframeBody').find('button').contains('Add view').click();
    cy.wait(2000);
    
    cy.get('@iframeBody').find('.js-plotly-plot').should('exist');
  });

  it('should maintain UI responsiveness during chart operations', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');

    cy.wait(2000);
    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');

    cy.get('@iframeBody').find('button[id^="tab-Chart-"]').click();
    cy.get('@iframeBody').find('.chart-builder', { timeout: 10000 }).should('exist');
    
    const startTime = Date.now();
    
    cy.get('@iframeBody').find('#chartType').select('line');
    cy.get('@iframeBody').find('#xAxis').select('ENG.Week');
    cy.get('@iframeBody').find('#yAxis0').check();
    cy.get('@iframeBody').find('button').contains('Add view').click();
    
    cy.get('@iframeBody').find('.js-plotly-plot').should('exist').then(() => {
      const loadTime = Date.now() - startTime;
      expect(loadTime).to.be.lessThan(10000);
    });
    
    cy.get('@iframeBody').find('#chartType').should('not.be.disabled');
    cy.get('@iframeBody').find('#xAxis').should('not.be.disabled');
    cy.get('@iframeBody').find('button').contains('Add view').should('not.be.disabled');
  });
});