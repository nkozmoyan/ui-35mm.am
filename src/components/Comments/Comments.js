import { useEffect, useState } from 'react';
import api from '../../api/client';

export const Comments = ({ photoId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!photoId) return;
    api
      .get(`/photos/${photoId}/comments`)
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
