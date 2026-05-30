import { useMovieContext } from "../contexts/Moviecontext";

function Card({ movie }) {
    const { addToFavorates, removeFromFavorates, isInFavorates } = useMovieContext();

    const isFavorite = isInFavorates(movie.movie_id || movie.id);  // ✅ fixed

    function handleLike() {
        if (isFavorite) {
            removeFromFavorates(movie.movie_id || movie.id);
        } else {
            addToFavorates(movie);
        }
    }

    return (
        <div className="card bg-dark text-white border-0 h-100 shadow" style={{ borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ position: 'relative' }}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="card-img-top"
                    style={{ height: '320px', objectFit: 'cover' }}
                />
                <button
                    onClick={handleLike}
                    className="btn btn-sm"
                    style={{
                        position: 'absolute', top: '10px', right: '10px',
                        borderRadius: '50%', width: '38px', height: '38px',
                        fontSize: '18px',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        border: 'none',
                        lineHeight: 1,
                        padding: 0
                    }}
                    title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
            <div className="card-body">
                <h5 className="card-title fw-semibold mb-1">{movie.title}</h5>
                <p className="card-text text-secondary" style={{ fontSize: '13px' }}>
                    📅 {movie.release_date}
                </p>
                <p className="card-text" style={{ fontSize: '14px' }}>
                    {movie.overview}
                </p>
            </div>
        </div>
    )
}

export default Card;