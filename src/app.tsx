import { RouterProvider, createRouter } from '@tanstack/react-router';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import useFetchProfile from './hooks/useFetchProfile.ts';
import useProfileSlice from './hooks/useProfileSlice.ts';
import './index.css';
import { routeTree } from './routeTree.gen.ts';
import PageLayout from './routes-components/PageLayout.tsx';
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
  const { profile } = useProfileSlice();
  useFetchProfile();

  return (
    <PageLayout>
      <RouterProvider
        router={router}
        context={{
          authProfile: profile,
        }}
      />
    </PageLayout>
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
