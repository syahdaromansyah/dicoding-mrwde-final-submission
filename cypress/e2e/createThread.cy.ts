import getFullUrl from './utils/getFullUrl';

/**
 * E2E Scenario (9 Test Scenarios)
 * ~ The Creating Thread Page Test
 *    ~ Before Login
 *      - should redirect to the login page
 *    ~ After Login
 *      - should not redirect to the login page
 *      - should not redirect to the login page,
 *        when visiting the creating thread page directly
 *      - should show the creating thread page body content
 *      - should show an error alert when input form is empty
 *      - should show an success toast,
 *        when creating thread is success
 *      - should redirect to a new detail thread page,
 *        after creating a thread
 *      - should add a new comment in a new thread page
 *      - should available in the threads page,
 *        after creating a new thread
 */

describe('The Creating Thread Page Test', () => {
  const pageContentContainer = '[data-cy="page-content-container"]';

  const emailInput = '[data-cy="email-input"]';
  const passInput = '[data-cy="password-input"]';
  const loginBtn = '[data-cy="login-btn"]';
  const titleInput = '[data-cy="title-input"]';
  const catInput = '[data-cy="category-input"]';
  const bodyInput = '[data-cy="body-input"] textarea';
  const commentInput = '[data-cy="comment-input"] textarea';

  const navHeaderBtn = '[data-cy="app-nav-header-menu-btn"]';
  const alertXBtn = '[data-cy="alert-close-btn"]';
  const createBtn = '[data-cy="create-btn"]';
  const sendCommentBtn = '[data-cy="send-comment-btn"]';

  describe('Before Login', () => {
    it('should redirect to the login page', () => {
      cy.visit('/new');
      cy.url().should('include', getFullUrl('/login?redirect'));
    });
  });

  describe('After Login', () => {
    it('should not redirect to the login page', () => {
      cy.visit('/login');

      cy.get(emailInput).type('foodoe@email.com');
      cy.get(passInput).type('123123');

      cy.get(loginBtn).click();

      cy.url().should('eq', getFullUrl('/'));

      cy.get(navHeaderBtn).click();

      cy.get('a').contains('Create Thread').click();

      cy.url().should('eq', getFullUrl('/new'));
    });

    it('should not redirect to the login page when visiting the creating thread page directly', () => {
      cy.visit('/login');

      cy.get(emailInput).type('foodoe@email.com');
      cy.get(passInput).type('123123');

      cy.get(loginBtn).click();

      cy.url().should('eq', getFullUrl('/'));

      cy.visit('/new');

      cy.url().should('eq', getFullUrl('/new'));
      cy.url().should('not.eq', getFullUrl('/login'));
    });

    it('should show the creating thread page body content', () => {
      cy.visit('/login');

      cy.get(emailInput).type('foodoe@email.com');
      cy.get(passInput).type('123123');

      cy.get(loginBtn).click();

      cy.get(navHeaderBtn).click();

      cy.get('a').contains('Create Thread').click();

      cy.get('h1').contains('What your words at current moment?');

      cy.get(titleInput).should('be.visible');
      cy.get(catInput).should('be.visible');
      cy.get(bodyInput).should('be.visible');
      cy.get(createBtn).should('be.visible');
    });

    it('should show an error alert when input form is empty', () => {
      // Login first before adding a new thread
      cy.visit('/login');

      cy.get(emailInput).type('foodoe@email.com');
      cy.get(passInput).type('123123');

      cy.get(loginBtn).click();

      // Going to the creating thread page
      cy.get(navHeaderBtn).click();
      cy.get('a').contains('Create Thread').click();

      // Creating an alias for the inputs form
      cy.get(titleInput).as('titleInput').should('be.visible');
      cy.get(catInput).as('catInput').should('be.visible');
      cy.get(bodyInput).as('bodyInput').should('be.visible');
      cy.get(createBtn).as('createBtn').should('be.visible');

      // Showing an error alert when all inputs is empty
      cy.get('@createBtn').click();

      cy.get('h5').contains('Heads up!').as('alertTitle');

      cy.get('p').contains('Please input thread form correctly').as('alertTxt');

      cy.get(alertXBtn).as('alertXBtn').click();

      // Showing an error alert when each input is empty
      // Title input has a value
      // Category and body inputs are empty
      cy.get('@titleInput').type('New Title Thread');
      cy.get('@createBtn').click();

      cy.get('@alertTitle');
      cy.get('@alertTxt');
      cy.get('@alertXBtn').click();

      // Title and category inputs have a value
      // Body input is empty
      cy.get('@titleInput').clear();
      cy.get('@catInput').clear();
      cy.get('@bodyInput').clear();

      cy.get('@titleInput').type('New Title Thread');
      cy.get('@catInput').type('New Cat Thread');
      cy.get('@createBtn').click();

      cy.get('@alertTitle');
      cy.get('@alertTxt');
      cy.get('@alertXBtn').click();

      // Title and body inputs have a value
      // Category input is empty
      cy.get('@titleInput').clear();
      cy.get('@catInput').clear();
      cy.get('@bodyInput').clear();

      cy.get('@titleInput').type('New Title Thread');
      cy.get('@bodyInput').type('New Body Thread');
      cy.get('@createBtn').click();

      cy.get('@alertTitle');
      cy.get('@alertTxt');
      cy.get('@alertXBtn').click();

      // Category input has a value
      // Title and body inputs are empty
      cy.get('@titleInput').clear();
      cy.get('@catInput').clear();
      cy.get('@bodyInput').clear();

      cy.get('@catInput').type('New Cat Thread');
      cy.get('@createBtn').click();

      cy.get('@alertTitle');
      cy.get('@alertTxt');
      cy.get('@alertXBtn').click();

      // Category and body inputs have a value
      // Title input is empty
      cy.get('@titleInput').clear();
      cy.get('@catInput').clear();
      cy.get('@bodyInput').clear();

      cy.get('@catInput').type('New Cat Thread');
      cy.get('@bodyInput').type('New Body Thread');
      cy.get('@createBtn').click();

      cy.get('@alertTitle');
      cy.get('@alertTxt');
      cy.get('@alertXBtn').click();

      // Body input has a a value
      // Title and category inputs are empty
      cy.get('@titleInput').clear();
      cy.get('@catInput').clear();
      cy.get('@bodyInput').clear();

      cy.get('@bodyInput').type('New Body Thread');
      cy.get('@createBtn').click();

      cy.get('@alertTitle');
      cy.get('@alertTxt');
      cy.get('@alertXBtn');
    });

    it('should show an success toast when creating thread is success', () => {
      // Login first before going to the creating a thread page
      cy.visit('/login');

      cy.get(emailInput).type('foodoe@email.com');
      cy.get(passInput).type('123123');

      cy.get(loginBtn).click();

      cy.get(navHeaderBtn).click();

      cy.get('a').contains('Create Thread').click();

      // Creating a new thread
      cy.get(titleInput).type('A New Thread');
      cy.get(catInput).type('New Thread');
      cy.get(bodyInput).type('# New Thread');

      cy.get(createBtn).click();

      // Validating the success alert content
      cy.contains('Creating Thread');
      cy.contains('Thread with title "A New Thread" is successfully created');
    });

    it('should redirect to a new detail thread page after creating a thread', () => {
      // Login first before going to the creating a thread page
      cy.visit('/login');

      cy.get(emailInput).type('foodoe@email.com');
      cy.get(passInput).type('123123');

      cy.get(loginBtn).click();

      cy.get(navHeaderBtn).click();
      cy.get('a').contains('Create Thread').click();

      // Creating a new thread
      cy.get(titleInput).type('A New Thread');
      cy.get(catInput).type('New Thread');
      cy.get(bodyInput).type('# New Thread');

      cy.get(createBtn).click();

      // Validating the URL path
      cy.url().should('not.eq', getFullUrl('/new'));
      cy.url().should('include', getFullUrl('/threads/thread-'));

      // Validating the new detail thread page
      cy.get('p').contains('#newthread');
      cy.get('h2').contains('A New Thread');

      cy.get('h1').contains('New Thread');

      cy.get('p').contains('Created by');
      cy.get('p').contains('Foo Doe');

      cy.get('h3').contains('Give a Comment');

      cy.get(pageContentContainer).scrollTo('bottom');

      cy.get(commentInput).should('be.visible');
      cy.get(sendCommentBtn).should('be.visible');

      cy.get('h3').contains('Commentary (0)');
      cy.get('p').contains('There is no commentary yet.');
    });

    it('should add a new comment in a new thread page', () => {
      // Login first before going to the creating a thread page
      cy.visit('/login');

      cy.get(emailInput).type('foodoe@email.com');
      cy.get(passInput).type('123123');

      cy.get(loginBtn).click();

      cy.get(navHeaderBtn).click();
      cy.get('a').contains('Create Thread').click();

      // Creating a new thread
      cy.get(titleInput).type('A New Thread');
      cy.get(catInput).type('New Thread');
      cy.get(bodyInput).type('# New Thread');

      cy.get(createBtn).click();

      // Adding a new comment in the new thread page
      const newCommentContent = 'This comment is just for testing only';

      cy.get(commentInput).type(newCommentContent);
      cy.get(sendCommentBtn).click();

      // Verifying a new comment is showed in the new
      // thread page
      cy.get('h3').contains('Commentary (1)');

      cy.get('h2').contains('Foo Doe');
      cy.get('p').contains(newCommentContent);
    });

    it('should available in the threads page after creating a new thread', () => {
      // Login first before going to the creating a thread page
      cy.visit('/login');

      cy.get(emailInput).type('foodoe@email.com');
      cy.get(passInput).type('123123');

      cy.get(loginBtn).click();

      cy.get(navHeaderBtn).click();
      cy.get('a').contains('Create Thread').click();

      // Creating a new thread
      cy.get(titleInput).type('A New Thread');
      cy.get(catInput).type('New Thread');
      cy.get(bodyInput).type('# New Thread');

      cy.get(createBtn).click();

      // Validating a new thread in the threads page
      cy.get('a').contains('Forumy').click();

      cy.url().should('eq', getFullUrl('/'));

      cy.get('h2').contains('A New Thread');
      cy.contains('New Thread...');
    });
  });
});
