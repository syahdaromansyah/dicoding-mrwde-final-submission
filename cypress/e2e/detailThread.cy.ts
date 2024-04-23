import getFullUrl from './utils/getFullUrl';

/**
 * E2E Scenario
 * ~ The Detail Thread Page Test
 *    - should show the nav header content
 *    ~ Before Login
 *      - should show the nav menu list
 *      - should show the detail thread page body content
 *    ~ After Login
 *      - should show the nav menu list
 *      - should show the detail thread page body content
 *      - should add a new comment
 */

describe('The Detail Thread Page Test', () => {
  const emailInput = '[data-cy="email-input"]';
  const passInput = '[data-cy="password-input"]';
  const commentInput = '[data-cy="comment-input"] textarea';

  const navHeaderBtn = '[data-cy="app-nav-header-menu-btn"]';
  const loginBtn = '[data-cy="login-btn"]';
  const sendCommentBtn = '[data-cy="send-comment-btn"]';

  const authorThreadTarget = 'Dicoding';
  const catThreadTarget = '#perkenalan';

  const titleThreadTarget =
    /Halo! Selamat datang dan silakan perkenalkan diri kamu/i;

  const bodyThreadTarget =
    /Bagaimana kabarmu\? Semoga baik-baik saja ya\. Sekali lagi saya ucapkan selamat datang semuanya!/i;

  const commentNameTarget = 'Dimas Saputra';
  const commentBodyTarget = /Halo!Perkanalkan, nama saya Dimas\./i;

  const threadPathTarget = '/threads/thread-91KocEqYPRz68MhD';

  const emailLogin = 'vindoe@email.com';
  const passLogin = '123123';

  it('should show the nav header content', () => {
    cy.visit(threadPathTarget);

    cy.get('a').contains('Forumy');
    cy.get(navHeaderBtn);
  });

  describe('Before Login', () => {
    it('should show the nav menu list', () => {
      cy.visit(threadPathTarget);

      cy.get(navHeaderBtn).click();

      cy.get('a').contains('Login');
      cy.get('a').contains('Register');
      cy.get('a').contains('Threads');
      cy.get('a').contains('Leaderboards');
    });

    it('should show the detail thread page body content', () => {
      cy.visit(threadPathTarget);

      cy.get('p').contains(catThreadTarget);
      cy.get('h2').contains(titleThreadTarget);

      cy.contains(bodyThreadTarget);

      cy.get('p').contains('Created by');
      cy.get('p').contains(authorThreadTarget);

      cy.get('h3').contains('Give a Comment');
      cy.get('p').contains('Login first before commenting');

      cy.get('h3').contains(/Commentary \(\d+\)/);

      cy.get('h2')
        .contains(commentNameTarget)
        .last()
        .parent()
        .siblings()
        .contains(commentBodyTarget);
    });
  });

  describe('After Login', () => {
    it('should show the nav menu list', () => {
      cy.visit('/login');

      cy.get(emailInput).type(emailLogin);
      cy.get(passInput).type(passLogin);

      cy.get(loginBtn).click();

      cy.url().should('eq', getFullUrl('/'));

      cy.get('a').contains(titleThreadTarget).last().click();

      cy.url().should('eq', getFullUrl(threadPathTarget));

      cy.get(navHeaderBtn).click();

      cy.get('p').contains('Hello! Vin Doe');
      cy.get('a').contains('Create Threads');
      cy.get('a').contains('Threads');
      cy.get('a').contains('Leaderboards');
      cy.get('button').contains('Log out');
    });

    it('should show the detail thread page body content', () => {
      cy.visit('/login');

      cy.get(emailInput).type(emailLogin);
      cy.get(passInput).type(passLogin);

      cy.get(loginBtn).click();

      cy.url().should('eq', getFullUrl('/'));

      cy.get('a').contains(titleThreadTarget).last().click();

      cy.url().should('eq', getFullUrl(threadPathTarget));

      cy.get('p').contains(catThreadTarget);
      cy.get('h2').contains(titleThreadTarget);

      cy.contains(bodyThreadTarget);

      cy.get('p').contains('Created by');
      cy.get('p').contains(authorThreadTarget);

      cy.get('h3').contains('Give a Comment');

      cy.get('p').contains('Login first before commenting').should('not.exist');

      cy.get(commentInput).should('exist');

      cy.get(sendCommentBtn)
        .should('exist')
        .should('have.text', 'Send Comment');

      cy.get('h3').contains(/Commentary \(\d+\)/i);

      cy.get('h2')
        .contains(commentNameTarget)
        .last()
        .parent()
        .siblings()
        .contains(commentBodyTarget);
    });

    it('should add a new comment', () => {
      cy.visit('/login');

      cy.get(emailInput).type(emailLogin);
      cy.get(passInput).type(passLogin);

      cy.get(loginBtn).click();

      cy.url().should('eq', getFullUrl('/'));

      cy.get('a').contains(titleThreadTarget).last().click();

      cy.url().should('eq', getFullUrl(threadPathTarget));

      cy.get(commentInput).as('commentInput').should('exist');

      const newCommentTxt = `E2E Thread Comment - ${Date.now()}`;

      cy.get('@commentInput').type(newCommentTxt);

      cy.get(sendCommentBtn).click();

      cy.get('h3').contains(/Commentary \(\d+\)/);

      cy.get('h2')
        .contains('Vin Doe')
        .first()
        .parent()
        .siblings()
        .contains(newCommentTxt);

      cy.get('h2')
        .contains(commentNameTarget)
        .last()
        .parent()
        .siblings()
        .contains(commentBodyTarget);
    });
  });
});
