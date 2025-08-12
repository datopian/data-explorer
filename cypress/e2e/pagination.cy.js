describe('Pagination Functionality', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('http://localhost:9090/?component=App&fixture=with_widgets%2Fdata_explorer');
  });

  it('should display pagination controls when data exceeds page size', () => {
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
    cy.get('@iframeBody').find('ul.pagination').should('exist');
    cy.get('@iframeBody').find('li.previous').should('exist');
    cy.get('@iframeBody').find('li.next').should('exist');
  });

  it('should show correct number of rows per page', () => {
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

    cy.get('@iframeBody').find('.ReactTable table tbody tr').should('have.length.greaterThan', 0);
    cy.get('@iframeBody').find('.ReactTable table tbody tr').should('have.length.lessThan', 101);
    cy.get('@iframeBody').find('ul.pagination').should('exist');
  });

  it('should navigate to next page when Next button is clicked', () => {
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

    cy.get('@iframeBody').find('.ReactTable table tbody tr').then($firstPageRows => {
      const firstPageFirstRowText = $firstPageRows.first().text();
      
      cy.get('@iframeBody').find('li.next a').should('not.have.attr', 'aria-disabled', 'true').click();
      cy.wait(2000);
      
      cy.get('@iframeBody').find('.ReactTable table tbody tr').first().should('not.contain', firstPageFirstRowText);
      cy.get('@iframeBody').find('li.active a').should('contain', '2');
    });
  });

  it('should navigate to previous page when Previous button is clicked', () => {
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

    cy.get('@iframeBody').find('li.next a').should('not.have.attr', 'aria-disabled', 'true').click();
    cy.wait(2000);
    cy.get('@iframeBody').find('li.active a').should('contain', '2');

    cy.get('@iframeBody').find('.ReactTable table tbody tr').then($secondPageRows => {
      const secondPageFirstRowText = $secondPageRows.first().text();
      
      cy.get('@iframeBody').find('li.previous a').should('not.have.attr', 'aria-disabled', 'true').click();
      cy.wait(2000);
      
      cy.get('@iframeBody').find('.ReactTable table tbody tr').first().should('not.contain', secondPageFirstRowText);
      cy.get('@iframeBody').find('li.active a').should('contain', '1');
    });
  });

  it('should allow direct page navigation via page numbers', () => {
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

    cy.get('@iframeBody').find('ul.pagination li').contains('3').click();
    cy.wait(2000);

    cy.get('@iframeBody').find('li.active a').should('contain', '3');
  });

  it('should preserve filters when navigating between pages', () => {
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

    cy.get('@iframeBody').find('.dq-rule-add').click();
    cy.get('@iframeBody').find('select[name="rules.0.field"]').select('ENG.Year');
    cy.get('@iframeBody').find('select[name="rules.0.operator"]').select('=');
    cy.get('@iframeBody').find('input[name="rules.0.value"]').type('2024');
    cy.get('@iframeBody').find('.submit-button').click();
    cy.get('@iframeBody').find('.loading', { timeout: 10000 }).should('not.exist');
    cy.wait(3000);

    cy.get('@iframeBody').find('.total-rows-value').invoke('text').then((filteredRows) => {
      const filteredCount = parseInt(filteredRows.replace(/,/g, ''));

      cy.get('@iframeBody').find('li.next a').then($nextBtn => {
        if ($nextBtn.attr('aria-disabled') !== 'true') {
          cy.wrap($nextBtn).click();
          cy.wait(2000);

          cy.get('@iframeBody').find('.total-rows-value').invoke('text').then((pageRows) => {
            const pageCount = parseInt(pageRows.replace(/,/g, ''));
            expect(pageCount).to.equal(filteredCount);
          });

          cy.get('@iframeBody').find('.dq-rule-item').should('exist');
          cy.get('@iframeBody').find('input[name="rules.0.value"]').should('have.value', '2024');
        }
      });
    });
  });

  it('should preserve query context when navigating between pages', () => {
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

    cy.get('@iframeBody').find('.dq-rule-add').click();
    cy.get('@iframeBody').find('select[name="rules.0.field"]').select('ENG.Year');
    cy.get('@iframeBody').find('select[name="rules.0.operator"]').select('>=');
    cy.get('@iframeBody').find('input[name="rules.0.value"]').type('2020');
    cy.get('@iframeBody').find('.submit-button').click();
    cy.get('@iframeBody').find('.loading', { timeout: 10000 }).should('not.exist');
    cy.wait(3000);

    cy.get('@iframeBody').find('li.next a').then($nextBtn => {
      if ($nextBtn.attr('aria-disabled') !== 'true') {
        cy.wrap($nextBtn).click();
        cy.wait(2000);

        cy.get('@iframeBody').find('.ReactTable table tbody tr').each(($row) => {
          cy.wrap($row).find('td').first().should('exist');
        });

        cy.get('@iframeBody').find('select[name="rules.0.field"]').should('have.value', 'ENG.Year');
        cy.get('@iframeBody').find('select[name="rules.0.operator"]').should('have.value', '>=');
        cy.get('@iframeBody').find('input[name="rules.0.value"]').should('have.value', '2020');
      }
    });
  });

  it('should disable navigation buttons appropriately', () => {
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

    cy.get('@iframeBody').find('li.active a').should('contain', '1');
    cy.get('@iframeBody').find('li.next a').should('not.have.attr', 'aria-disabled', 'true');
  });

  it('should show accurate page information and total counts', () => {
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

    cy.get('@iframeBody').find('li.active a').should('contain', '1');
    cy.get('@iframeBody').find('ul.pagination li').should('have.length.greaterThan', 3);
    cy.get('@iframeBody').find('.total-rows-value').should('exist');
    cy.get('@iframeBody').find('.total-rows-value').invoke('text').should('match', /\d+/);
  });

  it('should maintain pagination state when switching between table and chart views', () => {
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

    cy.get('@iframeBody').find('li.next a').then($nextBtn => {
      if ($nextBtn.attr('aria-disabled') !== 'true') {
        cy.wrap($nextBtn).click();
        cy.wait(2000);
        cy.get('@iframeBody').find('li.active a').should('contain', '2');

        cy.get('@iframeBody').find('button[id^="tab-Chart-"]').click();
        cy.wait(2000);

        cy.get('@iframeBody').find('button[id^="tab-Table-"]').click();
        cy.wait(1000);

        cy.get('@iframeBody').find('li.active a').should('contain', '2');
      }
    });
  });
});