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
  users: {
    id: string;
    name: string;
    email: string;
    avatar: string;
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

export type TLoginResponse = {
  status: string;
  message: string;
  data: {
    token: string;
  };
};

export type TLoginErrorResponse = {
  status: string;
  message: string;
  data: object;
};

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

export type TUpVoteThreadResponse = {
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

export type TDownVoteThreadResponse = {
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

export type TCreateThreadErrorResponse = {
  status: string;
  message: string;
  data: object;
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

export type TRegisterErrorResponse = {
  status: string;
  message: string;
  data: object;
};

export type TUpVoteCommentResponse = {
  status: string;
  message: string;
  data: {
    vote: {
      id: string;
      userId: string;
      commentId: string;
      voteType: number;
    };
  };
};

export type TNeutralizeVoteCommentResponse = {
  status: string;
  message: string;
  data: {
    vote: {
      id: string;
      userId: string;
      commentId: string;
      voteType: number;
    };
  };
};

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
