import './Photo.css';
import { Link } from 'react-router-dom';

const IMAGE_BASE =
  process.env.REACT_APP_IMAGE_BASE_URL || 'http://post35mm.com/';

export default function Photo({ photo, onClick, showAuthor = true }) {
  return (
    <div className="photo" onClick={() => onClick(photo)}>
      <img alt={photo.photoTitle} src={IMAGE_BASE + photo.url.orig}></img>
      <h2>{photo.photoTitle}</h2>
      {showAuthor && (
        <h3>
          <Link to={`/users/${photo.user.userName}`}>{photo.user.name}</Link>
        </h3>
      )}
    </div>
  );
}
