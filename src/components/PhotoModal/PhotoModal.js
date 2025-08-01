import Modal from '../Modal/Modal';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Comments } from '../Comments/Comments';
import '../Photo/Photo.css';

const IMAGE_BASE =
  process.env.REACT_APP_IMAGE_BASE_URL || 'http://post35mm.com/';

const PhotoModal = ({ photo, onClose, onPrev, onNext }) => {
  if (!photo) return null;

  const stop = (e) => e.stopPropagation();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    return 'Today';
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <Modal>
      <div className="photo-modal" onClick={onClose}>
        <button
          className="close"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          &times;
        </button>
        <span className="nav prev" onClick={onPrev}>
          &#10094;
        </span>
        <div className="content" onClick={stop}>
          <div className="main">
            <div className="photo-wrapper">
              <img alt={photo.photoTitle} src={IMAGE_BASE + photo.url.orig} />
            </div>
            <div className="info">
              <div className="author">
                {photo.user?.profilePictureUrl && (
                  <img
                    src={IMAGE_BASE + photo.user.profilePictureUrl}
                    alt={photo.user.name}
                  />
                )}
                <h3>
                  <Link to={`/users/${photo.user.userName}`}>
                    {photo.user?.name}
                  </Link>
                </h3>
              </div>
              <h2>{photo.photoTitle}</h2>
              {photo.category && <p className="category">{photo.category}</p>}
              {photo.stats?.likes !== undefined && (
                <p>{photo.stats.likes} people likes this.</p>
              )}
              {photo.stats?.views !== undefined && (
                <p>{photo.stats.views} Views</p>
              )}
              {photo.date && <p>Posted: {formatDate(photo.date)}</p>}
              {photo.description && <p>{photo.description}</p>}
            </div>
          </div>
          <Comments photoId={photo.photoId} />
        </div>
        <span className="nav next" onClick={onNext}>
          &#10095;
        </span>
      </div>
    </Modal>
  );
};

export default PhotoModal;

