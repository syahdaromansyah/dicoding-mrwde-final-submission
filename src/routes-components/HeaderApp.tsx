import useCloseNav from '@/hooks/routes-component/HeaderApp/useCloseNav';
import useAuthSlice from '@/hooks/useAuthSlice';
import { useAppDispatch } from '@/rtk/hooks';
import { Link, useNavigate } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { CiCreditCard2 } from 'react-icons/ci';
import { GoPerson } from 'react-icons/go';
import { HiBars2 } from 'react-icons/hi2';
import {
  MdLogout,
  MdOutlineChat,
  MdOutlineEditNote,
  MdOutlineLeaderboard,
} from 'react-icons/md';
import useShow from '../hooks/useShow';

function NavLink({
  children,
  to,
  handleNavClose,
}: Readonly<{
  children: ReactNode;
  to: string;
  handleNavClose: () => void;
}>) {
  return (
    <p>
      <Link
        className="font-poppins flex gap-x-2 rounded-md px-8 py-3 transition hover:bg-gray-300 dark:outline-none dark:hover:bg-gray-800"
        to={to}
        onClick={handleNavClose}
      >
        {children}
      </Link>
    </p>
  );
}

export default function HeaderApp() {
  const navBtnElem = useRef<HTMLButtonElement | null>(null);

  const { isShown, show, hide } = useShow();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { auth, setAuth } = useAuthSlice();

  const handleLogOut = () => {
    dispatch(
      setAuth({
        id: '',
        name: '',
        email: '',
        avatar: '',
      }),
    );

    navigate({ to: '/login' });
  };

  const handleNav = () => {
    if (isShown) hide();
    else show();
  };

  const handleCloseNav = () => hide();

  useCloseNav({ navBtnElem, hide });

  return (
    <header>
      <div className="relative mb-4">
        <nav>
          <div className="flex items-center justify-between rounded-xl bg-gray-200/60 px-4 py-3 shadow shadow-gray-100 backdrop-blur dark:bg-gray-800/60 dark:shadow-none">
            <div>
              <p className="font-space-grotesk text-2xl font-semibold">
                <Link to="/">Forum App</Link>
              </p>
            </div>

            <p>
              <button
                ref={navBtnElem}
                type="button"
                className="btn-nav block rounded-full border border-gray-400 p-2 ring-offset-2 transition hover:bg-gray-300 hover:ring-blue-600 focus:ring dark:border-gray-400 dark:outline-none dark:ring-offset-gray-700 dark:hover:bg-gray-700"
                onClick={handleNav}
              >
                <HiBars2 className="text-xl" />
                <span className="sr-only">Open navigation menu</span>
              </button>
            </p>
          </div>
        </nav>

        <AnimatePresence>
          {isShown && (
            <motion.div
              initial={{ opacity: 0, scale: 0, top: -10 }}
              animate={{ opacity: 1, scale: 1, top: 80 }}
              transition={{ type: 'spring', stiffness: 100 }}
              exit={{ opacity: 0, scale: 0, top: -60 }}
              className="nav-menu absolute right-0 top-20 z-10"
            >
              <div className="rounded-md bg-gray-200/80 p-2 backdrop-blur dark:bg-gray-600/60">
                <div className="grid gap-y-2">
                  {auth.id ? (
                    <p className="font-poppins flex gap-x-2 rounded-md border-b px-8 py-3 dark:border-gray-600">
                      <span className="flex cursor-default items-center gap-x-2">
                        <img
                          className="w-8 rounded-full"
                          src={auth.avatar}
                          alt={`${auth.name} avatar`}
                        />
                        <span>Hello! {auth.name}</span>
                      </span>
                    </p>
                  ) : (
                    <div>
                      <NavLink to="/login" handleNavClose={handleCloseNav}>
                        <GoPerson className="text-xl" />
                        Login
                      </NavLink>

                      <NavLink to="/register" handleNavClose={handleCloseNav}>
                        <CiCreditCard2 className="text-xl" />
                        Register
                      </NavLink>
                    </div>
                  )}

                  <div>
                    {auth.id ? (
                      <NavLink to="/new" handleNavClose={handleCloseNav}>
                        <MdOutlineEditNote className="text-xl" />
                        Create Threads
                      </NavLink>
                    ) : null}

                    <NavLink to="/" handleNavClose={handleCloseNav}>
                      <MdOutlineChat className="text-xl" />
                      Threads
                    </NavLink>

                    <NavLink to="/leaderboards" handleNavClose={handleCloseNav}>
                      <MdOutlineLeaderboard className="text-xl" />
                      Leaderboards
                    </NavLink>

                    {auth.id ? (
                      <p>
                        <button
                          className="font-poppins flex w-full gap-x-2 rounded-md px-8 py-3 transition hover:bg-gray-300 dark:outline-none dark:hover:bg-gray-800"
                          type="button"
                          onClick={handleLogOut}
                        >
                          <MdLogout className="text-xl" />
                          Log out
                        </button>
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
