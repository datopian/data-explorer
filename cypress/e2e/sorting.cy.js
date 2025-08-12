describe('Sorting Functionality', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('http://localhost:9090/?component=App&fixture=with_widgets%2Fdata_explorer');
  });

  it('should display sortable column headers', () => {
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

    cy.get('@iframeBody').find('.ReactTable').should('exist');
    cy.get('@iframeBody').find('.ReactTable thead th').should('exist');
    cy.get('@iframeBody').find('.ReactTable thead th .cursor-pointer').should('exist');
  });

  it('should sort column in ascending order when clicked once', () => {
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

    cy.get('@iframeBody').find('.ReactTable table tbody tr').then($rows => {
      const originalFirstRowText = $rows.first().text();
      
      cy.get('@iframeBody').find('.ReactTable thead th').contains('ENG.Week').click();
      cy.wait(2000);
      
      cy.get('@iframeBody').find('.ReactTable table tbody tr').first().should('not.contain', originalFirstRowText);
      
      cy.get('@iframeBody').find('.ReactTable table tbody tr').then($sortedRows => {
        const firstValue = parseInt($sortedRows.eq(0).find('td').first().text());
        const secondValue = parseInt($sortedRows.eq(1).find('td').first().text());
        expect(firstValue).to.be.at.most(secondValue);
      });
    });
  });

  it('should sort column in descending order when clicked twice', () => {
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

    cy.get('@iframeBody').find('.ReactTable thead th').contains('ENG.Week').click();
    cy.wait(1000);
    cy.get('@iframeBody').find('.ReactTable thead th').contains('ENG.Week').click();
    cy.wait(2000);
    
    cy.get('@iframeBody').find('.ReactTable table tbody tr').then($sortedRows => {
      const firstValue = parseInt($sortedRows.eq(0).find('td').first().text());
      const secondValue = parseInt($sortedRows.eq(1).find('td').first().text());
      expect(firstValue).to.be.at.least(secondValue);
    });
  });

  it('should sort numeric columns correctly', () => {
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

    cy.get('@iframeBody').find('.ReactTable thead th').contains('Peak Demand Forecast').click();
    cy.wait(2000);
    
    cy.get('@iframeBody').find('.ReactTable table tbody tr').then($rows => {
      const values = [];
      for (let i = 0; i < Math.min(5, $rows.length); i++) {
        const value = parseInt($rows.eq(i).find('td').eq(3).text().replace(/,/g, ''));
        values.push(value);
      }
      
      for (let i = 0; i < values.length - 1; i++) {
        expect(values[i]).to.be.at.least(values[i + 1]);
      }
    });
  });

  it('should sort year column correctly', () => {
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

    cy.get('@iframeBody').find('.ReactTable thead th').contains('ENG.Year').click();
    cy.wait(2000);
    
    cy.get('@iframeBody').find('.ReactTable table tbody tr').then($rows => {
      const firstYear = parseInt($rows.eq(0).find('td').eq(1).text());
      const lastYear = parseInt($rows.eq($rows.length - 1).find('td').eq(1).text());
      expect(firstYear).to.be.at.least(lastYear);
    });
  });

  it('should sort date column correctly', () => {
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

    cy.get('@iframeBody').find('.ReactTable thead th').contains('Publish Date').click();
    cy.wait(2000);
    
    cy.get('@iframeBody').find('.ReactTable table tbody tr').then($rows => {
      const firstDate = new Date($rows.eq(0).find('td').eq(2).text());
      const secondDate = new Date($rows.eq(1).find('td').eq(2).text());
      expect(firstDate.getTime()).to.be.at.most(secondDate.getTime());
    });
  });

  it('should preserve sorting when filters are applied', () => {
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

    cy.get('@iframeBody').find('.ReactTable thead th').contains('ENG.Week').click();
    cy.wait(2000);
    
    cy.get('@iframeBody').find('.dq-rule-add').click();
    cy.get('@iframeBody').find('select[name="rules.0.field"]').select('ENG.Year');
    cy.get('@iframeBody').find('select[name="rules.0.operator"]').select('=');
    cy.get('@iframeBody').find('input[name="rules.0.value"]').type('2023');
    cy.get('@iframeBody').find('.submit-button').click();
    cy.get('@iframeBody').find('.loading', { timeout: 10000 }).should('not.exist');
    cy.wait(3000);
    
    cy.get('@iframeBody').find('.ReactTable table tbody tr').then($rows => {
      const values = [];
      for (let i = 0; i < Math.min(3, $rows.length); i++) {
        const value = parseInt($rows.eq(i).find('td').first().text());
        values.push(value);
      }
      
      for (let i = 0; i < values.length - 1; i++) {
        expect(values[i]).to.be.lessThan(values[i + 1]);
      }
    });
  });
});