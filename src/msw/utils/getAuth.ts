import type { DefaultBodyType, StrictRequest } from 'msw';

const getAuth = (request: StrictRequest<DefaultBodyType>) =>
  (request.headers.get('Authorization') as string).split(' ')[1];

export default getAuth;
