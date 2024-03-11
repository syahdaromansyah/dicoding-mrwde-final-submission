import { useState } from 'react';

const useComment = () => {
  const [comment, setComment] = useState('');

  const changeComment = (inputComment: string) =>
    setComment(() => inputComment);

  return {
    comment,
    changeComment,
  };
};

export default useComment;
