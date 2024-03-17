import MarkdownEditor from '@/components/MarkdownEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import useFormThread from '@/hooks/routes/new/useFormNewThread';
import useAlertSlice from '@/hooks/useAlertSlice';
import { createThread } from '@/network-data/network-data';
import { useAppDispatch } from '@/rtk/hooks';
import type { TCreateThreadResponse, TErrorResponse } from '@/types/types';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import type { ContextStore } from '@uiw/react-md-editor';
import { AxiosError } from 'axios';
import type { ChangeEvent, ChangeEventHandler, FormEventHandler } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';

// eslint-disable-next-line import/prefer-default-export
export const Route = createFileRoute('/new')({
  component: NewThread,
});

function NewThread() {
  const { title, category, body, changeTitle, changeCategory, changeBody } =
    useFormThread();

  const navigate = useNavigate({ from: '/new' });
  const dispatch = useAppDispatch();

  const { toast } = useToast();

  const { setAlert } = useAlertSlice();

  const handleTitle: ChangeEventHandler<HTMLInputElement> = (ev) =>
    changeTitle(ev.target.value);

  const handleCategory: ChangeEventHandler<HTMLInputElement> = (ev) =>
    changeCategory(ev.target.value);

  const handleBody:
    | ((
        value?: string | undefined,
        event?: ChangeEvent<HTMLTextAreaElement> | undefined,
        state?: ContextStore | undefined,
      ) => void)
    | undefined = (inputValue) => {
    changeBody(inputValue as string);
  };

  const handleSaveThread: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();

    try {
      const inputNotValid =
        isEmpty(title) ||
        isEmpty(category) ||
        isEmpty(body) ||
        !isLength(body, {
          min: 1,
        });

      if (inputNotValid) {
        dispatch(
          setAlert({
            isShown: true,
            message: 'Please input thread form correctly',
          }),
        );

        return;
      }

      const responseCreateThread = await createThread(title, body, category);

      const { thread } = (responseCreateThread.data as TCreateThreadResponse)
        .data;

      toast({
        title: 'Creating Thread',
        description: `Thread with title "${thread.title}" is successfully created`,
      });

      navigate({
        to: `/threads/$thread`,
        params: { thread: thread.id },
      });
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
    <form className="w-full" onSubmit={handleSaveThread}>
      <div className="mb-4">
        <h1 className="mb-6 text-center font-space-grotesk text-3xl font-bold">
          What your words at current moment?
        </h1>
      </div>

      <section className="mb-4 px-2 xl:px-0">
        <h2 className="sr-only">New Thread Section</h2>

        <div className="grid gap-y-2">
          <p>
            <Input
              className="px4 py-6"
              type="text"
              min={1}
              max={50}
              placeholder="Title"
              value={title}
              onChange={handleTitle}
            />
          </p>

          <p>
            <Input
              className="px4 py-6"
              type="text"
              min={1}
              max={50}
              placeholder="Category"
              value={category}
              onChange={handleCategory}
            />
          </p>
        </div>
      </section>

      <section className="mb-4 h-72 px-2 xl:px-0">
        <MarkdownEditor value={body} handleValue={handleBody} />
      </section>

      <section className="mb-4 px-2 xl:px-0">
        <p>
          <Button className="inline-block w-full" type="submit">
            Create Thread
          </Button>
        </p>
      </section>
    </form>
  );
}
