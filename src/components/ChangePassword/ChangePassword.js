import { useState } from 'react';
import styled from 'styled-components';
import { Form } from '../../Styled';
import { inputState } from '../../forms/Input';
import { useSearchParams } from 'react-router-dom';
import api, { getErrorMessage } from '../../api/client';

const Container = styled.div`
  margin: 5em auto;
  width: 50%;
`;

export const ChangePassword = () => {
  const [password1, setPassword1] = useState(new inputState());
  const [password2, setPassword2] = useState(new inputState());
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password1.value !== password2.value) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      await api.post('/password/reset', { token, password: password1.value });
      setMessage('Password updated');
    } catch (err) {
      setMessage(getErrorMessage(err));
    }
  };

  return (
    <Container>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="password1">New Password:</Form.Label>
          <Form.Input
            id="password1"
            type="password"
            onChange={setPassword1}
            value={password1.value}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password2">Confirm Password:</Form.Label>
          <Form.Input
            id="password2"
            type="password"
            onChange={setPassword2}
            value={password2.value}
            required
          />
          {password1.value &&
            password2.value &&
            password1.value !== password2.value && (
              <Form.FeedBack>Passwords do not match.</Form.FeedBack>
            )}
        </Form.Group>
        {message && <div>{message}</div>}
        <Form.Button type="submit">Change Password</Form.Button>
      </form>
    </Container>
  );
};
