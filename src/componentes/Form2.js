import React, { useReducer } from 'react';
import classes from './Form.module.css';


const formReducer = (state, action) => {
  switch (action.type) {
    case 'EMAIL_INPUT':
      return {
        ...state,
        enteredEmail: action.value,
        emailIsValid: action.value.includes('@'),
      };
    case 'PASSWORD_INPUT':
      return {
        ...state,
        enteredPassword: action.value,
        passwordIsValid: action.value.trim().length > 7,
      };
    default:
      return state;
  }
};

function Form() {
  
  const [formState, dispatchForm] = useReducer(formReducer, {
    enteredEmail: '',
    emailIsValid: false,
    enteredPassword: '',
    passwordIsValid: false,
  });

  const formIsValid = formState.emailIsValid && formState.passwordIsValid;

  
  const changeEmailHandler = (event) => {
    const value = event.target.value;
    dispatchForm({ type: 'EMAIL_INPUT', value });
  };

  const changePasswordHandler = (event) => {
    const value = event.target.value;
    dispatchForm({ type: 'PASSWORD_INPUT', value });
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      alert('Invalid form inputs!');
      return;
    }
    console.log('Good job!');
    console.log(formState.enteredEmail, formState.enteredPassword);
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" onChange={changeEmailHandler} />
      </div>
      <div className={classes.control}>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" onChange={changePasswordHandler} />
      </div>
      <button>Submit</button>
    </form>
  );
}

export default Form;