import type {
  TCreateCommentResponse,
  TCreateThreadResponse,
  TErrorResponse,
  TLeaderBoardsResponse,
  TLoginResponse,
  TProfileResponse,
  TRegisterResponse,
  TThreadResponse,
  TThreadsResponse,
  TUsersResponse,
  TVoteThreadResponse,
} from '@/types/types';
import axios from 'axios';

const BASE_URL = 'https://forum-api.dicoding.dev/v1';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const putAccessToken = (accessToken: string) => {
  sessionStorage.setItem('accessToken', accessToken);
};

const getAccessToken = () => sessionStorage.getItem('accessToken');

const removeAccessToken = () => sessionStorage.removeItem('accessToken');

const register = (name: string, email: string, password: string) =>
  axiosInstance.post<TRegisterResponse | TErrorResponse>('/register', {
    name,
    email,
    password,
  });

const login = (email: string, password: string) =>
  axiosInstance.post<TLoginResponse | TErrorResponse>('/login', {
    email,
    password,
  });

const getProfile = () =>
  axiosInstance.get<TProfileResponse | TErrorResponse>('/users/me', {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

const getUsers = () =>
  axiosInstance.get<TUsersResponse | TErrorResponse>('/users');

const createThread = (title: string, body: string, category: string) =>
  axiosInstance.post<TCreateThreadResponse | TErrorResponse>(
    '/threads',
    {
      title,
      body,
      category,
    },
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    },
  );

const getThreads = () =>
  axiosInstance.get<TThreadsResponse | TErrorResponse>('/threads');

const getThread = (threadId: string) =>
  axiosInstance.get<TThreadResponse | TErrorResponse>(`/threads/${threadId}`);

const createComment = (threadId: string, content: string) =>
  axiosInstance.post<TCreateCommentResponse | TErrorResponse>(
    `/threads/${threadId}/comments`,
    {
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    },
  );

const upVoteThread = (threadId: string) =>
  axiosInstance.post<TVoteThreadResponse | TErrorResponse>(
    `/threads/${threadId}/up-vote`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    },
  );

const downVoteThread = (threadId: string) =>
  axiosInstance.post<TVoteThreadResponse | TErrorResponse>(
    `/threads/${threadId}/down-vote`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    },
  );

const neutralVoteThread = (threadId: string) =>
  axiosInstance.post<TVoteThreadResponse | TErrorResponse>(
    `/threads/${threadId}/neutral-vote`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    },
  );

const upVoteComment = (threadId: string, commentId: string) =>
  axiosInstance.post<TVoteThreadResponse | TErrorResponse>(
    `/threads/${threadId}/comments/${commentId}/up-vote`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    },
  );

const downVoteComment = (threadId: string, commentId: string) =>
  axiosInstance.post<TVoteThreadResponse | TErrorResponse>(
    `/threads/${threadId}/comments/${commentId}/down-vote`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    },
  );

const neutralVoteComment = (threadId: string, commentId: string) =>
  axiosInstance.post<TVoteThreadResponse | TErrorResponse>(
    `/threads/${threadId}/comments/${commentId}/neutral-vote`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    },
  );

const getLeaderboards = () =>
  axiosInstance.get<TLeaderBoardsResponse | TErrorResponse>('/leaderboards');

export {
  BASE_URL,
  createComment,
  createThread,
  downVoteComment,
  downVoteThread,
  getAccessToken,
  getLeaderboards,
  getProfile,
  getThread,
  getThreads,
  getUsers,
  login,
  neutralVoteComment,
  neutralVoteThread,
  putAccessToken,
  register,
  removeAccessToken,
  upVoteComment,
  upVoteThread,
};
