import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';

export const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Please log in.</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};
