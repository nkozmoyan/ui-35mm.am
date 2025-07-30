import { useState } from 'react';
import styled from 'styled-components';
import { Form } from '../../Styled';
import { inputState } from '../../forms/Input';
import api from '../../api/client';

const Container = styled.div`
  margin: 5em auto;
  width: 50%;
`;

export const ForgotPassword = () => {
  const [email, setEmail] = useState(new inputState());
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/password/forgot', { emailOrUsername: email.value });
      setMessage('Reset link sent to your email.');
    } catch (err) {
      setMessage('Could not send reset link.');
    }
  };

  return (
    <Container>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="email">Email:</Form.Label>
          <Form.Input id="email" type="email" onChange={setEmail} value={email.value} required />
        </Form.Group>
        <Form.Group>
          <div className="recaptcha">reCAPTCHA</div>
        </Form.Group>
        {message && <div>{message}</div>}
        <Form.Button type="submit">Send Reset Link</Form.Button>
      </form>
    </Container>
  );
};
