import './Photo.css';
import { useState } from 'react';

const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE_URL || 'http://post35mm.com/';

export default function Photo({ photo, onClick }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="photo" onClick={() => onClick(photo)}>
      <img
        alt={photo.photoTitle}
        src={IMAGE_BASE + photo.url.orig}
      ></img>
      <h2>{photo.photoTitle}</h2>
      <h3>{photo.user.name}</h3>
      <div className="photo-actions" onClick={(e) => e.stopPropagation()}>
        <span
          className={liked ? 'liked' : ''}
          onClick={() => setLiked(!liked)}
        >
          ❤
        </span>
        <span
          className={saved ? 'saved' : ''}
          onClick={() => setSaved(!saved)}
        >
          📝
        </span>
      </div>
    </div>
  );
}
