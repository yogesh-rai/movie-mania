import { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {img_300, noPicture} from "./Imageconfig";
import axios from "axios"
import "./Carousel.css";

const handleDragStart = (e) => e.preventDefault();



const Gallery = ({media_type, id}) => {
  
  const[casts, setCasts] = useState();
  
  const fetchCast = async () => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

      setCasts(data.cast);
  }

  useEffect(() => {
    fetchCast();
  },[])

   
  const responsive = {
    0: {
        items: 3,
    },
    512: {
        items: 5,
    },
    1024: {
        items: 7,
    },
  }

  const items = casts?.map((i) => (
    <div className='carousel_item'>
        <img src={i.profile_path ? `${img_300}/${i.profile_path}` : noPicture} alt={i.name} onDragStart={handleDragStart} className='carousel_img'/>
        <b className='carousel_title'>{i.name}</b>
    </div>
  ))
    
  return (
    <AliceCarousel mouseTracking items={items} infinite autoPlay responsive={responsive} disableDotsControls disableButtonsControls/>
  );
}

export default Gallery;