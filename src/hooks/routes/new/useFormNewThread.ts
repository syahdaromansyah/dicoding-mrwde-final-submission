import { useState } from 'react';

const useFormThread = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const changeTitle = (inputTitle: string) => setTitle(() => inputTitle);
  const changeCategory = (inputCategory: string) =>
    setCategory(() => inputCategory);
  const changeBody = (inputBody: string) => setBody(() => inputBody);

  return {
    title,
    category,
    body,
    changeTitle,
    changeCategory,
    changeBody,
  };
};

export default useFormThread;
