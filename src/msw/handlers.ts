/* eslint-disable import/no-extraneous-dependencies */
import type { TThreadData, TThreadsSingleData } from '@/types/types';
import type { HttpHandler } from 'msw';
import { HttpResponse, http } from 'msw';
import { nanoid } from 'nanoid';
import validator from 'validator';
import createAvatarURL from './utils/createAvatarURL';
import getAuth from './utils/getAuth';

type TCredentials = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type TCreateThreadReqBody = {
  title: string;
  body: string;
  category: string;
};

type TCreateCommentReqBody = {
  content: string;
};

type TUser = Omit<TCredentials, 'password'> & {
  avatar: string;
};

type TLoginReqBody = Omit<TCredentials, 'name'>;
type TRegisterReqBody = Omit<TCredentials, 'id'>;

const BASE_URL = 'https://forum-api.dicoding.dev/v1';

const accounts = new Map<string, TCredentials>();

const fooAccount = {
  id: `user1`,
  name: 'Foo Doe',
  email: 'foodoe@email.com',
  password: '123123',
};

accounts.set(fooAccount.id, fooAccount);

const barAccount = {
  id: `user2`,
  name: 'Bar Doe',
  email: 'bardoe@email.com',
  password: '123123',
};

accounts.set(barAccount.id, barAccount);

const threads = new Map<string, TThreadData>();

const threadOne = {
  id: `thread1`,
  title: 'How was your experience when learning Redux?',
  body: 'Please share your experience when learning Redux in the comment below',
  category: 'redux',
  createdAt: '2023-05-29T07:55:52.266Z',
  upVotesBy: [barAccount.id],
  downVotesBy: [],
  comments: [],
  owner: {
    id: fooAccount.id,
    name: fooAccount.name,
    avatar: createAvatarURL(fooAccount.name),
  },
};

threads.set(threadOne.id, threadOne);

