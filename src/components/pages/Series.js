import axios from "axios"
import { useState, useEffect } from "react"
import MovieCard from "../MovieCard";
import "./Trending.css";
import Custompagination from "../Custompagination";
import Genres from "../Genres";
import useGenre from "../useGenre";


const Series = () => {
    const [result, setResult] = useState([]);

    const [page, setPage] = useState(1);

    const [noOfPages, setNoOfPages] = useState();

    const [selectedGenres, setSelectedGenres] = useState([]);

    const [Genre, setGenre] = useState([]);

    const movieGenre = useGenre(selectedGenres);
    
    const fetchMovies = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${movieGenre}`);

        setResult(data.results);
        setNoOfPages(data.total_pages);
    }

    useEffect(() => {
        fetchMovies();

    },[page, movieGenre])

    return (
        <div>
          <span className="pageTitle">Series</span>
          <Genres 
           Genre={Genre}
           setGenre = {setGenre}
           selectedGenres={selectedGenres}
           setSelectedGenres={setSelectedGenres}
           type="tv"
          />
          <div className="trending">
            {result &&
              result.map((item) => (
                <MovieCard
                  key={item.id}
                  id={item.id}
                  poster={item.poster_path}
                  title={item.title || item.name}
                  date={item.first_air_date || item.release_date}
                  type="tv"
                  rating={item.vote_average}
                />
              ))}
          </div>
            <div> 
                <Custompagination setPage={setPage} noOfPages={noOfPages} />
            </div>
        </div>
      );
}

export default Series;