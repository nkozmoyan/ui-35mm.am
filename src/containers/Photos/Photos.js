import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import Photo from '../../components/Photo/Photo';
import { Comments } from '../../components/Comments/Comments';
import useFetch from '../../hooks/useFetch';
import api from '../../api/client';

const Photos = () => {
  const [page, setPage] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [index, setIndex] = useState(null);
  const { loading, error, list } = useFetch(page);
  const loader = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE_URL || 'http://post35mm.com/';

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
    navigate(`/photos/${p.photoId}`);
  };

  const closeModal = () => {
    navigate('/');
  };

  const showPrev = (e) => {
    e.stopPropagation();
    if (index > 0) {
      const newIndex = index - 1;
      const newPhoto = list[newIndex];
      if (newPhoto) {
        setPhoto(newPhoto);
        setIndex(newIndex);
        navigate(`/photos/${newPhoto.photoId}`);
      }
    }
  };

  const showNext = (e) => {
    e.stopPropagation();
    if (index !== null && index < list.length - 1) {
      const newIndex = index + 1;
      const newPhoto = list[newIndex];
      if (!newPhoto) return;
      setPhoto(newPhoto);
      setIndex(newIndex);
      navigate(`/photos/${newPhoto.photoId}`);
    }
  };

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

  return (
    <div className="photos">
      <div ref={loader} />
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      {id && photo ? (
        <Modal>
          <div className="photo-modal" onClick={closeModal}>
            <div className="photo-wrapper" onClick={(e) => e.stopPropagation()}>
              <span className="nav prev" onClick={showPrev}>
                &#10094;
              </span>
              <img alt={photo.photoTitle} src={IMAGE_BASE + photo.url.orig} />
              <span className="nav next" onClick={showNext}>
                &#10095;
              </span>
            </div>
            <div className="info" onClick={(e) => e.stopPropagation()}>
              <button className="close" onClick={closeModal}>
                &times;
              </button>
              <div className="author">
                {photo.user?.avatar && (
                  <img
                    src={IMAGE_BASE + photo.user.avatar}
                    alt={photo.user.name}
                  />
                )}
                <h3>{photo.user?.name}</h3>
              </div>
              <h2>{photo.photoTitle}</h2>
              {photo.category && <p className="category">{photo.category}</p>}
              {photo.likes !== undefined && (
                <p>{photo.likes} people likes this.</p>
              )}
              {photo.views !== undefined && <p>{photo.views} Views</p>}
              {photo.createdAt && (
                <p>Posted: {new Date(photo.createdAt).toLocaleDateString()}</p>
              )}
              {photo.description && <p>{photo.description}</p>}
              <Comments photoId={photo.photoId} />
            </div>
          </div>
        </Modal>
      ) : (
        list.map((p, idx) => (
          <Photo
            onClick={(photo) => openPhoto(photo, idx)}
            key={p.photoId}
            photo={p}
          />
        ))
      )}
    </div>
  );
};

export default Photos;
