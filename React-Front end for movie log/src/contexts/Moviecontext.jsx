import { createContext, useState, useEffect, useContext } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorates, setFavorates] = useState([]);

    const getToken = () => localStorage.getItem('access');

    useEffect(() => {
        const fetchFavorites = async () => {
            const token = getToken();
            if (!token) return;

            const response = await fetch('http://127.0.0.1:8000/api/favorites/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setFavorates(data);
            }
        };

        fetchFavorites();
    }, []);

    const addToFavorates = async (movie) => {
        const token = getToken();
        if (!token) return;

        const response = await fetch('http://127.0.0.1:8000/api/favorites/add/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                movie_id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                release_date: movie.release_date,
                overview: movie.overview
            })
        });

        if (response.ok) {
            const data = await response.json();
            setFavorates((prev) => [...prev, data]);
        }
    };

    const removeFromFavorates = async (movieId) => {
        const token = getToken();
        if (!token) return;

        const response = await fetch(`http://127.0.0.1:8000/api/favorites/remove/${movieId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            setFavorates((prev) => prev.filter(
                movie => movie.movie_id !== movieId && movie.id !== movieId
            ));
        }
    };

    const isInFavorates = (movieId) => {
        return favorates.some(movie => movie.movie_id === movieId || movie.id === movieId);
    };

    const value = {
        favorates,
        addToFavorates,
        removeFromFavorates,
        isInFavorates
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};