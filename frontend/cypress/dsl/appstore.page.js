export default class Page {
  open() {
    cy.visit('http://localhost:5000');
    this.waitApplicationsLoaded();
  }

  waitApplicationsLoaded() {
    cy.get('.applications .application').should('be.visible');
    cy.get('.loading.visible').should('not.be.visible');
  }

  applications() {
    return cy.get('.applications .application');
  }

  firstApplicationName() {
    return cy.get('.applications .application:first .card-title')
  }

  search(candidate) {
    cy.get('.search input').type(candidate);
    this.waitApplicationsLoaded();
  }

  sort(type) {
    cy.get('.sort').click();
    cy.get(`[data-sort="${type}"]`).should('be.visible');
    cy.get(`[data-sort="${type}"]`).click();
    cy.get(`[data-sort="${type}"]`).should('not.be.visible');
    this.waitApplicationsLoaded();
  }

  selectCategory(name) {
    cy.get('.category-toggle').click();
    cy.get('.category').contains(name).click();
    cy.get('.category').should('not.be.visible');
    this.waitApplicationsLoaded();
  }

  activePage() {
    return cy.get('.pagination .active')
  }

  goToPage(page) {
    cy.get('.pagination').contains(page).click()
  }
}
