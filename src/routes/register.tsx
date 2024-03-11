import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useFormRegister from '@/hooks/routes/register/useFormRegister';
import useAlertSlice from '@/hooks/useAlertSlice';
import { register } from '@/network-data/network-data';
import { useAppDispatch } from '@/rtk/hooks';
import type { TRegisterErrorResponse, TRegisterResponse } from '@/types/types';
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import type { ChangeEventHandler, FormEventHandler } from 'react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';

export const Route = createFileRoute('/register')({
  component: Register,
});

function Register() {
  const { name, email, password, changeName, changeEmail, changePassword } =
    useFormRegister();

  const navigate = useNavigate({
    from: '/register',
  });

  const dispatch = useAppDispatch();

  const { setAlert } = useAlertSlice();

  const handleName: ChangeEventHandler<HTMLInputElement> = (ev) =>
    changeName(ev.target.value);

  const handleEmail: ChangeEventHandler<HTMLInputElement> = (ev) =>
    changeEmail(ev.target.value);

  const handlePassword: ChangeEventHandler<HTMLInputElement> = (ev) =>
    changePassword(ev.target.value);

  const handleRegister: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const inputNotValid =
        isEmpty(name) ||
        !isEmail(email) ||
        isEmpty(password) ||
        !isLength(password, {
          min: 6,
        });

      if (inputNotValid) {
        dispatch(
          setAlert({
            isShown: true,
            message: 'Please input register form correctly',
          }),
        );
        return;
      }

      const response = await register(name, email, password);

      const data = (response.data as TRegisterResponse).data.user;

      if (data.id) navigate({ to: '/login' });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          dispatch(
            setAlert({
              isShown: true,
              message: (error.response.data as TRegisterErrorResponse).message,
            }),
          );
        }
      }
    }
  };

  return (
    <div className="flex h-full min-h-[490px] w-full items-center justify-center px-2 md:px-0">
      <form className="w-full" onSubmit={handleRegister}>
        <div className="mb-4">
          <h1 className="mb-2 text-center font-space-grotesk text-3xl font-bold">
            Register Page
          </h1>

          <p className="text-center">
            Have an account?{' '}
            <Link className="inline-block underline" to="/login">
              Login
            </Link>
          </p>
        </div>

        <section className="mx-auto mb-4 max-w-lg">
          <h2 className="sr-only">Register Information Section</h2>

          <div className="grid gap-y-2">
            <p>
              <Input
                className="px4 py-6"
                type="text"
                min={1}
                placeholder="Name"
                value={name}
                onChange={handleName}
              />
            </p>

            <p>
              <Input
                className="px4 py-6"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmail}
              />
            </p>

            <p>
              <Input
                className="px4 py-6"
                type="password"
                min={6}
                placeholder="Password"
                value={password}
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
