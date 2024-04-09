import AlertBox from '@/components/Alert';
import { Toaster } from '@/components/ui/toaster';
import useLogOut from '@/hooks/routes/root/useLogOut';
import useAlertSlice from '@/hooks/useAlertSlice';
import useFetchProfile from '@/hooks/useFetchProfile';
import useProfileSlice from '@/hooks/useProfileSlice';
import RootPageNotFound from '@/routes-components/RootPageNotFound';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { AnimatePresence, motion } from 'framer-motion';
import HeaderApp from '../routes-components/HeaderApp';
import PageLayout from '../routes-components/PageLayout';

// eslint-disable-next-line import/prefer-default-export
export const Route = createRootRoute({
  component: () => <RootRoute />,
  notFoundComponent: () => <RootPageNotFound />,
});

function RootRoute() {
  const { alert } = useAlertSlice();
  const { profile } = useProfileSlice();
  const { handleLogOut } = useLogOut();

  useFetchProfile();

  return (
    <>
      <PageLayout>
        <div className="flex h-full max-h-full flex-col">
          <div className="flex-none">
            <div className="relative">
              <div className="absolute left-0 top-24 z-20 flex w-full justify-center">
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

          <div className="h-full max-h-full flex-1">
            <div className="mx-auto h-full min-h-full overflow-y-auto scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-700 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-corner-rounded-full">
              <div className="mx-auto max-w-5xl pb-6">
                <div className="sticky left-0 top-4 z-20 mb-8">
                  <HeaderApp profile={profile} handleLogOut={handleLogOut} />
                </div>

                <main className="h-[calc(100%-108px)]">
                  <Outlet />
                </main>

                <Toaster />
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
      <TanStackRouterDevtools />
    </>
  );
}
