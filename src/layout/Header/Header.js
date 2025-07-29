import './Header.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';

const StyledHeader = styled.header`
  background-color: black;
  color: white;
  margin: 0px;
  height: 3rem;
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  border: 1px;
  padding: 0.5rem;
  background-color: white;
  margin-right: 0.5rem;
`;

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <StyledHeader className="header">
      <h1>35mm.am</h1>
      <div>
        {user ? (
          <>
            <Link to="/profile">
              <Button>Profile</Button>
            </Link>
            <Link to="/settings">
              <Button>Settings</Button>
            </Link>
            <Button onClick={logout}>Logout</Button>
          </>
        ) : (
          <>
            <Link to="/signin">
              <Button>Log In</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </StyledHeader>
  );
}
