import type {
  TCreateCommentResponse,
  TCreateThreadErrorResponse,
  TCreateThreadResponse,
  TDownVoteThreadResponse,
  TLeaderBoardsResponse,
  TLoginErrorResponse,
  TLoginResponse,
  TNeutralizeVoteCommentResponse,
  TProfileResponse,
  TRegisterErrorResponse,
  TRegisterResponse,
  TThreadResponse,
  TThreadsResponse,
  TUpVoteCommentResponse,
  TUpVoteThreadResponse,
  TUsersResponse,
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

const register = (name: string, email: string, password: string) => {
  return axiosInstance.post<TRegisterResponse | TRegisterErrorResponse>(
    '/register',
    {
      name,
      email,
      password,
    },
  );
};

const login = (email: string, password: string) => {
  return axiosInstance.post<TLoginResponse | TLoginErrorResponse>('/login', {
    email,
    password,
  });
};

const getProfile = () => {
  return axiosInstance.get<TProfileResponse>('/users/me', {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

const getUsers = () => {
  return axiosInstance.get<TUsersResponse>('/users');
};

const createThread = (title: string, body: string, category: string) => {
  return axiosInstance.post<TCreateThreadResponse | TCreateThreadErrorResponse>(
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
};

const getThreads = () => axiosInstance.get<TThreadsResponse>('/threads');

const getThread = (threadId: string) =>
  axiosInstance.get<TThreadResponse>(`/threads/${threadId}`);

const createComment = (threadId: string, content: string) => {
  return axiosInstance.post<TCreateCommentResponse>(
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
};

const upVoteThread = (threadId: string) => {
  return axiosInstance.post<TUpVoteThreadResponse>(
    `/threads/${threadId}/up-vote`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    },
  );
};

const downVoteThread = (threadId: string) => {
  return axiosInstance.post<TDownVoteThreadResponse>(
    `/threads/${threadId}/down-vote`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    },
  );
};

const neutralVoteThread = (threadId: string) => {
  return axiosInstance.post<TNeutralizeVoteCommentResponse>(
    `/threads/${threadId}/neutral-vote`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    },
  );
};

const upVoteComment = (threadId: string, commentId: string) => {
  return axiosInstance.post<TUpVoteCommentResponse>(
    `/threads/${threadId}/comments/${commentId}/up-vote`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    },
  );
};

const downVoteComment = (threadId: string, commentId: string) => {
  return axiosInstance.post(
    `/threads/${threadId}/comments/${commentId}/down-vote`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    },
  );
};

const neutralVoteComment = (threadId: string, commentId: string) => {
  return axiosInstance.post(
    `/threads/${threadId}/comments/${commentId}/neutral-vote`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    },
  );
};

const getLeaderboards = () => {
  return axiosInstance.get<TLeaderBoardsResponse>('/leaderboards');
};

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
  upVoteComment,
  upVoteThread,
};
