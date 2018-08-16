/// <reference types="Cypress" />

import Page from '../dsl/appstore.page';

context('Appstore search', () => {
  let page;
  beforeEach(() => {
    page = new Page();
    page.open();
  });

  it('should display applications on load', () => {
    page.getApplications()
        .its('length')
        .should('be.gt', 0)
  });

  it('should retrieve application based on search value', () => {
    const candidate = 'NYTimes';
    page.getApplications().should('not.contain', candidate);
    page.search(candidate);
    page.getApplications().should('contain', candidate)
  });

  it('should sort applications by rank', () => {
    const maxRank = 80;
    const minRank = 1;
    page.getApplications().should('contain', `#${maxRank}`);
    page.sort('asc');
    page.getApplications().should('contain', `#${minRank}`);
    page.sort('desc');
    page.getApplications().should('contain', `#${maxRank}`)
  });

  it('should filter by category', () => {
    const candidate = 'Books';
    const otherCategory = 'News';
    page.getApplications().should('contain', otherCategory);
    page.selectCategory(candidate);
    page.getApplications().should('not.contain', otherCategory);
    page.getApplications().each(application => {
      expect(application).to.contain(candidate)
    });
  });
});
