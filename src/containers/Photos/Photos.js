import { useState, useCallback, useEffect, useRef, Children } from 'react';
import Modal from '../../components/Modal/Modal';
import Photo from '../../components/Photo/Photo';
import useFetch from '../../hooks/useFetch';

const Photos = () => {
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [photo, setPhoto] = useState({});
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

  const toggleModal = (photo) => {
    setShowModal(!showModal);
    setPhoto(photo);
  };

  return (
    <div className="photos">
      <div ref={loader} />
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      {showModal ? (
        <Modal>
          <div className="photo-modal" onClick={toggleModal}>
            <img
              alt={photo.photoTitle}
              src={'http://post35mm.com/' + photo.url.orig}
            ></img>
          </div>
        </Modal>
      ) : (
        list.map((photo) => (
          <Photo
            onClick={toggleModal}
            key={photo.photoId}
            photo={photo}
          ></Photo>
        ))
      )}
    </div>
  );
};

export default Photos;
