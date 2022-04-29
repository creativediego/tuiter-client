import { React, useEffect } from 'react';
import { FormInput } from '..';
import { useSelector } from 'react-redux';

const SignupInputs = ({ inputValues, setInputValues, setInputFields }) => {
  const user = useSelector((state) => state.user.data);
  const profileComplete = useSelector((state) => state.user.profileComplete);
  const giveParentFormAccessToInputFields = setInputFields;
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
      pattern: inputValues.password,
      required: true,
    },
  ];

  const updateInputValue = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    giveParentFormAccessToInputFields(inputs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return inputs.map((input) => {
    if (!user) {
      // user has not registered yet
      return (
        <FormInput
          key={input.id}
          {...input}
          value={inputValues[input.name]}
          onChange={updateInputValue}
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
          value={inputValues[input.name]}
          onChange={updateInputValue}
        />
      );
    } else return null;
  });
};

export default SignupInputs;
