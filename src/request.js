export let API_KEY = "f93445a942bd04c00b774a5d9c724293";

export let baseURL = `https://api.themoviedb.org/3`;

export let image_base_url = `https://image.tmdb.org/t/p/original/`;

let request = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumantaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export default request;
