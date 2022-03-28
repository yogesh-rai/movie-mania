import { useState, useEffect } from "react";
import axios from "axios"
import Custompagination from "../Custompagination";
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab'; 
import MovieCard from "../MovieCard";

const Theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#ffffff',
      },
    },
});


const Search = () => {

    const [type, setType] = useState(0);

    const [searchTerm, SetSearchTerm] = useState("");

    const [result, setResult] = useState([]);

    const [page, setPage] = useState(1);

    const [noOfPages, setNoOfPages] = useState();

    const handleChange = (event, newValue) => {
        setType(newValue);
    }; 

    const fetchSearch = async () => {
       

        const {data} = await axios.get(`https://api.themoviedb.org/3/search/${type?"tv":"movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchTerm}&page=${page}&include_adult=false`);

        setResult(data.results);
        setNoOfPages(data.total_pages);
    }

    useEffect(() => {
        fetchSearch();
        window.scroll(0,0);

    },[page, type])


    return (
       <div>
            <ThemeProvider theme={Theme} >
                <div style={{display: "flex", margin: "2rem 0"}} >
                    <TextField id="filled-basic" label="Search" variant="filled" style={{flex: 1}} onChange={(e) => SetSearchTerm(e.target.value)} />
                    <Button variant="contained" style={{marginLeft: "1rem"}} onClick={fetchSearch} >
                        <SearchIcon fontSize="large"/>
                    </Button>
                </div>
                <Tabs value={type} onChange={handleChange} aria-label="basic tabs example" indicatorColor="primary" style={{ paddingBottom: "2rem"}} >
                    <Tab label="Search Movies"  style={{ width: "50%" }} />
                    <Tab label="Search Tv Series" style={{ width: "50%" }} />
                </Tabs>
            </ThemeProvider>

            <div className="trending">
                {result &&
                 result.map((item) => (
                    <MovieCard
                    key={item.id}
                    id={item.id}
                    poster={item.poster_path}
                    title={item.title || item.name}
                    date={item.first_air_date || item.release_date}
                    type={type ? "tv" : "movie"}
                    rating={item.vote_average}
                    />
                ))}
                {searchTerm && (result.length === 0) &&
                (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            <div> 
                {(noOfPages > 1 && (<Custompagination setPage={setPage} noOfPages={noOfPages} />))}
            </div>

       </div>
    )
}

export default Search;