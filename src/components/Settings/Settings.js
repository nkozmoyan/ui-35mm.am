import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';

export const Settings = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Please log in.</div>;
  }

  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
};
