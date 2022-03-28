import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const Theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

const Custompagination = ({setPage, noOfPages=10}) => {

    const pageChange = (page) => {
        setPage(page);
        window.scroll(0,0);
    }


    return (
        <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
            <ThemeProvider theme={Theme} >
              <Pagination count={noOfPages} color="primary" size="large" onChange={(event) => pageChange(event.target.textContent)} hideNextButton hidePrevButton />
            </ThemeProvider>
        </div>
    )
}

export default Custompagination;