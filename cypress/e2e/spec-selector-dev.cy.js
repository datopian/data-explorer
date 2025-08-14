describe('Spec Selector Tests (Dev Server)', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('/');
  });

  it('should load the spec selector page', () => {
    cy.get('.container', { timeout: 10000 }).should('be.visible');
    cy.get('h1').should('contain', 'Data Explorer Component Specs');
  });

  it('should display all spec cards', () => {
    cy.get('.specs-grid').should('be.visible');
    cy.get('.spec-card').should('have.length', 3);
    
    // Check that each spec has a title and description
    cy.get('.spec-card').each($card => {
      cy.wrap($card).find('.spec-title').should('exist');
      cy.wrap($card).find('.spec-desc').should('exist');
    });
  });

  it('should have working links to each spec', () => {
    // Test map spec link
    cy.get('.spec-card').contains('Map View').should('have.attr', 'href', '/data-explorer.html?spec=map');
    
    // Test table spec link
    cy.get('.spec-card').contains('Table View').should('have.attr', 'href', '/data-explorer.html?spec=table');
    
    // Test chart spec link
    cy.get('.spec-card').contains('Chart View').should('have.attr', 'href', '/data-explorer.html?spec=chart');
  });

  it('should navigate to table spec when clicked', () => {
    cy.get('.spec-card').contains('Table View').click();
    cy.url().should('include', '/data-explorer.html?spec=table');
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
  });

  it('should navigate to chart spec when clicked', () => {
    cy.get('.spec-card').contains('Chart View').click();
    cy.url().should('include', '/data-explorer.html?spec=chart');
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
  });

  it('should navigate to map spec when clicked', () => {
    cy.get('.spec-card').contains('Map View').click();
    cy.url().should('include', '/data-explorer.html?spec=map');
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
  });

});