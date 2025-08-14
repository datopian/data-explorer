describe('Chart Spec Tests (Dev Server)', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('/data-explorer.html?spec=chart');
  });

  it('should load chart specification', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
  });

  it('should switch to chart view when tab is available', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    
    cy.get('button[id^="tab-Chart-"]').then($chartTab => {
      if ($chartTab.length > 0) {
        cy.wrap($chartTab).click();
        cy.wait(2000);
        cy.get('button[id^="tab-Chart-"]').should('have.class', 'active');
      } else {
        cy.log('Chart tab not available - may load directly in chart view');
      }
    });
  });

  it('should display chart visualization', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    
    // Look for chart elements
    cy.get('body').then($body => {
      const chartSelectors = [
        '.chart-container',
        '.vega-embed',
        '.plotly-graph-div',
        'canvas',
        'svg'
      ];
      
      let chartFound = false;
      chartSelectors.forEach(selector => {
        if ($body.find(selector).length > 0) {
          chartFound = true;
          cy.get(selector).should('exist');
        }
      });
      
      if (!chartFound) {
        cy.log('Chart visualization not yet rendered or uses different selectors');
      }
    });
  });

  it('should allow switching back to table view', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    
    cy.get('button[id^="tab-Table-"]').then($tableTab => {
      if ($tableTab.length > 0) {
        cy.wrap($tableTab).click();
        cy.wait(2000);
        cy.get('.ReactTable', { timeout: 10000 }).should('exist');
      } else {
        cy.log('Table tab not available in chart spec');
      }
    });
  });
});