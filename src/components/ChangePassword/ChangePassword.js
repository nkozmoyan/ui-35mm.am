import { useState } from 'react';
import styled from 'styled-components';
import { Form } from '../../Styled';
import { inputState } from '../../forms/Input';

const Container = styled.div`
  margin: 5em auto;
  width: 50%;
`;

export const ChangePassword = () => {
  const [password1, setPassword1] = useState(new inputState());
  const [password2, setPassword2] = useState(new inputState());

  return (
    <Container>
      <h1>Change Password</h1>
      <Form.Group>
        <Form.Label htmlFor="password1">New Password:</Form.Label>
        <Form.Input id="password1" type="password" onChange={setPassword1} value={password1.value} required />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password2">Confirm Password:</Form.Label>
        <Form.Input id="password2" type="password" onChange={setPassword2} value={password2.value} required />
        {password1.value && password2.value && password1.value !== password2.value && (
          <Form.FeedBack>Passwords do not match.</Form.FeedBack>
        )}
      </Form.Group>
      <Form.Button>Change Password</Form.Button>
    </Container>
  );
};
