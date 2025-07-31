import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Photo from '../../components/Photo/Photo';
import PhotoModal from '../../components/PhotoModal/PhotoModal';
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

  const IMAGE_BASE =
    process.env.REACT_APP_IMAGE_BASE_URL || 'http://post35mm.com/';

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

  const showPrev = useCallback(
    (e) => {
      e?.stopPropagation();
      if (index > 0) {
        const newIndex = index - 1;
        const newPhoto = list[newIndex];
        if (newPhoto) {
          setPhoto(newPhoto);
          setIndex(newIndex);
          navigate(`/photos/${newPhoto.photoId}`);
        }
      }
    },
    [index, list, navigate]
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
        navigate(`/photos/${newPhoto.photoId}`);
      }
    },
    [index, list, navigate]
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
          />
        ))
      )}
    </div>
  );
};

export default Photos;
