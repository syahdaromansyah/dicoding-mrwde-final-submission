import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useAlertSlice from '@/hooks/useAlertSlice.ts';
import useAuthSlice from '@/hooks/useAuthSlice';
import { getProfile, login, putAccessToken } from '@/network-data/network-data';
import { useAppDispatch } from '@/rtk/hooks.ts';
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import type { ChangeEventHandler, FormEventHandler } from 'react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';
import useFormLogin from '../hooks/routes/login/useLogin.ts';
import type { TLoginErrorResponse, TLoginResponse } from '../types/types';

export const Route = createFileRoute('/login')({
  component: LoginRoute,
});

function LoginRoute() {
  const {
    email: emailInput,
    password: passwordInput,
    changeEmail,
    changePassword,
  } = useFormLogin();

  const navigate = useNavigate({
    from: '/login',
  });

  const dispatch = useAppDispatch();

  const { setAuth } = useAuthSlice();
  const { setAlert } = useAlertSlice();

  const handleEmail: ChangeEventHandler<HTMLInputElement> = (ev) =>
    changeEmail(ev.target.value);

  const handlePassword: ChangeEventHandler<HTMLInputElement> = (ev) =>
    changePassword(ev.target.value);

  const handleLogin: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();

    try {
      const inputNotValid =
        !isEmail(emailInput) ||
        isEmpty(passwordInput) ||
        !isLength(passwordInput, {
          min: 6,
        });

      if (inputNotValid) {
        dispatch(
          setAlert({
            isShown: true,
            message: 'Please input login form correctly',
          }),
        );

        return;
      }

      const response = await login(emailInput, passwordInput);

      if (response instanceof AxiosError) {
        dispatch(
          setAlert({
            isShown: true,
            message: (response.response?.data as TLoginErrorResponse).message,
          }),
        );

        return;
      }

      dispatch(
        setAlert({
          isShown: false,
          message: '',
        }),
      );

      putAccessToken((response.data as TLoginResponse).data.token);

      const { data: dataProfile } = await getProfile();

      const { id, name, email, avatar } = dataProfile.data.user;

      dispatch(
        setAuth({
          id,
          name,
          email,
          avatar,
        }),
      );

      navigate({ to: '/' });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          dispatch(
            setAlert({
              isShown: true,
              message: (error.response.data as TLoginErrorResponse).message,
            }),
          );
        }
      }
    }
  };

  return (
    <div className="flex h-full min-h-[490px] w-full items-center justify-center px-2 md:px-0">
      <form className="w-full" onSubmit={handleLogin}>
        <div className="mb-4">
          <h1 className="mb-2 text-center font-space-grotesk text-3xl font-bold">
            Login Page
          </h1>

          <p className="text-center">
            Don&lsquo;t have an account?{' '}
            <Link className="inline-block underline" to="/register">
              Sign up
            </Link>
          </p>
        </div>

        <section className="mx-auto mb-4 max-w-lg">
          <h2 className="sr-only">Login Information Section</h2>

          <div className="grid gap-y-2">
            <p>
              <Input
                className="px4 py-6"
                type="email"
                placeholder="Email"
                value={emailInput}
                onChange={handleEmail}
              />
            </p>

            <p>
              <Input
                className="px4 py-6"
                type="password"
                min={6}
                placeholder="Password"
                value={passwordInput}
                onChange={handlePassword}
              />
            </p>
          </div>
        </section>

        <section className="mx-auto mb-4 max-w-lg">
          <p>
            <Button className="inline-block w-full" type="submit">
              Submit
            </Button>
          </p>
        </section>
      </form>
    </div>
  );
}
