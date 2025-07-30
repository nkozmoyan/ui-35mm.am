import './Photo.css';

const IMAGE_BASE =
  process.env.REACT_APP_IMAGE_BASE_URL || 'http://post35mm.com/';

export default function Photo({ photo, onClick }) {
  return (
    <div className="photo" onClick={() => onClick(photo)}>
      <img alt={photo.photoTitle} src={IMAGE_BASE + photo.url.orig}></img>
      <h2>{photo.photoTitle}</h2>
      <h3>{photo.user.name}</h3>
      <div className="photo-actions" onClick={(e) => e.stopPropagation()}></div>
    </div>
  );
}
