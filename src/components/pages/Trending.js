import axios from "axios"
import { useState, useEffect } from "react"
import MovieCard from "../MovieCard";
import "./Trending.css";
import Custompagination from "../Custompagination";


const Trending = () => {

    const [result, setResult] = useState([]);

    const [page, setPage] = useState(1);

    const fetchData = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);

        setResult(data.results);
    }

    useEffect(() => {
        fetchData();
        //window.scroll(0,0);
    },[page])

    return (
        <div>
          <span className="pageTitle">Trending</span>
          <div className="trending">
            {result &&
              result.map((item) => (
                <MovieCard
                  key={item.id}
                  id={item.id}
                  poster={item.poster_path}
                  title={item.title || item.name}
                  date={item.first_air_date || item.release_date}
                  type={item.media_type}
                  rating={item.vote_average}
                />
              ))}
          </div>
            <div> 
                <Custompagination setPage={setPage} />
            </div>
        </div>
      );
};

export default Trending;