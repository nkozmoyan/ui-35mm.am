import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const Comments = ({ photoId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!photoId) return;
    axios
      .get(`${API_URL}/photos/${photoId}/comments`)
      .then((res) => setComments(res.data))
      .catch(() => setComments([]));
  }, [photoId]);

  return (
    <div className="comments">
      <h3>Comments</h3>
      {comments.map((c, idx) => (
        <div key={idx} className="comment">
          <strong>{c.name}:</strong> {c.comment}
        </div>
      ))}
    </div>
  );
};
