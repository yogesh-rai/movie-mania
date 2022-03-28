import { useState, useEffect } from "react";
import axios from "axios"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import "./MovieCard.css";
import {img_500, unavailable} from "./Imageconfig";
import YouTubeIcon from '@mui/icons-material/YouTube';
import "./Moviemodal.css";
import Gallery from "./Carousel";

const style = {

  width: "80%",
  height: "80%",
  background:"linear-gradient(90deg, #FDBB2D 0%, #3A1C71 100%)",
  position: 'absolute',
  borderRadius: 10,
  color: "white",
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
  p: 3,
};

export default function Moviemodal({children, media_type, id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [result, setResult]  = useState([]);

  const [video, setVideo]  = useState();

  const fetchData = async () => {
    const{data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    
    setResult(data);
  }

  const fetchVideo = async () => {
    const{data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    
    setVideo(data.results[0]?.key);
  }

  useEffect(() => {
    fetchData();
    fetchVideo();

  },[])



  return (
    <>
      <div  className="card" onClick={handleOpen}>{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
           <div className="modal_content">
             <img className="modal_poster" src={result.poster_path ? `${img_500}/${result.poster_path}`: unavailable} alt={result.name || result.title}/>
              <div className="modal-about">
                <span className="modal_title">
                  {result.name || result.title} ({
                    (result.first_air_date || result.release_date || ".....").substring(0,4)
                  })
                </span>
                <span className="modal_description">
                  {result.overview}
                </span>
                <div>
                  <Gallery media_type={media_type} id={id} />
                </div>
                <Button
                        variant="contained"
                        startIcon={<YouTubeIcon />}
                        color="secondary"
                        target="__blank"
                        href={`https://www.youtube.com/watch?v=${video}`}
                      >
                        Watch the Trailer
                  </Button> 
              </div>
           </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}