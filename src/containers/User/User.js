import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Photo from '../../components/Photo/Photo';
import PhotoModal from '../../components/PhotoModal/PhotoModal';
import useFetch from '../../hooks/useFetch';
import api from '../../api/client';
import './User.css';

const User = () => {
  const [page, setPage] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [index, setIndex] = useState(null);
  const { userName, id } = useParams();
  const { loading, error, list } = useFetch(page, { userName });
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

    return () => observer.unobserve(target);
  }, [handleObserver]);

  const openPhoto = (p, idx) => {
    setPhoto(p);
    setIndex(idx);
    navigate(`/users/${userName}/photos/${p.photoId}`);
  };

  const closeModal = () => {
    navigate(`/users/${userName}`);
  };

  const showPrev = useCallback(
    (e) => {
      e?.stopPropagation();
      if (index > 0) {
        const newIndex = index - 1;
        const newPhoto = list[newIndex];
        if (newPhoto) {
          setPhoto(newPhoto);
          setIndex(newIndex);
          navigate(`/users/${userName}/photos/${newPhoto.photoId}`);
        }
      }
    },
    [index, list, navigate, userName]
  );

  const showNext = useCallback(
    (e) => {
      e?.stopPropagation();
      if (index !== null && index < list.length - 1) {
        const newIndex = index + 1;
        const newPhoto = list[newIndex];
        if (!newPhoto) return;
        setPhoto(newPhoto);
        setIndex(newIndex);
        navigate(`/users/${userName}/photos/${newPhoto.photoId}`);
      }
    },
    [index, list, navigate, userName]
  );

  useEffect(() => {
    if (!id) {
      setPhoto(null);
      setIndex(null);
      return;
    }

    const idx = list.findIndex((p) => String(p.photoId) === id);
    if (idx !== -1) {
      setPhoto(list[idx]);
      setIndex(idx);
      return;
    }

    api
      .get(`/photos/${id}`)
      .then((res) => setPhoto(res.data))
      .catch(() => setPhoto(null));
  }, [id, list]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') {
        showPrev();
      } else if (e.key === 'ArrowRight') {
        showNext();
      }
    };

    if (photo) {
      window.addEventListener('keydown', handleKey);
    }

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [photo, showPrev, showNext]);

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
      <div ref={loader} />
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      {id && photo ? (
        <PhotoModal
          photo={photo}
          onClose={closeModal}
          onPrev={showPrev}
          onNext={showNext}
        />
      ) : (
        list.map((p, idx) => (
          <Photo
            onClick={(photo) => openPhoto(photo, idx)}
            key={p.photoId}
            photo={p}
            showAuthor={false}
          />
        ))
      )}
    </div>
  );
};

export default User;

