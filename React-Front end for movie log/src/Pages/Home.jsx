import Card from "../Components/Card";
import Search from "../Components/Search";
import { useState , useEffect} from "react";
import {searchMovies , getpopularMovies} from "../Services/Api";

function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies , setMovies] = useState([]);
    const [error , setError] = useState(null);
    const [loading , setloading] = useState(true);
    useEffect(() => {
        const loadPopoularMovies = async () => {
            try {
                const popularMovies = await getpopularMovies();
                console.log('Popular movies loaded:', popularMovies);
                setMovies(popularMovies);
            }catch(error){
                console.error('Error loading popular movies:', error);
                setError(error.message);

            }finally{
                setloading(false);
            }
        }
        loadPopoularMovies();
    },[])

    const handleSearch = async (e) => {
        e.preventDefault();
        try{
        const searchresults = await searchMovies(searchQuery);
        setMovies(searchresults);
        setError(null);
        }catch(error) {
            setError(error.message);
        }finally{
            setloading(false);
        }
        
    }

    return (
        <div className="bg-dark min-vh-100 text-white py-4 px-3">
            <h2 className="text-center fw-bold mb-1">🎬 Discover Movies</h2>
            <p className="text-center text-secondary mb-3">Find and save your favourite films</p>
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSubmit={handleSearch} />
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {movies.map((movie) => (
                        <div className="col" key={movie.name}>
                            <Card movie={movie} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Home;