import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';

export const Comments = ({ photoId }) => {
  const [comments, setComments] = useState([]);
  const IMAGE_BASE =
    process.env.REACT_APP_IMAGE_BASE_URL || 'http://post35mm.com/';

  useEffect(() => {
    if (!photoId) return;
    api
      .get(`/photos/${photoId}/comments`)
      .then((res) => setComments(res.data || []))
      .catch(() => setComments([]));
  }, [photoId]);

  return (
    <div className="comments" onClick={(e) => e.stopPropagation()}>
      <h3>Comments</h3>
      {comments.length === 0
        ? null
        : comments.map((c, idx) => (
            <div key={idx} className="comment">
              {c.user?.profilePictureUrl ? (
                <img
                  src={IMAGE_BASE + c.user.profilePictureUrl}
                  alt={c.user?.name || 'commenter'}
                />
              ) : (
                <div className="avatar-placeholder" />
              )}
              <div className="comment-body">
                <div className="comment-header">
                  <strong>
                    {c.user?.userName ? (
                      <Link to={`/users/${c.user.userName}`}>
                        {c.user?.name || c.name}
                      </Link>
                    ) : (
                      c.user?.name || c.name
                    )}
                  </strong>
                  {c.createdAt && (
                    <span className="date">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <div className="comment-text">{c.comment}</div>
              </div>
            </div>
          ))}
    </div>
  );
};
