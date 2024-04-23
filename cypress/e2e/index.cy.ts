/**
 * E2E Scenario
 * ~ The Index Page Test
 *   - should show the index page content
 */

describe('The Index Page Test', () => {
  const filterThreadsInput = '[data-cy="filter-threads-input"]';
  const navHeaderBtn = '[data-cy="app-nav-header-menu-btn"]';

  it('should show the index page content', () => {
    cy.visit('/');

    cy.get('a').contains('Forumy');
    cy.get(navHeaderBtn).should('be.visible');

    cy.get('h2').contains('Popular Categories');

    cy.get('p').contains('#redux');
    cy.get('p').contains('#perkenalan');

    cy.get('h2').contains('List of Discussions');

    cy.get(filterThreadsInput).should('be.visible');

    cy.get('h2').contains(/Bagaimana pengalamanmu belajar Redux\?/i);

    cy.contains('Coba ceritakan dong');

    cy.get('h2').contains(
      /Halo! Selamat datang dan silakan perkenalkan diri kamu/i,
    );

    cy.contains('Bagaimana kabarmu? Semoga baik-baik saja ya.');
  });
});
