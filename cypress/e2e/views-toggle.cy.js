describe('Views Toggle Tests', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('http://localhost:9090/?component=App&fixture=with_widgets%2Fdata_explorer');
  });

  it('should display table view by default', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');

    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');

    cy.get('@iframeBody').find('button[id^="tab-Table-"]').should('have.attr', 'aria-selected', 'true');
    cy.get('@iframeBody').find('div[id^="tabpanel-Table-"]').should('be.visible');
    cy.get('@iframeBody').find('.ReactTable').should('exist');
    cy.get('@iframeBody').find('table').should('exist');
    cy.get('@iframeBody').find('thead').should('exist');
    cy.get('@iframeBody').find('tbody').should('exist');
  });

  it('should switch to chart view when chart tab is clicked', () => {
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

    cy.get('@iframeBody').find('.tab-chart').contains('Chart').click();
    
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');
    
    cy.get('@iframeBody').find('.chart-builder', { timeout: 10000 }).should('exist');

    cy.get('@iframeBody').find('div[id^="tabpanel-Chart-"]').should('be.visible');
    
    cy.get('@iframeBody').find('div[id^="tabpanel-Table-"]').should('not.be.visible');
  });

  it('should switch back to table view when table tab is clicked', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');

    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');

    cy.get('@iframeBody').find('button[id^="tab-Chart-"]').click();
    cy.wait(1000);

    cy.get('@iframeBody').find('button[id^="tab-Table-"]').click();
    cy.wait(1000);

    cy.get('@iframeBody').find('div[id^="tabpanel-Table-"]').should('be.visible');
    
    cy.get('@iframeBody').find('div[id^="tabpanel-Chart-"]').should('not.be.visible');

    cy.get('@iframeBody').find('.ReactTable').should('exist');
    cy.get('@iframeBody').find('table').should('exist');
  });

  it('should display chart builder when in chart view', () => {
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
    cy.get('@iframeBody').find('button[type="submit"]').should('contain', 'Add view');
  });

  it('should preserve filters when switching between views', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');

    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');

    cy.get('@iframeBody').find('.dq-rule-add').click();
    cy.get('@iframeBody').find('select[name="rules.0.field"]').select('ENG.Year');
    cy.get('@iframeBody').find('select[name="rules.0.operator"]').select('=');
    cy.get('@iframeBody').find('input[name="rules.0.value"]').type('2024');
    cy.get('@iframeBody').find('.submit-button').click();
    cy.get('@iframeBody').find('.loading', { timeout: 10000 }).should('not.exist');
    cy.wait(3000);

    cy.get('@iframeBody').find('.total-rows-value').invoke('text').then((filteredRows) => {
      const filteredCount = parseInt(filteredRows.replace(/,/g, ''));

      cy.get('@iframeBody').find('button[id^="tab-Chart-"]').click();
      cy.wait(1000);

      cy.get('@iframeBody').find('.total-rows-value').invoke('text').then((chartRows) => {
        const chartCount = parseInt(chartRows.replace(/,/g, ''));
        expect(chartCount).to.equal(filteredCount);
      });

      cy.get('@iframeBody').find('button[id^="tab-Table-"]').click();
      cy.wait(1000);

      cy.get('@iframeBody').find('.total-rows-value').invoke('text').then((tableRows) => {
        const tableCount = parseInt(tableRows.replace(/,/g, ''));
        expect(tableCount).to.equal(filteredCount);
      });
    });
  });

  it('should display chart with correct data when configured', () => {
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
    cy.get('@iframeBody').find('#yAxis0').check(); // ENG.Week
    cy.get('@iframeBody').find('#yAxis4').check(); // Generator Availability
    cy.get('@iframeBody').find('button').contains('Add view').click();
    cy.wait(2000);

    cy.get('@iframeBody').find('.js-plotly-plot').should('exist');
    cy.get('@iframeBody').find('.plot-container').should('exist');
    cy.get('@iframeBody').find('.main-svg').should('exist');
  });

  it('should show table data accurately in table view', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');

    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');

    cy.get('@iframeBody').find('.ReactTable').should('exist');
    cy.get('@iframeBody').find('table thead tr').should('exist');
    cy.get('@iframeBody').find('table tbody tr').should('have.length.greaterThan', 0);

    cy.get('@iframeBody').find('table thead th').should('contain', 'ENG.Week');
    cy.get('@iframeBody').find('table thead th').should('contain', 'ENG.Year');
    cy.get('@iframeBody').find('table thead th').should('contain', 'Peak Demand Forecast');

    cy.get('@iframeBody').find('table tbody tr').first().find('td').should('have.length.greaterThan', 0);
  });

  it('should render chart correctly in chart view', () => {
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
    cy.wait(3000);

    cy.get('@iframeBody').find('.chart-builder-wrapper').should('exist');
    cy.get('@iframeBody').find('.chart-builder').should('exist');
    cy.get('@iframeBody').find('#chartType').should('exist');
    cy.get('@iframeBody').find('#xAxis').should('exist');
    cy.get('@iframeBody').find('#yAxis').should('exist');
  });

}); 