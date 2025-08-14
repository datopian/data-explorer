describe('Table Spec Tests (Dev Server)', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('/data-explorer.html?spec=table');
  });

  it('should load table specification', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    cy.get('.ReactTable', { timeout: 10000 }).should('exist');
    cy.get('.ReactTable tbody tr').should('have.length.greaterThan', 0);
  });

  it('should display table view by default', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    cy.get('.ReactTable', { timeout: 10000 }).should('be.visible');
    cy.get('button[id^="tab-Table-"]').should('have.class', 'active');
  });

  it('should allow sorting in table view', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    cy.get('.ReactTable', { timeout: 10000 }).should('exist');

    cy.get('.ReactTable thead th').first().click();
    cy.wait(2000);
    cy.get('.ReactTable tbody tr').should('have.length.greaterThan', 0);
  });

  it('should show pagination if data is large enough', () => {
    cy.get('.data-explorer', { timeout: 15000 }).should('be.visible');
    cy.get('.ReactTable', { timeout: 10000 }).should('exist');

    cy.get('.pagination').then($pagination => {
      if ($pagination.length > 0) {
        cy.get('.pagination').should('be.visible');
      } else {
        cy.log('Pagination not available for this dataset');
      }
    });
  });
});