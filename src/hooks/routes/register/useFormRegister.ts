import { useState } from 'react';

const useFormRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeName = (inputName: string) => setName(() => inputName);
  const changeEmail = (inputEmail: string) => setEmail(() => inputEmail);
  const changePassword = (inputPassword: string) =>
    setPassword(() => inputPassword);

  return {
    name,
    email,
    password,
    changeName,
    changeEmail,
    changePassword,
  };
};

export default useFormRegister;
