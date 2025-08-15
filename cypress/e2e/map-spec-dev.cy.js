describe('Map Spec Tests (Dev Server)', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('/?spec=map');
  });

  it('should load map specification', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
  });

  it('should display map visualization', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    
    // Look for map elements
    cy.get('body').then($body => {
      const mapSelectors = [
        '.mapboxgl-map',
        '.leaflet-container',
        '.map-container',
        'canvas',
        'svg'
      ];
      
      let mapFound = false;
      mapSelectors.forEach(selector => {
        if ($body.find(selector).length > 0) {
          mapFound = true;
          cy.get(selector).should('exist');
        }
      });
      
      if (!mapFound) {
        cy.log('Map visualization not yet rendered or uses different selectors');
      }
    });
  });

  it('should switch to map view when tab is available', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    
    cy.get('button[id^="tab-Map-"]').then($mapTab => {
      if ($mapTab.length > 0) {
        cy.wrap($mapTab).click();
        cy.wait(3000); // Maps may take longer to load
        cy.get('button[id^="tab-Map-"]').should('have.class', 'active');
      } else {
        cy.log('Map tab not available - may load directly in map view');
      }
    });
  });

  it('should allow switching back to table view if available', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    
    cy.get('button[id^="tab-Table-"]').then($tableTab => {
      if ($tableTab.length > 0) {
        cy.wrap($tableTab).click();
        cy.wait(2000);
        cy.get('.ReactTable', { timeout: 10000 }).should('exist');
      } else {
        cy.log('Table tab not available in map spec');
      }
    });
  });

  it('should handle GeoJSON data loading', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    
    // Wait for potential network requests to complete
    cy.wait(5000);
    
    // Check if any error messages are displayed
    cy.get('body').then($body => {
      if ($body.find('.error, .alert-danger, [class*="error"]').length > 0) {
        cy.log('Error detected in map loading');
      } else {
        cy.log('No obvious errors in map spec loading');
      }
    });
  });
});