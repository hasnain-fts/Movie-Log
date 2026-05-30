const API_KEY = '4b87e22c049eec785805ca2fcf23952b'
const baseUrl = 'https://api.themoviedb.org/3'

export const getpopularMovies = async () => {
    try {
        const response = await fetch(`${baseUrl}/movie/popular?api_key=${API_KEY}`);
        const data = await response.json();
        console.log('Fetched popular movies:', data.results);
        return data.results;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}
export const searchMovies = async (query) => {
    try {
        const response = await fetch(`${baseUrl}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error searching movies:', error);
        return [];
    }
}