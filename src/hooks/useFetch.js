import { useState, useEffect } from 'react';
import api from '../api/client';

function useFetch(page) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [list, setList] = useState([]);

    useEffect(() => {
        if (page === 0) {
            return;
        }

        const controller = new AbortController();
        const sendQuery = async () => {
            try {
                setLoading(true);
                setError(false);

                const res = await api.get('/photos', {
                    signal: controller.signal,
                    headers: {
                        Range: 'photos=' + (page - 1) * 40 + '-' + 40 * page,
                    },
                });

                setList((prev) => [...new Set([...prev, ...res.data])]);
                setLoading(false);
            } catch (err) {
                setError(err);
            }
        };

        sendQuery();

        return () => {
            controller.abort();
        };
    }, [page]);

    return { loading, error, list };
}

export default useFetch;
