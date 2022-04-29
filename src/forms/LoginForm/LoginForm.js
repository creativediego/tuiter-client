import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../redux/userSlice';

import { Loader } from '../../components';
import FormInput from '../FormInput/FormInput';

/**
 * User login form that uses a redux async loginThunk to log user in. Displays loading button when login in being processed.
 */
const LoginForm = () => {
  const loading = useSelector((state) => state.user.loading);
  const [loginUser, setLoginUser] = useState({
    username: 'batman',
    password: 'Hello123!',
  });
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    if (!loginUser || !loginUser.password || !loginUser.username) {
      return;
    }
    dispatch(loginThunk(loginUser));
  };
  return (
    <form data-testid='login-form'>
      <h5>Login</h5>
      <FormInput
        dataTestId='login-user'
        placeholder='email or username'
        value={loginUser.username}
        onChange={(e) =>
          setLoginUser({ ...loginUser, username: e.target.value })
        }
      />
      <FormInput
        type='password'
        dataTestId='login-password'
        placeholder='password'
        value={loginUser.password}
        onChange={(e) =>
          setLoginUser({ ...loginUser, password: e.target.value })
        }
      />

      <button
        type='submit'
        onClick={(e) => submit(e)}
        className='btn btn-primary mb-5 mt-3'
      >
        <Loader loading={loading} content='Log in' />
      </button>
    </form>
  );
};

export default LoginForm;
