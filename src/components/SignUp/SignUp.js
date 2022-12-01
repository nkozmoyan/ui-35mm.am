import { useState } from 'react';
import styled from 'styled-components';
import { Form } from '../../Styled';
import { inputState } from '../../forms/Input';

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

  return (
    <div>
      <Container>
        <h1>Sign Up</h1>
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
            value={userName.value}
            type="text"
            id="userName"
          ></Form.Input>
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

        <Form.Button>Create an Account</Form.Button>
      </Container>
    </div>
  );
};
