describe('Query Builder Integration Tests', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('http://localhost:9090/?component=App&fixture=with_widgets%2Fdata_explorer');
  });

  it('should update curl query when filters are added', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');

    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');

    cy.get('@iframeBody').find('.query-builder-button').click();
    cy.wait(1000);

    cy.get('@iframeBody').find('#tab-cUrl').click();
    cy.get('@iframeBody').find('#tabpanel-cUrl pre code').invoke('text').then((initialCurl) => {
      const initialQuery = initialCurl;
      
      cy.get('@iframeBody').find('.dq-rule-add').click();
      cy.get('@iframeBody').find('select[name="rules.0.field"]').select('ENG.Year');
      cy.get('@iframeBody').find('select[name="rules.0.operator"]').select('=');
      cy.get('@iframeBody').find('input[name="rules.0.value"]').type('2023');
      cy.get('@iframeBody').find('.submit-button').click();
      cy.get('@iframeBody').find('.loading', { timeout: 10000 }).should('not.exist');
      cy.wait(3000);

      cy.get('@iframeBody').find('#tabpanel-cUrl pre code').invoke('text').then((updatedCurl) => {
        expect(updatedCurl).to.not.equal(initialQuery);
        expect(updatedCurl).to.include('ENG.Year');
        expect(updatedCurl).to.include('2023');
      });
    });
  });

  it('should update Python query when filters are added', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');

    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');

    cy.get('@iframeBody').find('.query-builder-button').click();
    cy.wait(1000);

    cy.get('@iframeBody').find('#tab-Python').click();
    cy.get('@iframeBody').find('#tabpanel-Python pre code').invoke('text').then((initialPython) => {
      const initialQuery = initialPython;
      
      cy.get('@iframeBody').find('.dq-rule-add').click();
      cy.get('@iframeBody').find('select[name="rules.0.field"]').select('ENG.Week');
      cy.get('@iframeBody').find('select[name="rules.0.operator"]').select('>');
      cy.get('@iframeBody').find('input[name="rules.0.value"]').type('10');
      cy.get('@iframeBody').find('.submit-button').click();
      cy.get('@iframeBody').find('.loading', { timeout: 10000 }).should('not.exist');
      cy.wait(3000);

      cy.get('@iframeBody').find('#tabpanel-Python pre code').invoke('text').then((updatedPython) => {
        expect(updatedPython).to.not.equal(initialQuery);
        expect(updatedPython).to.include('ENG.Week');
        expect(updatedPython).to.include('10');
      });
    });
  });

  it('should update JavaScript query when filters are added', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');

    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');

    cy.get('@iframeBody').find('.query-builder-button').click();
    cy.wait(1000);

    cy.get('@iframeBody').find('#tab-Javascript').click();
    cy.get('@iframeBody').find('#tabpanel-Javascript pre code').invoke('text').then((initialJS) => {
      const initialQuery = initialJS;
      
      cy.get('@iframeBody').find('.dq-rule-add').click();
      cy.get('@iframeBody').find('select[name="rules.0.field"]').select('Peak Demand Forecast');
      cy.get('@iframeBody').find('select[name="rules.0.operator"]').select('>=');
      cy.get('@iframeBody').find('input[name="rules.0.value"]').type('50000');
      cy.get('@iframeBody').find('.submit-button').click();
      cy.get('@iframeBody').find('.loading', { timeout: 10000 }).should('not.exist');
      cy.wait(3000);

      cy.get('@iframeBody').find('#tabpanel-Javascript pre code').invoke('text').then((updatedJS) => {
        expect(updatedJS).to.not.equal(initialQuery);
        expect(updatedJS).to.include('Peak Demand Forecast');
        expect(updatedJS).to.include('50000');
      });
    });
  });

  it('should update R query when filters are added', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');

    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');

    cy.get('@iframeBody').find('.query-builder-button').click();
    cy.wait(1000);

    cy.get('@iframeBody').find('#tab-R').click();
    cy.get('@iframeBody').find('#tabpanel-R pre code').invoke('text').then((initialR) => {
      const initialQuery = initialR;
      
      cy.get('@iframeBody').find('.dq-rule-add').click();
      cy.get('@iframeBody').find('select[name="rules.0.field"]').select('Generator Availability');
      cy.get('@iframeBody').find('select[name="rules.0.operator"]').select('>');
      cy.get('@iframeBody').find('input[name="rules.0.value"]').type('80');
      cy.get('@iframeBody').find('.submit-button').click();
      cy.get('@iframeBody').find('.loading', { timeout: 10000 }).should('not.exist');
      cy.wait(3000);

      cy.get('@iframeBody').find('#tabpanel-R pre code').invoke('text').then((updatedR) => {
        expect(updatedR).to.not.equal(initialQuery);
        expect(updatedR).to.include('Generator%20Availability');
        expect(updatedR).to.include('80');
      });
    });
  });

  it('should update Pandas query when filters are added', () => {
    cy.get('iframe[src="/_loader.html"]', { timeout: 15000 }).should('be.visible');
    cy.get('iframe[src="/_loader.html"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('iframeBody');

    cy.get('@iframeBody')
      .find('.data-explorer', { timeout: 10000 })
      .should('exist');

    cy.get('@iframeBody').find('.query-builder-button').click();
    cy.wait(1000);

    cy.get('@iframeBody').find('#tab-Pandas').click();
    cy.get('@iframeBody').find('#tabpanel-Pandas pre code').invoke('text').then((initialPandas) => {
      const initialQuery = initialPandas;
      
      cy.get('@iframeBody').find('.dq-rule-add').click();
      cy.get('@iframeBody').find('select[name="rules.0.field"]').select('National Surplus');
      cy.get('@iframeBody').find('select[name="rules.0.operator"]').select('!=');
      cy.get('@iframeBody').find('input[name="rules.0.value"]').type('0');
      cy.get('@iframeBody').find('.submit-button').click();
      cy.get('@iframeBody').find('.loading', { timeout: 10000 }).should('not.exist');
      cy.wait(3000);

      cy.get('@iframeBody').find('#tabpanel-Pandas pre code').invoke('text').then((updatedPandas) => {
        expect(updatedPandas).to.not.equal(initialQuery);
        expect(updatedPandas).to.include('National Surplus');
        expect(updatedPandas).to.include('0');
      });
    });
  });

}); 