const threadTwo = {
  id: `thread2`,
  title: 'Hello and Welcome to My Thread!',
  body: '<p>Hello there and welcome to my thread! Please introduce yourself in the comment below</p>',
  category: 'intro',
  createdAt: '2023-05-29T07:54:35.746Z',
  comments: [
    {
      id: `comment1`,
      content: `<p>Hello there!<br>My name is ${fooAccount.name}</p>`,
      createdAt: '2023-05-29T07:59:04.689Z',
      owner: {
        id: fooAccount.id,
        name: fooAccount.name,
        avatar: createAvatarURL(fooAccount.name),
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
  upVotesBy: [fooAccount.id, barAccount.id],
  downVotesBy: [],
  owner: {
    id: barAccount.id,
    name: barAccount.name,
    avatar: createAvatarURL(barAccount.name),
  },
};

threads.set(threadTwo.id, threadTwo);

const users = new Map<string, TUser>();

users.set(fooAccount.id, {
  id: fooAccount.id,
  name: fooAccount.name,
  email: fooAccount.email,
  avatar: createAvatarURL(fooAccount.name),
});

users.set(barAccount.id, {
  id: barAccount.id,
  name: barAccount.name,
  email: barAccount.email,
  avatar: createAvatarURL(barAccount.name),
});

const mswHandlers: HttpHandler[] = [
  http.get(`${BASE_URL}/users/me`, ({ request }) => {
    const userIdToken = getAuth(request);

    if (userIdToken === 'null') {
      return HttpResponse.json(
        {
          status: 'fail',
          message: 'Invalid token structure',
          data: {},
        },
        {
          status: 401,
        },
      );
    }

    const user = users.get(userIdToken) as TUser;

    if (!user) {
      return HttpResponse.json(
        {
          status: 'fail',
          message: 'User not found',
          data: {},
        },
        {
          status: 401,
        },
      );
    }

    return HttpResponse.json(
      {
        status: 'success',
        message: 'user retrieved',
        data: {
          user,
        },
      },
      {
        status: 200,
      },
    );
  }),
  http.get(`${BASE_URL}/threads`, () => {
    const responseData: TThreadsSingleData[] = [...threads.values()]
      .map((thread) => {
        const { comments, owner, ...rest } = thread;

        return {
          ...rest,
          ownerId: owner.id,
          totalComments: comments.length,
        };
      })
      .reverse();

    return HttpResponse.json({
      status: 'success',
      message: 'threads retrieved',
      data: {
        threads: responseData,
      },
    });
  }),
  http.get(`${BASE_URL}/threads/:threadId`, ({ params }) => {
    const { threadId } = params;

    const thread = threads.get(threadId as string);

    if (!thread) {
      return HttpResponse.json(
        {
          status: 'fail',
          message: 'thread tidak ditemukan',
          data: {},
        },
        {
          status: 404,
        },
      );
    }

    return HttpResponse.json({
      status: 'success',
      message: 'thread retrieved',
      data: {
        detailThread: thread,
      },
    });
  }),
  http.get(`${BASE_URL}/users`, () =>
    HttpResponse.json({
      status: 'success',
      message: 'users retrieved',
      data: {
        users: [...users.values()],
      },
    }),
  ),
  http.post(`${BASE_URL}/login`, async ({ request }) => {
    const { email, password } = (await request.json()) as TLoginReqBody;

    if (validator.isEmpty(email)) {
      return HttpResponse.json(
        {
          status: 'fail',
          message: '"email" is not allowed to be empty',
          data: {},
        },
        {
          status: 401,
        },
      );
    }

    if (!validator.isEmail(email)) {
      return HttpResponse.json(
        {
          status: 'fail',
          message: '"email" must be a valid email',
          data: {},
        },
        {
          status: 401,
        },
      );
    }

    if (validator.isEmpty(password)) {
      return HttpResponse.json(
        {
          status: 'fail',
          message: '"password" is not allowed to be empty',
          data: {},
        },
        {
          status: 401,
        },
      );
    }

    const userAccount = [...accounts.values()].find(
      (account) => account.email === email,
    );

    if (!userAccount || userAccount.password !== password) {
      return HttpResponse.json(
        {
          status: 'fail',
          message: 'email or password is wrong',
          data: {},
        },
        {
          status: 401,
        },
      );
    }

    return HttpResponse.json(
      {
        status: 'success',
        message: 'user logged in',
        data: {
          token: userAccount.id,
        },
      },
      {
        status: 200,
      },
    );
  }),
  http.post(`${BASE_URL}/register`, async ({ request }) => {
    const { name, email, password } =
      (await request.json()) as TRegisterReqBody;

    if (validator.isEmpty(name)) {
      return HttpResponse.json(
        {
          status: 'fail',
          message: '"name" is not allowed to be empty',
          data: {},
        },
        {
          status: 400,
        },
      );
    }

    if (validator.isEmpty(email)) {
      return HttpResponse.json(
        {
          status: 'fail',
          message: '"email" is not allowed to be empty',
          data: {},
        },
        {
          status: 400,
        },
      );
    }

    if (!validator.isEmail(email)) {
      return HttpResponse.json(
        {
          status: 'fail',
          message: '"email" must be a valid email',
          data: {},
        },
        {
          status: 400,
        },
      );
    }

    const accountIsExist = [...accounts.values()].find(
      (account) => account.email === email,
    );

    if (accountIsExist) {
      return HttpResponse.json(
        {
          status: 'fail',
          message: 'email is already taken',
          data: {},
        },
        {
          status: 400,
        },
      );
    }

    if (validator.isEmpty(password)) {
      return HttpResponse.json(
        {
          status: 'fail',
          message: '"password" is not allowed to be empty',
          data: {},
        },
        {
          status: 400,
        },
      );
    }

    if (
      !validator.isLength(password, {
        min: 6,
      })
    ) {
      return HttpResponse.json(
        {
          status: 'fail',
          message: 'password must be at least 6 characters long',
          data: {},
        },
        {
          status: 400,
        },
      );
    }

    const userId = `user-${nanoid()}`;

    accounts.set(userId, {
      id: userId,
      name,
      email,
      password,
    });

    users.set(userId, {
      id: userId,
      name,
      email,
      avatar: createAvatarURL(name),
    });

    return HttpResponse.json({
      status: 'success',
      message: 'user created',
      data: {
        user: {
          id: userId,
          name,
          email,
          avatar: createAvatarURL(name),
        },
      },
    });
  }),
  http.post(`${BASE_URL}/threads`, async ({ request }) => {
    const userIdToken = getAuth(request);

    if (userIdToken === 'null') {
      return HttpResponse.json(
        {
          status: 'fail',
          message: 'Invalid token structure',
          data: {},
        },
        {
          status: 401,
        },
      );
    }

    const { title, body, category } =
      (await request.json()) as TCreateThreadReqBody;

    if (validator.isEmpty(title)) {
      return HttpResponse.json(
        {
          status: 'fail',
          message: '"title" is not allowed to be empty',
          data: {},
        },
        {
          status: 400,
        },
      );
    }

    if (validator.isEmpty(body)) {
      return HttpResponse.json(
        {
          status: 'fail',
          message: '"body" is not allowed to be empty',
          data: {},
        },
        {
          status: 400,
        },
      );
    }

    const user = users.get(userIdToken) as TUser;

    const createdThread = {
      id: `thread-${nanoid()}`,
      title,
      body,
      category,
      createdAt: new Date().toISOString(),
      ownerId: user.id,
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };

    threads.set(createdThread.id, {
      id: createdThread.id,
      title,
      body,
      category,
      createdAt: createdThread.createdAt,
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
      owner: {
        id: user.id,
        name: user.name,
        avatar: createAvatarURL(user.name),
      },
    });

    return HttpResponse.json(
      {
        status: 'success',
        message: 'Thread created',
        data: {
          thread: createdThread,
        },
      },
      {
        status: 201,
      },
    );
  }),
  http.post(
    `${BASE_URL}/threads/:threadId/comments`,
    async ({ request, params }) => {
      const userIdToken = getAuth(request);

      if (userIdToken === 'null') {
        return HttpResponse.json(
          {
            status: 'fail',
            message: 'Invalid token structure',
            data: {},
          },
          {
            status: 401,
          },
        );
      }

      const { content } = (await request.json()) as TCreateCommentReqBody;

      if (validator.isEmpty(content)) {
        return HttpResponse.json(
          {
            status: 'fail',
            message: '"content" is not allowed to be empty',
            data: {},
          },
          {
            status: 400,
          },
        );
      }

      const { threadId } = params;

      const thread = threads.get(threadId as string);

      if (!thread) {
        return HttpResponse.json(
          {
            status: 'fail',
            message: 'thread is not found',
            data: {},
          },
          {
            status: 400,
          },
        );
      }

      const user = users.get(userIdToken) as TUser;

      const createdComment = {
        id: `comment-${nanoid()}`,
        content,
        createdAt: new Date().toISOString(),
        upVotesBy: [],
        downVotesBy: [],
        owner: {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        },
      };

      thread.comments = [createdComment, ...thread.comments];

      return HttpResponse.json(
        {
          status: 'success',
          message: 'thread comment created',
          data: {
            comment: createdComment,
          },
        },
        {
          status: 201,
        },
      );
    },
  ),
  http.post(
    `${BASE_URL}/threads/:threadId/up-vote`,
    async ({ request, params }) => {
      const userIdToken = getAuth(request);

      if (userIdToken === 'null') {
        return HttpResponse.json(
          {
            status: 'fail',
            message: 'Invalid token structure',
            data: {},
          },
          {
            status: 401,
          },
        );
      }

      const { threadId } = params;

      const thread = threads.get(threadId as string);

      if (!thread) {
        return HttpResponse.json(
          {
            status: 'fail',
            message: 'thread is not exist',
            data: {},
          },
          {
            status: 404,
          },
        );
      }

      const user = users.get(userIdToken) as TUser;

      const alreadyVoted = thread.upVotesBy.includes(user.id);

      if (alreadyVoted) {
        thread.upVotesBy = thread.upVotesBy.filter(
          (upVoteBy) => upVoteBy !== user.id,
        );
      } else {
        thread.downVotesBy = thread.downVotesBy.filter(
          (downVoteBy) => downVoteBy !== user.id,
        );
        thread.upVotesBy.push(user.id);
      }

      return HttpResponse.json(
        {
          status: 'success',
          message: 'thread up voted',
          data: {
            vote: {
              id: `thread_vote-${nanoid()}`,
              threadId: threadId as string,
              userId: user.id,
              voteType: 1,
            },
          },
        },
        {
          status: 201,
        },
      );
    },
  ),
  http.post(
    `${BASE_URL}/threads/:threadId/down-vote`,
    async ({ request, params }) => {
      const userIdToken = getAuth(request);

      if (userIdToken === 'null') {
        return HttpResponse.json(
          {
            status: 'fail',
            message: 'Invalid token structure',
            data: {},
          },
          {
            status: 401,
          },
        );
      }

      const { threadId } = params;

      const thread = threads.get(threadId as string);

      if (!thread) {
        return HttpResponse.json(
          {
            status: 'fail',
            message: 'thread is not exist',
            data: {},
          },
          {
            status: 404,
          },
        );
      }

      const user = users.get(userIdToken) as TUser;

      const alreadyVoted = thread.downVotesBy.includes(user.id);

      if (alreadyVoted) {
        thread.downVotesBy = thread.downVotesBy.filter(
          (downVoteBy) => downVoteBy !== user.id,
        );
      } else {
        thread.upVotesBy = thread.upVotesBy.filter(
          (upVoteBy) => upVoteBy !== user.id,
        );
        thread.downVotesBy.push(user.id);
      }

      return HttpResponse.json(
        {
          status: 'success',
          message: 'thread down voted',
          data: {
            vote: {
              id: `thread_vote-${nanoid()}`,
              threadId: threadId as string,
              userId: user.id,
              voteType: -1,
            },
          },
        },
        {
          status: 201,
        },
      );
    },
  ),
  http.post(
    `${BASE_URL}/threads/:threadId/neutral-vote`,
    async ({ request, params }) => {
      const userIdToken = getAuth(request);

      if (userIdToken === 'null') {
        return HttpResponse.json(
          {
            status: 'fail',
            message: 'Invalid token structure',
            data: {},
          },
          {
            status: 401,
          },
        );
      }

      const { threadId } = params;

      const thread = threads.get(threadId as string);

      if (!thread) {
        return HttpResponse.json(
          {
            status: 'fail',
            message: 'thread is not exist',
            data: {},
          },
          {
            status: 404,
          },
        );
      }

      const user = users.get(userIdToken) as TUser;

      thread.upVotesBy = thread.upVotesBy.filter(
        (upVoteBy) => upVoteBy !== user.id,
      );
      thread.downVotesBy = thread.downVotesBy.filter(
        (downVoteBy) => downVoteBy !== user.id,
      );

      return HttpResponse.json(
        {
          status: 'success',
          message: 'thread neutral voted',
          data: {
            vote: {
              id: `thread_vote-${nanoid()}`,
              threadId: threadId as string,
              userId: user.id,
              voteType: 0,
            },
          },
        },
        {
          status: 201,
        },
      );
    },
  ),
  http.post(
    `${BASE_URL}/threads/:threadId/comments/:commentId/up-vote`,
    async ({ request, params }) => {
      const userIdToken = getAuth(request);

      if (userIdToken === 'null') {
        return HttpResponse.json(
          {
            status: 'fail',
            message: 'Invalid token structure',
            data: {},
          },
          {
            status: 401,
          },
        );
      }

      const { threadId, commentId } = params;

      const thread = threads.get(threadId as string);

      if (!thread) {
        return HttpResponse.json(
          {
            status: 'fail',
            message: 'thread is not exist',
            data: {},
          },
          {
            status: 404,
          },
        );
      }

      const foundedComment = thread.comments.find(
        (comment) => comment.id === commentId,
      );

      if (!foundedComment) {
        return HttpResponse.json(
          {
            status: 'fail',
            message: 'comment is not found',
            data: {},
          },
          {
            status: 404,
          },
        );
      }

      const user = users.get(userIdToken) as TUser;

      const alreadyVoted = foundedComment.upVotesBy.includes(user.id);

      if (alreadyVoted) {
        foundedComment.upVotesBy = foundedComment.upVotesBy.filter(
          (upVoteBy) => upVoteBy !== user.id,
        );
      } else {
        foundedComment.downVotesBy = foundedComment.downVotesBy.filter(
          (downVoteBy) => downVoteBy !== user.id,
        );
        foundedComment.upVotesBy.push(user.id);
      }

      return HttpResponse.json(
        {
          status: 'success',
          message: 'thread comment up voted',
          data: {
            vote: {
              id: `comment_vote-${nanoid()}`,
              threadId,
              commentId,
              userId: user.id,
              voteType: 1,
            },
          },
        },
        {
          status: 201,
        },
      );
    },
  ),
  http.post(
    `${BASE_URL}/threads/:threadId/comments/:commentId/down-vote`,
    async ({ request, params }) => {
      const userIdToken = getAuth(request);

      if (userIdToken === 'null') {
        return HttpResponse.json(
          {
            status: 'fail',
            message: 'Invalid token structure',
            data: {},
          },
          {
            status: 401,
          },
        );
      }

      const { threadId, commentId } = params;

      const thread = threads.get(threadId as string);

      if (!thread) {
        return HttpResponse.json(
          {
            status: 'fail',
            message: 'thread is not exist',
            data: {},
          },
          {
            status: 404,
          },
        );
      }

      const foundedComment = thread.comments.find(
        (comment) => comment.id === commentId,
      );

      if (!foundedComment) {
        return HttpResponse.json(
          {
            status: 'fail',
            message: 'comment is not found',
            data: {},
          },
          {
            status: 404,
          },
        );
      }

      const user = users.get(userIdToken) as TUser;

      const alreadyVoted = foundedComment.downVotesBy.includes(user.id);

      if (alreadyVoted) {
        foundedComment.downVotesBy = foundedComment.downVotesBy.filter(
          (downVoteBy) => downVoteBy !== user.id,
        );
      } else {
        foundedComment.upVotesBy = foundedComment.upVotesBy.filter(
          (upVoteBy) => upVoteBy !== user.id,
        );
        foundedComment.downVotesBy.push(user.id);
      }

      return HttpResponse.json(
        {
          status: 'success',
          message: 'thread comment down voted',
          data: {
            vote: {
              id: `comment_vote-${nanoid()}`,
              threadId,
              commentId,
              userId: user.id,
              voteType: -1,
            },
          },
        },
        {
          status: 201,
        },
      );
    },
  ),
  http.post(
    `${BASE_URL}/threads/:threadId/comments/:commentId/neutral-vote`,
    async ({ request, params }) => {
      const userIdToken = getAuth(request);

      if (userIdToken === 'null') {
        return HttpResponse.json(
          {
            status: 'fail',
            message: 'Invalid token structure',
            data: {},
          },
          {
            status: 401,
          },
        );
      }

      const { threadId, commentId } = params;

      const thread = threads.get(threadId as string);

      if (!thread) {
        return HttpResponse.json(
          {
            status: 'fail',
            message: 'thread is not exist',
            data: {},
          },
          {
            status: 404,
          },
        );
      }

      const foundedComment = thread.comments.find(
        (comment) => comment.id === commentId,
      );

      if (!foundedComment) {
        return HttpResponse.json(
          {
            status: 'fail',
            message: 'comment is not found',
            data: {},
          },
          {
            status: 404,
          },
        );
      }

      const user = users.get(userIdToken) as TUser;

      foundedComment.upVotesBy = foundedComment.upVotesBy.filter(
        (upVoteBy) => upVoteBy !== user.id,
      );
      foundedComment.downVotesBy = foundedComment.downVotesBy.filter(
        (downVoteBy) => downVoteBy !== user.id,
      );

      threads.set(threadId as string, thread);

      return HttpResponse.json(
        {
          status: 'success',
          message: 'thread comment neutral voted',
          data: {
            vote: {
              id: `comment_vote-${nanoid()}`,
              threadId,
              commentId,
              userId: user.id,
              voteType: 0,
            },
          },
        },
        {
          status: 201,
        },
      );
    },
  ),
];

export default mswHandlers;
