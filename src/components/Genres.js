import {useEffect} from 'react';
import Chip from '@mui/material/Chip';
import axios from "axios"

const Genres = ({Genre,setGenre,selectedGenres,setSelectedGenres,type}) => {

    const fetchGenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        setGenre(data.genres);
    }

    useEffect(() => {
        fetchGenres();
        
        return () => {
            setGenre({}); // unmounting
        };
    },[])

    const clickHandler = (gen) => {
        setSelectedGenres([...selectedGenres, gen]);
        setGenre(Genre.filter((g) => g.id !== gen.id));
    }

    const deletekHandler = (gen) => {
        setGenre([...Genre, gen]);
        setSelectedGenres(selectedGenres.filter((g) => g.id !== gen.id));
    }

    return (
        <div style={{padding: "1rem"}}>
            {
                selectedGenres.map((item) => (
                    <Chip label={item.name}  style={{margin: "5px"}} color="success" clickable key={item.id} onDelete={() => (deletekHandler(item))}/>
                ))
            } 

            {
                Genre.map((item) => (
                    <Chip label={item.name}  style={{margin: "5px"}} color="secondary" clickable key={item.id} onClick={() => (clickHandler(item))}/>
                ))
            } 
        </div>
    )

}

export default Genres;