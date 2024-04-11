import { RouterProvider, createRouter } from '@tanstack/react-router';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import './index.css';
import { routeTree } from './routeTree.gen.ts';
import { setupStore } from './rtk/store.ts';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

async function enableMSW() {
  if (import.meta.env.MODE === 'development:msw') {
    const worker = await import('./msw/browser.ts');
    await worker.default.start();
  }

  // Render the app
  const rootElement = document.getElementById('app') as HTMLDivElement;
  if (!rootElement.innerHTML) {
    createRoot(rootElement).render(
      <React.StrictMode>
        <ReduxProvider store={setupStore()}>
          <RouterProvider router={router} />
        </ReduxProvider>
      </React.StrictMode>,
    );
  }
}

enableMSW();
