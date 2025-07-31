import { useContext, useState } from 'react';
import styled from 'styled-components';
import { Form } from '../../Styled';
import { inputState } from '../../forms/Input';
import { AuthContext } from '../../AuthContext';
import api, { getErrorMessage } from '../../api/client';

const Container = styled.div`
  margin: 5em auto;
  width: 50%;
`;

export const SignIn = () => {
  const [email, setEmail] = useState(new inputState());
  const [password, setPassword] = useState(new inputState());
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', {
        email: email.value,
        password: password.value,
      });
      login({ user: res.data.user, token: res.data.token });
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <Container>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="email">Email:</Form.Label>
          <Form.Input
            id="email"
            type="email"
            onChange={setEmail}
            value={email.value}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password:</Form.Label>
          <Form.Input
            id="password"
            type="password"
            onChange={setPassword}
            value={password.value}
            required
          />
        </Form.Group>
        {error && <Form.FeedBack>{error}</Form.FeedBack>}
        <Form.Button type="submit">Login</Form.Button>
      </form>
    </Container>
  );
};
