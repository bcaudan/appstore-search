/// <reference types="Cypress" />

import Page from '../dsl/appstore.page';

context('Appstore search', () => {
  let page;
  beforeEach(() => {
    page = new Page();
    page.open();
  });

  it('should display applications on load', () => {
    page.applications()
        .its('length')
        .should('be.gt', 0)
  });

  it('should retrieve application based on search value', () => {
    const candidate = 'NYTimes';
    page.applications().should('not.contain', candidate);
    page.search(candidate);
    page.applications().should('contain', candidate)
  });

  it('should sort applications by rank', () => {
    const maxRank = 80;
    const minRank = 1;
    page.applications().should('contain', `#${maxRank}`);
    page.sort('asc');
    page.applications().should('contain', `#${minRank}`);
    page.sort('desc');
    page.applications().should('contain', `#${maxRank}`)
  });

  it('should filter by category', () => {
    const candidate = 'Books';
    const otherCategory = 'News';
    page.applications().should('contain', otherCategory);
    page.selectCategory(candidate);
    page.applications().should('not.contain', otherCategory);
    page.applications().each(application => {
      expect(application).to.contain(candidate)
    });
  });

  it('should retrieve next page with pagination', () => {
    let firstApplication;
    page.activePage().should('contain', 1);
    page.firstApplicationName().then(name => {
      firstApplication = name.text();
    });
    page.goToPage(2);
    page.activePage().should('contain', 2);
    page.firstApplicationName().then(name => {
      expect(name.text()).not.to.equal(firstApplication);
    });
  });
});
