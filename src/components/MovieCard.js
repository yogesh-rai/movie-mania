import {img_300,unavailable} from "./Imageconfig";
import "./MovieCard.css";
import Badge from '@mui/material/Badge';
import Moviemodal from "./Moviemodal";

const MovieCard = ({
    id,
    title,
    poster,
    date,
    type,
    rating,
}) => {

    return (
        <Moviemodal media_type={type} id={id}>
            
            <Badge badgeContent={rating} color={rating>6 ? "success" : "warning"}/>
            <img className="poster" src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
            <b className="title">{title}</b>
            <span className="subtitle">
                {type === 'tv' ? "Tv Series" : "Movie"}
                <span className="subtitle">{date}</span>
            </span>
           
        </Moviemodal>
    )
}

export default MovieCard;