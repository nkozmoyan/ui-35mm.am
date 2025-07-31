import { useState } from 'react';
import styled from 'styled-components';
import { Form } from '../../Styled';
import { inputState } from '../../forms/Input';
import api, { getErrorMessage } from '../../api/client';

const Container = styled.div`
  margin: 5em auto;
  width: 50%;
`;

const validators = {
  name: (value) => {
    const regex = /^[a-z ,.'-]+$/i;
    return regex.test(value);
  },
};

export const SignUp = () => {
  const [name, setName] = useState(new inputState('Your Name'));
  const [userName, setUserName] = useState(new inputState());
  const [email, setEmail] = useState(new inputState());
  const [password1, setPassword1] = useState(new inputState());
  const [password2, setPassword2] = useState(new inputState());
  const [userNameAvailable, setUserNameAvailable] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const checkUserName = async () => {
    if (!userName.value) return;
    try {
      await api.head(`/users/${userName.value}`);
      setUserNameAvailable(false);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setUserNameAvailable(true);
      } else {
        setUserNameAvailable(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password1.value !== password2.value) {
      setError('Passwords do not match');
      return;
    }
    try {
      await api.post('/users', {
        name: name.value,
        username: userName.value,
        email: email.value,
        password: password1.value,
      });
      setSuccess(true);
      setError('');
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div>
      <Container>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="name">Name:</Form.Label>
            <Form.Input
              id="name"
              value={name.value}
              onChange={setName}
              validatorFn={validators.name}
              type="text"
              required
            ></Form.Input>
            {name.invalid && (name.dirty || name.touched) && (
              <Form.FeedBack>{name.error}</Form.FeedBack>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="userName">Username:</Form.Label>
            <Form.Input
              onChange={setUserName}
              onBlur={checkUserName}
              value={userName.value}
              type="text"
              id="userName"
              required
            ></Form.Input>
            {userNameAvailable === false && (
              <Form.FeedBack>Username is taken.</Form.FeedBack>
            )}
            {userName.invalid && (userName.dirty || userName.touched) && (
              <Form.FeedBack>Username is required.</Form.FeedBack>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="email">E-mail:</Form.Label>
            <Form.Input
              onChange={setEmail}
              value={email.value}
              type="text"
              id="email"
              required
            ></Form.Input>
            {email.invalid && (email.dirty || email.touched) && (
              <Form.FeedBack>Email is required.</Form.FeedBack>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password1">Password:</Form.Label>
            <Form.Input
              onChange={setPassword1}
              value={password1.value}
              validatorFn={(value) => {
                return value.length > 6;
              }}
              type="password"
              id="password1"
            ></Form.Input>
            {password1.invalid && (password1.dirty || password1.touched) && (
              <Form.FeedBack>Password is too short.</Form.FeedBack>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password2">Confirm password:</Form.Label>
            <Form.Input
              onChange={setPassword2}
              value={password2.value}
              type="password"
              id="password2"
            ></Form.Input>
            {password2.invalid && (password2.dirty || password2.touched) && (
              <Form.FeedBack>Password is too short.</Form.FeedBack>
            )}

            {password1.valid &&
              password2.valid &&
              password1.value !== password2.value && (
                <Form.FeedBack>Passwords do NOT match.</Form.FeedBack>
              )}
          </Form.Group>

          {error && <Form.FeedBack>{error}</Form.FeedBack>}
          {success && <div>Account created successfully.</div>}
          <Form.Button type="submit">Create an Account</Form.Button>
        </form>
      </Container>
    </div>
  );
};
