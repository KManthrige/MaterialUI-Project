import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';


export default function App() {

  const [searchItem, setSearchItem] = useState("");
  const [userTyped, setUserTyped] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const searchPic = async () => {
    try {
      const apiKey = process.env.REACT_APP_PEXELS_API_KEY
      const response = await fetch(`https://api.pexels.com/v1/search/?query=${searchItem}`, { headers: { Authorization: apiKey } })
      const data = await response.json()
      console.log(data)
      setUserTyped(data.photos)
    } catch (error) {
      console.log("data not found", error)
    }
  }

  const handleSearch = (event) => {
    setSearchItem(event.target.value)
  }

  const handlePopover = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      {/* TITLE */}
      <Box sx={{ m: "2rem" }}>
        <Typography variant="h3" sx={{ color: "purple" }} gutterBottom>Welcome to the Search Bar! </Typography>
        <Typography variant="h5">Grab a drink and search for Pexel Pictures!</Typography>
      </Box>
      {/* SEARCH BAR */}
      <Box sx={{ m: "2rem" }}>
        <TextField id="filled-basic" label="Type your search criteria here" variant="filled" size="small" onChange={handleSearch} />
      </Box>
      {/* SEARCH BUTTON */}
      <Box>
        <Button variant="contained" onClick={searchPic}>Search</Button>
      </Box>

      <Box>
        <div>
          <table>
            <tbody>
              <td>
                {userTyped.map((item) => (
                  <Box key={item.id}>
                    <img src={item.src.medium} alt={item.alt} onClick={handlePopover} />
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      sx={{height:"1000px", width:"4000000px"}}
                    >
                      <Typography sx={{p:2}}>ID: {item.id}</Typography>
                      <Typography sx={{p:2}}>TITLE: {item.alt}</Typography>
                      <Typography sx={{p:2}}>ID: {item.id}</Typography>
                      <Typography sx={{p:2}}>ID: {item.id}</Typography>

                    </Popover>
                  </Box>
                ))}
              </td>
            </tbody>
          </table>
        </div>
      </Box>

    </>
  );
}
