/**
 * E2E Scenario (1 Test Scenario)
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
    cy.get('p').contains('#intro');

    cy.get('h2').contains('List of Discussions');

    cy.get(filterThreadsInput).should('be.visible');

    cy.get('h2').contains('Hello and Welcome to My Thread!');

    cy.contains(
      'Hello there and welcome to my thread! Please introduce yourself in the comment below...',
    );

    cy.get('h2').contains('How was your experience when learning Redux?');

    cy.contains(
      'Please share your experience when learning Redux in the comment below...',
    );
  });
});
