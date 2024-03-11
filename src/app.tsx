import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import './index.css';
import { routeTree } from './routeTree.gen.ts';
import { store } from './rtk/store.ts';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById('app') as HTMLDivElement;
if (!rootElement.innerHTML) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ReduxProvider>
    </React.StrictMode>,
  );
}
