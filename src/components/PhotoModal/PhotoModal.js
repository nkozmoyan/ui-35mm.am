import Modal from '../Modal/Modal';
import { Link } from 'react-router-dom';
import { Comments } from '../Comments/Comments';
import '../Photo/Photo.css';

const IMAGE_BASE =
  process.env.REACT_APP_IMAGE_BASE_URL || 'http://post35mm.com/';

const PhotoModal = ({ photo, onClose, onPrev, onNext }) => {
  if (!photo) return null;

  const stop = (e) => e.stopPropagation();

  return (
    <Modal>
      <div className="photo-modal" onClick={onClose}>
        <button className="close" onClick={(e) => {e.stopPropagation(); onClose();}}>
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
              {photo.likes !== undefined && (
                <p>{photo.likes} people likes this.</p>
              )}
              {photo.views !== undefined && <p>{photo.views} Views</p>}
              {photo.createdAt && (
                <p>Posted: {new Date(photo.createdAt).toLocaleDateString()}</p>
              )}
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

