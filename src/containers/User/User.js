import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Photo from '../../components/Photo/Photo';
import useFetch from '../../hooks/useFetch';
import api from '../../api/client';
import './User.css';

const User = () => {
  const [page, setPage] = useState(1);
  const { userName } = useParams();
  const { loading, error, list } = useFetch(page, {
    userName,
    featured: false,
  });
  const loader = useRef(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE_URL || 'http://post35mm.com/';

  useEffect(() => {
    api
      .get(`/users/${userName}`)
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, [userName]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, option);

    let target = loader.current;

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [handleObserver]);

  const openPhoto = (p) => {
    navigate(`/photos/${p.photoId}?source=profile&user=${userName}`);
  };

  return (
    <div className="photos">
      {user && (
        <div className="user-profile">
          {user.userPicPath && (
            <img src={IMAGE_BASE + user.userPicPath} alt={user.name} />
          )}
          <h2>{user.name}</h2>
        </div>
      )}
      {list.map((p) => (
        <Photo
          onClick={(photo) => openPhoto(photo)}
          key={p.photoId}
          photo={p}
          showAuthor={false}
        />
      ))}
      <div ref={loader} />
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
    </div>
  );
};

export default User;

