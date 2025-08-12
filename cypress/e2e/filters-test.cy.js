describe('Data Explorer Filters', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    
    cy.visit('http://localhost:9090/?component=App&fixture=with_widgets%2Fdata_explorer');
  });

  it('should display filter interface', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');

    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');
    
    cy.get('@iframeBody')
      .find('.datastore-query-builder')
      .should('exist')
      .should('contain', 'Add a rule');
  });

  it('should add a simple filter rule', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');
    
    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');
    
    cy.get('@iframeBody')
      .find('.datastore-query-builder')
      .should('exist');
    
    cy.get('@iframeBody').find('.datastore-query-builder').contains('Add a rule').click();
    cy.get('@iframeBody').find('.dq-rule-item').should('exist');
    cy.get('@iframeBody').find('select[name="rules.0.field"]').select('ENG.Year');
    cy.get('@iframeBody').find('select[name="rules.0.operator"]').select('=');
    cy.get('@iframeBody').find('input[name="rules.0.value"]').type('2023');
    cy.get('@iframeBody').find('.submit-button').click();
    
    cy.get('@iframeBody').find('.loading', { timeout: 10000 }).should('not.exist');
    cy.wait(3000);
  });

  it('should add multiple filter rules', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');
    
    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');
    
    cy.get('@iframeBody')
      .find('.datastore-query-builder')
      .should('exist');
    
    cy.get('@iframeBody').find('.datastore-query-builder').contains('Add a rule').click();
    cy.get('@iframeBody').find('select[name="rules.0.field"]').select('ENG.Year');
    cy.get('@iframeBody').find('select[name="rules.0.operator"]').select('=');
    cy.get('@iframeBody').find('input[name="rules.0.value"]').type('2023');
    
    cy.get('@iframeBody').find('.dq-btn-add').click();
    cy.get('@iframeBody').find('select[name="rules.1.field"]').select('ENG.Week');
    cy.get('@iframeBody').find('select[name="rules.1.operator"]').select('>');
    cy.get('@iframeBody').find('input[name="rules.1.value"]').type('10');
    
    cy.get('@iframeBody').find('.submit-button').click();
    
    cy.get('@iframeBody').find('.loading', { timeout: 10000 }).should('not.exist');
    cy.wait(3000);
  });

  it('should clear all filters with reset button', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');
    
    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');
    
    cy.get('@iframeBody')
      .find('.datastore-query-builder')
      .should('exist');
    
    cy.get('@iframeBody').find('.datastore-query-builder').contains('Add a rule').click();
    cy.get('@iframeBody').find('select[name="rules.0.field"]').select('ENG.Year');
    cy.get('@iframeBody').find('select[name="rules.0.operator"]').select('=');
    cy.get('@iframeBody').find('input[name="rules.0.value"]').type('2023');
    
    cy.get('@iframeBody').find('.dq-btn-add').click();
    cy.get('@iframeBody').find('select[name="rules.1.field"]').select('ENG.Week');
    cy.get('@iframeBody').find('select[name="rules.1.operator"]').select('>');
    cy.get('@iframeBody').find('input[name="rules.1.value"]').type('10');
    
    cy.get('@iframeBody').find('.reset-button').click();
    
    cy.get('@iframeBody').find('.dq-rule-item').should('not.exist');
  });

  it('should update data when filters are applied', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');
    
    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');
    
    cy.get('@iframeBody')
      .find('.datastore-query-builder')
      .should('exist');
    
    cy.get('@iframeBody').find('.total-rows-value').invoke('text').then((initialTotalText) => {
      const initialTotal = parseInt(initialTotalText.replace(/,/g, ''));
      
      cy.get('@iframeBody').find('.datastore-query-builder').contains('Add a rule').click();
      cy.get('@iframeBody').find('select[name="rules.0.field"]').select('ENG.Year');
      cy.get('@iframeBody').find('select[name="rules.0.operator"]').select('=');
      cy.get('@iframeBody').find('input[name="rules.0.value"]').type('2023');
      cy.get('@iframeBody').find('.submit-button').click();
      
      cy.get('@iframeBody').find('.loading', { timeout: 10000 }).should('not.exist');
      
      cy.wait(3000);
      
      cy.get('@iframeBody').find('.total-rows-value').invoke('text').then((filteredTotalText) => {
        const filteredTotal = parseInt(filteredTotalText.replace(/,/g, ''));
        expect(filteredTotal).to.be.lessThan(initialTotal);
      });
    });
  });

  it('should remove filter rules', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');
    
    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');
    
    cy.get('@iframeBody')
      .find('.datastore-query-builder')
      .should('exist');
    
    cy.get('@iframeBody').find('.datastore-query-builder').contains('Add a rule').click();
    cy.get('@iframeBody').find('select[name="rules.0.field"]').select('ENG.Year');
    cy.get('@iframeBody').find('select[name="rules.0.operator"]').select('=');
    cy.get('@iframeBody').find('input[name="rules.0.value"]').type('2023');
    cy.get('@iframeBody').find('.submit-button').click();
    
    cy.get('@iframeBody').find('.loading', { timeout: 10000 }).should('not.exist');
    
    cy.get('@iframeBody').find('.dq-btn-remove').click();
    
    cy.get('@iframeBody').find('.dq-rule-item').should('not.exist');
  });

  it('should apply different filter operators', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');
    
    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');
    
    cy.get('@iframeBody')
      .find('.datastore-query-builder')
      .should('exist');
    
    cy.get('@iframeBody').find('.datastore-query-builder').contains('Add a rule').click();
    cy.get('@iframeBody').find('select[name="rules.0.field"]').select('ENG.Year');
    cy.get('@iframeBody').find('select[name="rules.0.operator"]').select('=');
    cy.get('@iframeBody').find('input[name="rules.0.value"]').type('2023');
    cy.get('@iframeBody').find('.submit-button').click();
    cy.get('@iframeBody').find('.loading', { timeout: 10000 }).should('not.exist');
    
    cy.get('@iframeBody').find('.reset-button').click();
    cy.get('@iframeBody').find('.datastore-query-builder').contains('Add a rule').click();
    cy.get('@iframeBody').find('select[name="rules.0.field"]').select('ENG.Week');
    cy.get('@iframeBody').find('select[name="rules.0.operator"]').select('>');
    cy.get('@iframeBody').find('input[name="rules.0.value"]').type('10');
    cy.get('@iframeBody').find('.submit-button').click();
    cy.get('@iframeBody').find('.loading', { timeout: 10000 }).should('not.exist');
    
    cy.get('@iframeBody').find('.reset-button').click();
    cy.get('@iframeBody').find('.datastore-query-builder').contains('Add a rule').click();
    cy.get('@iframeBody').find('select[name="rules.0.field"]').select('ENG.Week');
    cy.get('@iframeBody').find('select[name="rules.0.operator"]').select('<');
    cy.get('@iframeBody').find('input[name="rules.0.value"]').type('50');
    cy.get('@iframeBody').find('.submit-button').click();
    cy.get('@iframeBody').find('.loading', { timeout: 10000 }).should('not.exist');
  });

  it('should handle combinator (AND/OR) logic', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');
    
    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');
    
    cy.get('@iframeBody')
      .find('.datastore-query-builder')
      .should('exist');
    
    cy.get('@iframeBody').find('.datastore-query-builder').contains('Add a rule').click();
    cy.get('@iframeBody').find('select[name="rules.0.field"]').select('ENG.Year');
    cy.get('@iframeBody').find('select[name="rules.0.operator"]').select('=');
    cy.get('@iframeBody').find('input[name="rules.0.value"]').type('2023');
    
    cy.get('@iframeBody').find('.dq-btn-add').click();
    cy.get('@iframeBody').find('select[name="rules.1.field"]').select('ENG.Week');
    cy.get('@iframeBody').find('select[name="rules.1.operator"]').select('>');
    cy.get('@iframeBody').find('input[name="rules.1.value"]').type('10');
    
    cy.get('@iframeBody').find('select[name="rules.0.combinator"]').should('have.value', 'AND');
    
    cy.get('@iframeBody').find('select[name="rules.0.combinator"]').select('OR');
    
    cy.get('@iframeBody').find('.submit-button').click();
    
    cy.get('@iframeBody').find('.loading', { timeout: 10000 }).should('not.exist');
  });

}); 