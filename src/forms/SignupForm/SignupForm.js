import { React, useEffect, useState } from 'react';
import { FormInput } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { registerThunk, updateUserThunk } from '../../redux/userSlice';
import { PopupModal } from '../../components';

/**
 * Signup form displayed in a pop modal when the user clicks to register.
 * Validates user input. Checks redux state to see if user has completed profile, and if not, prompts the user to complete it. This applies for users who sign up with google, which after registered on the backend, need to fill out their username and date of birth.
 */
const SignupForm = () => {
  const user = useSelector((state) => state.user.data);
  const profileComplete = useSelector((state) => state.user.profileComplete);
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  useEffect(() => {
    const defaultVales = {
      name: '',
      username: '',
      email: '',
      birthday: '',
      password: '',
      confirmPassword: '',
      headerImage: '',
      bio: '',
      accountType: 'Personal',
      profilePhoto:
        'https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg',
    };
    if (user) {
      setValues({
        ...defaultVales,
        ...user,
        // birthday: user.birthday.toISOString().split('T')[0],
      });
    } else {
      setValues({ ...defaultVales });
    }
  }, [user, profileComplete]);
  const isFormValid = () => {
    for (const input in inputs) {
      const pattern = inputs[input].pattern;
      if (pattern) {
        const regex = new RegExp(pattern);
        const inputValue = values[inputs[input].name];
        //
        if (!regex.test(inputValue)) return false;
      }
    }
    return true;
  };
  const handleRegister = () => {
    if (isFormValid()) {
      dispatch(registerThunk(values));
    }
  };

  const handleCompleteSignup = () => {
    dispatch(updateUserThunk({ id: user.id, ...values }));
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const inputs = [
    {
      id: 0,
      name: 'name',
      type: 'text',
      placeholder: 'name',
      errorMessage:
        "name should be 3-15 characters and shouldn't include any special character!",
      label: 'name',
      pattern: "^[A-Za-z0-9 ,.'-]{3,15}$",
      required: true,
    },
    {
      id: 1,
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: 'Username',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true,
    },
    {
      id: 2,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'It should be a valid email address!',
      label: 'Email',
      required: true,
    },
    {
      id: 3,
      name: 'birthday',
      type: 'date',
      placeholder: 'birthday',
      label: 'birthday',
    },
    {
      id: 4,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage:
        'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
      label: 'Password',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      errorMessage: "Passwords don't match!",
      label: 'Confirm Password',
      pattern: values.password,
      required: true,
    },
  ];

  const mapInputs = () => {
    return inputs.map((input) => {
      if (!user) {
        // user has not registered yet
        return (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        );
      } else if (
        user &&
        !profileComplete &&
        input.name.match(/username|birthday/) // user has registered with OAuth but profile is not complete
      ) {
        return (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        );
      } else return null;
    });
  };
  const registerModalProps = {
    size: 'md',
    title: 'Create your account',
    handleSubmit: handleRegister,
    content: mapInputs(),
    show: false,
    withExternalButton: true,
    externalButtonTitle: 'Signup with email',
    submitTitle: 'Submit',
  };

  const completeSignupProps = {
    size: 'md',
    title: 'Complete signup',
    handleSubmit: handleCompleteSignup,
    content: mapInputs(),
    show: true,
    withExternalButton: false,
    submitTitle: 'Complete',
  };

  return (
    <PopupModal
      props={
        user && !profileComplete ? completeSignupProps : registerModalProps
      }
    />
  );
};

export default SignupForm;
