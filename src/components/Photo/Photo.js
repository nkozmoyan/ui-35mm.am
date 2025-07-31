import './Photo.css';

const IMAGE_BASE =
  process.env.REACT_APP_IMAGE_BASE_URL || 'http://post35mm.com/';

export default function Photo({ photo, onClick, showAuthor = true }) {
  return (
    <div className="photo" onClick={() => onClick(photo)}>
      <img alt={photo.photoTitle} src={IMAGE_BASE + photo.url.orig}></img>
      <h2>{photo.photoTitle}</h2>
      {showAuthor && <h3>{photo.user.name}</h3>}
    </div>
  );
}
