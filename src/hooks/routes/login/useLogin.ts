import { useState } from 'react';

const useForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeEmail = (inputEmail: string) => setEmail(() => inputEmail);
  const changePassword = (inputPassword: string) =>
    setPassword(() => inputPassword);

  return {
    email,
    password,
    changeEmail,
    changePassword,
  };
};

export default useForm;
