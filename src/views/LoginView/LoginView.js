import React from 'react';
import { SignupForm } from '../../forms';
import { LoginForm } from '../../forms';
import { useSelector } from 'react-redux';
import { AlertBox } from '../../components';

const LoginView = () => {
  const error = useSelector((state) => state.error.data);
  const google = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/google`, '_self');
  };
  return (
    <div>
      <h1 className='fs-1 home-heading-primary'>Happening Now</h1>
      <h4>Join Tuiter Today</h4>
      <div className='col-md-7'>
        <div className='mt-5'>
          <LoginForm />
        </div>
        <div className='d-flex justify-content-between'>
          <div className='btn btn-primary rounded-pill' onClick={google}>
            <i className='fa-brands fa-google'></i> Login with Google
          </div>
        </div>
        <div className='mt-5'>
          <SignupForm />
        </div>
        {error && <AlertBox message={error} />}
      </div>
    </div>
  );
};

export default LoginView;
