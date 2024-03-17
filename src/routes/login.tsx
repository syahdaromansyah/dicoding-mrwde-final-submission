import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import useAlertSlice from '@/hooks/useAlertSlice.ts';
import { putAccessToken } from '@/network-data/network-data';
import { login } from '@/network-data/network-data.ts';
import { useAppDispatch } from '@/rtk/hooks.ts';
import type { TErrorResponse, TLoginResponse } from '@/types/types.ts';
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import type { ChangeEventHandler, FormEventHandler } from 'react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';
import useFormLogin from '../hooks/routes/login/useLogin.ts';

// eslint-disable-next-line import/prefer-default-export
export const Route = createFileRoute('/login')({
  component: LoginRoute,
});

function LoginRoute() {
  const navigate = useNavigate({
    from: '/login',
  });

  const dispatch = useAppDispatch();

  const { toast } = useToast();

  const {
    email: emailInput,
    password: passwordInput,
    changeEmail,
    changePassword,
  } = useFormLogin();

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

      const responseLogin = await login(emailInput, passwordInput);

      const responseDataLogin = responseLogin.data as TLoginResponse;

      putAccessToken(responseDataLogin.data.token);

      dispatch(
        setAlert({
          isShown: false,
          message: '',
        }),
      );

      toast({
        title: 'Login Account',
        description: 'Login is success',
      });

      navigate({ to: '/' });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          const { message } = error.response.data as TErrorResponse;

          dispatch(
            setAlert({
              isShown: true,
              message: `Error: ${message}`,
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
