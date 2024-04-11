/* eslint-disable import/no-extraneous-dependencies */
import { setupWorker } from 'msw/browser';
import mswHandlers from './handlers.ts';

const mswWorker = setupWorker(...mswHandlers);

export default mswWorker;
