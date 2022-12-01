import './Header.css';
import styled from 'styled-components';

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
  return (
    <StyledHeader className="header">
      <h1>35mm.am</h1>
      <div>
        <Button>Log In</Button>
        <Button>Sign Up</Button>
      </div>
    </StyledHeader>
  );
}
