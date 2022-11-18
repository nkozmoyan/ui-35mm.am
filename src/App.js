import {useState, useCallback, useEffect, useRef} from "react"
import './App.css';
import './components/Photo/Photo'
import Photo from "./components/Photo/Photo";
import useFetch from "./hooks/useFetch";
import Header from "./layout/Header/Header";

function App() {

  const [page, setPage] = useState(1);

  const { loading, error, list } = useFetch(page);
  const loader = useRef(null);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {

    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    
    const observer = new IntersectionObserver(handleObserver, option);

    let t = loader.current
    
    if (loader.current) { 
      observer.observe(loader.current);
    }

    return () => {
      observer.unobserve(t);
      setPage((prev) => prev - 1);
    }

  }, [handleObserver]);

  return (
    <div className="App">
      <Header></Header>
      <div className="body-container">
        <div className="photos">
          {list.map((photo, i) => <Photo key={photo.photoId} photo={photo}></Photo>)}
          <div ref={loader} />
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error!</p>}
      </div>
    </div>
  );
}

export default App;
