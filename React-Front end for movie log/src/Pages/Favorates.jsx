import Card from "../Components/Card";
import { useMovieContext } from "../contexts/Moviecontext";

function Favorates() {
    const { favorates } = useMovieContext();

    if (favorates.length === 0) {
        return (
            <div className="bg-dark min-vh-100 text-white d-flex flex-column align-items-center justify-content-center">
                <div className="text-center">
                    <div style={{ fontSize: '64px' }}>💔</div>
                    <h3 className="fw-bold mt-3">No Favourite Movies Yet</h3>
                    <p className="text-secondary">Start liking movies on the home page to see them here.</p>
                    <a href="/" className="btn btn-danger mt-2 px-4">Browse Movies</a>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-dark min-vh-100 text-white py-4 px-3">
            <h2 className="text-center fw-bold mb-1">❤️ My Favourites</h2>
            <p className="text-center text-secondary mb-3">Your saved movies</p>
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {favorates.map((movie) => (
                        <div className="col" key={movie.movie_id}>   {/* ✅ fixed */}
                            <Card movie={movie} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Favorates;