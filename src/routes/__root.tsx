import AlertBox from '@/components/Alert';
import useProfile from '@/hooks/react-query-network/useProfile';
import useSetProfile from '@/hooks/routes/__root/useSetProfile';
import useAlertSlice from '@/hooks/useAlertSlice';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { AnimatePresence, motion } from 'framer-motion';
import HeaderApp from '../routes-components/HeaderApp';
import PageLayout from '../routes-components/PageLayout';

export const Route = createRootRoute({
  component: () => <RootRoute />,
});

function RootRoute() {
  const { data: dataProfile } = useProfile();
  const { alert } = useAlertSlice();

  useSetProfile({ dataProfile });

  return (
    <>
      <PageLayout>
        <div className="flex h-full max-h-full flex-col">
          <div className="flex-none">
            <div className="relative">
              <div className="absolute left-1/2 top-24 z-20 -translate-x-1/2">
                <AnimatePresence>
                  {alert.isShown && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0, rotate: 15 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                    >
                      <AlertBox />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="h-full max-h-full flex-1 overflow-y-auto scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-700 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-corner-rounded-full">
            <div className="mx-auto max-w-5xl">
              <div className="sticky left-0 top-2 z-20 mb-8">
                <HeaderApp />
              </div>

              <main>
                <Outlet />
              </main>
            </div>
          </div>
        </div>
      </PageLayout>
      <TanStackRouterDevtools />
    </>
  );
}
