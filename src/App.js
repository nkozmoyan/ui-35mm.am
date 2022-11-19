import './App.css';
import './components/Photo/Photo';

import Photos from './containers/Photos/Photos';
import Header from './layout/Header/Header';

function App() {
    return (
        <div className="App">
            <Header />
            <Photos />
        </div>
    );
}

export default App;
