import { RouterProvider, createRouter } from '@tanstack/react-router';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import useFetchProfile from './hooks/useFetchProfile.ts';
import useProfileSlice from './hooks/useProfileSlice.ts';
import './index.css';
import { routeTree } from './routeTree.gen.ts';
import { setupStore } from './rtk/store.ts';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    authProfile: undefined!,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function RouterApp() {
  const { profile, statusProfile } = useProfileSlice();
  const { isDone } = useFetchProfile();

  return isDone &&
    (statusProfile === 'succeeded' || statusProfile === 'failed') ? (
    <RouterProvider
      router={router}
      context={{
        authProfile: profile,
      }}
    />
  ) : (
    <RouterProvider
      router={router}
      context={{
        authProfile: {
          id: '',
          name: '',
          email: '',
          avatar: '',
        },
      }}
    />
  );
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
          <RouterApp />
        </ReduxProvider>
      </React.StrictMode>,
    );
  }
}

enableMSW();
