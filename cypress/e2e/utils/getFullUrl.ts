const getFullUrl = (path: string) =>
  new URL(path, Cypress.config().baseUrl).href;

export default getFullUrl;
