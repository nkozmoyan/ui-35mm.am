import { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/client';
import { Form } from '../../Styled';

const Container = styled.div`
  margin: 5em auto;
  width: 50%;
  text-align: center;
`;

const Buttons = styled.div`
  margin-top: 2em;
  display: flex;
  gap: 1em;
  justify-content: center;
`;

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;
  const [disabled, setDisabled] = useState(false);

  const handleResend = async () => {
    if (!email) return;
    setDisabled(true);
    try {
      await api.post('/users/resend-verification', { email });
    } catch (err) {
      // ignore error feedback for now
    }
    setTimeout(() => setDisabled(false), 30000);
  };

  return (
    <Container>
      <h1>Account created successfully.</h1>
      <p>Please verify your email. A verification link has been sent to your inbox.</p>
      <Buttons>
        <Form.Button type="button" onClick={() => navigate('/signin')}>
          Login
        </Form.Button>
        <Form.Button
          type="button"
          onClick={handleResend}
          disabled={disabled || !email}
        >
          Resend Verification
        </Form.Button>
      </Buttons>
    </Container>
  );
};

export default VerifyEmail;
