import './App.css';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

import Photos from './containers/Photos/Photos';
import Header from './layout/Header/Header';
import { SignUp } from './components/SignUp/SignUp';
import { SignIn } from './components/SignIn/SignIn';
import { ForgotPassword } from './components/ForgotPassword/ForgotPassword';
import { ChangePassword } from './components/ChangePassword/ChangePassword';
import { Profile } from './components/Profile/Profile';
import { Settings } from './components/Settings/Settings';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Photos />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="profile" element={user ? <Profile /> : <SignIn />} />
          <Route path="settings" element={user ? <Settings /> : <SignIn />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
