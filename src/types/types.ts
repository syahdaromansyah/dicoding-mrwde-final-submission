export type TProfileResponse = {
  status: string;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      avatar: string;
    };
  };
};

export type TProfileData = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type TRegisterResponse = {
  status: string;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      avatar: string;
    };
  };
};

export type TLoginResponse = {
  status: string;
  message: string;
  data: {
    token: string;
  };
};

export type TThreadsResponse = {
  data: {
    threads: {
      id: string;
      title: string;
      body: string;
      category: string;
      createdAt: string;
      ownerId: string;
      upVotesBy: string[];
      downVotesBy: string[];
      totalComments: number;
    }[];
  };
  message: string;
  status: string;
};

export type TThreadsDataResponse = {
  threads: {
    id: string;
    title: string;
    body: string;
    category: string;
    createdAt: string;
    ownerId: string;
    upVotesBy: string[];
    downVotesBy: string[];
    totalComments: number;
  }[];
  message: string;
  status: string;
};

export type TThreadsData = {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  ownerId: string;
  upVotesBy: string[];
  downVotesBy: string[];
  totalComments: number;
}[];

export type TThreadsSingleData = {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  ownerId: string;
  upVotesBy: string[];
  downVotesBy: string[];
  totalComments: number;
};

export type TUsersResponse = {
  data: {
    users: {
      id: string;
      name: string;
      email: string;
      avatar: string;
    }[];
  };
  message: string;
  status: string;
};

export type TUsersData = {
  id: string;
  name: string;
  email: string;
  avatar: string;
}[];

export type TThreadResponse = {
  status: string;
  message: string;
  data: {
    detailThread: {
      id: string;
      title: string;
      body: string;
      category: string;
      createdAt: string;
      owner: {
        id: string;
        name: string;
        avatar: string;
      };
      upVotesBy: string[];
      downVotesBy: string[];
      comments: {
        id: string;
        content: string;
        createdAt: string;
        owner: {
          id: string;
          name: string;
          avatar: string;
        };
        upVotesBy: string[];
        downVotesBy: string[];
      }[];
    };
  };
};

export type TThreadData = {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  owner: {
    id: string;
    name: string;
    avatar: string;
  };
  upVotesBy: string[];
  downVotesBy: string[];
  comments: {
    id: string;
    content: string;
    createdAt: string;
    owner: {
      id: string;
      name: string;
      avatar: string;
    };
    upVotesBy: string[];
    downVotesBy: string[];
  }[];
};

export type TLeaderBoardsResponse = {
  status: string;
  message: string;
  data: {
    leaderboards: {
      user: {
        id: string;
        name: string;
        email: string;
        avatar: string;
      };
      score: number;
    }[];
  };
};

export type TLeaderBoardData = {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  score: number;
};

export type TVoteThreadResponse = {
  status: string;
  message: string;
  data: {
    vote: {
      id: string;
      userId: string;
      threadId: string;
      voteType: number;
    };
  };
};

export type TCreateCommentResponse = {
  status: string;
  message: string;
  data: {
    comment: {
      id: string;
      content: string;
      createdAt: string;
      upVotesBy: string[];
      downVotesBy: string[];
      owner: {
        id: string;
        name: string;
        email: string;
      };
    };
  };
};

export type TCreateCommentData = {
  thread: {
    id: string;
    title: string;
    body: string;
    category: string;
    createdAt: string;
    ownerId: string;
    upVotesBy: string[];
    downVotesBy: string[];
    totalComments: number;
  };
};

export type TCreateThreadResponse = {
  status: string;
  message: string;
  data: {
    thread: {
      id: string;
      title: string;
      body: string;
      category: string;
      createdAt: string;
      ownerId: string;
      upVotesBy: string[];
      downVotesBy: string[];
      totalComments: number;
    };
  };
};

export type TCommentData = {
  id: string;
  content: string;
  createdAt: string;
  owner: {
    id: string;
    name: string;
    avatar: string;
  };
  upVotesBy: string[];
  downVotesBy: string[];
};

export type TErrorResponse = {
  status: string;
  message: string;
  data: object;
};

export type TSetStatusFetch = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};
