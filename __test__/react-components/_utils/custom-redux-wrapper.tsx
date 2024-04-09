import type { RenderOptions } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import type { AppStore, RootState } from '../../../src/rtk/store.ts';
import { setupStore } from '../../../src/rtk/store.ts';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export default function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
) {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
