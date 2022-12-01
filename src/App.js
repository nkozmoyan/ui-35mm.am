import './App.css';
import './components/Photo/Photo';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

import Photos from './containers/Photos/Photos';
import Header from './layout/Header/Header';
import { SignUp } from './components/SignUp/SignUp';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Photos />} />
          <Route path="signup" element={<SignUp />} />
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
