import { useState } from 'react';
import styled from 'styled-components';
import { Form } from '../../Styled';
import { inputState } from '../../forms/Input';

const Container = styled.div`
  margin: 5em auto;
  width: 50%;
`;

export const ForgotPassword = () => {
  const [email, setEmail] = useState(new inputState());

  return (
    <Container>
      <h1>Forgot Password</h1>
      <Form.Group>
        <Form.Label htmlFor="email">Email:</Form.Label>
        <Form.Input id="email" type="email" onChange={setEmail} value={email.value} required />
      </Form.Group>
      <Form.Group>
        <div className="recaptcha">reCAPTCHA</div>
      </Form.Group>
      <Form.Button>Send Reset Link</Form.Button>
    </Container>
  );
};
