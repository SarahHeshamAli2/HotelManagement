import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid2,
  Typography,
} from "@mui/material";
import UserPageTitle from '../../../Users-Portal/Component/UsersShared/UserPageTitle/UserPageTitle';
import nodataImg from "../../../../assets/images/nodata.jpg";

import { experimentalStyled as styled } from "@mui/material/styles";
import NoData from "../../../Shared/Components/NoData/NoData";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";
import { room } from "../../../../services/interfaces";
import { useState } from "react";
import DeleteConfirmation from "../../../Shared/DeleteConfirmation/DeleteConfirmation";
import useDeleteFromFav from "../../../../hooks/useDeleteFromFav";
import useFavorites from "../../../../hooks/useFavorites";


const ParentDiv = styled(Box)(() => ({
  display: "flex",
  position: "absolute",
  top: "100%",
  bottom: "0",
  right: "0",
  left: "0",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#203FC736",

  overflow: "hidden",

  textAlign: "center",
}));

const Item = styled(Box)(({ theme }) => ({
  display: "flex",
  borderRadius: "1rem",
  alignItems: "center",
  justifyContent: "center",
  ...theme.typography.body2,
  overflow: "hidden",
  borderRaduis: "1rem",
  height: '100%', 
  width: '100%', 
  ":hover .parentDiv": {
    top: 0,

    transition: "0.3s all",
  },
  position: "relative",
  textAlign: "center",
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function Favorites() {
	const [roomId, setRoomId] = useState('')
	const [open, setOpen] = useState(false);

	const handleOpen = (id:string) => {setOpen(true)
    setRoomId(id)
 
    
  }
	const handleClose = () => setOpen(false);
    


  
  const{favoriteItems,loading,triggerFav}= useFavorites()

    

  const{handleClickDelete,deleting}=useDeleteFromFav()
  
  const deleteFavorite = async () => {
    try {
      await handleClickDelete(roomId);  
      triggerFav();  
      handleClose();  
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  }
  return (
    <>
    <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "3.12rem",
          mb: "4.5rem",
        }}>
        <Typography
          color="#152C5B"
          fontWeight={500}
          component={"h1"}
          variant="h5">
          Your Favorites
        </Typography>
        
      </Box>
      <Container  sx={{ flexGrow: 1,mb:'6rem' }}>
        <Box sx={{pb:'3rem'}}>
        <UserPageTitle current="Favorites" />

        </Box>
        <Typography variant="h6" component={'h3'} color="#152C5B" mb={'1.2rem'}>Your Rooms</Typography>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress
              sx={{
                marginBlock: "2rem",
                color: "blue",
              }}
              size={"6rem"}
            />
          </Box>
        ) : favoriteItems?.length > 0 ? (
          <Grid2
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 8, md: 12 }}>
            {favoriteItems?.map((room: room) => (
              <Grid2 key={room?._id} size={{ xs: 2, sm: 4, md: 4 }}>
                <Item
                  sx={{
                    height: { md: "13.4rem", xs: "10rem" },
                  }}>
                  <img
                    className="favoriteImage"
                    src={room?.images[0]?room.images[0]:nodataImg}
                    alt="hotel favorites room"
                    style={{ objectFit: "cover",width:'100%',height:'100%'}}
                  />
                  <ParentDiv className="parentDiv">
                    <Button onClick={()=>handleOpen(room._id)}>

                    <FavoriteIcon
                      sx={{
                        fontSize: "2rem",
                        color: red[800],
                        ":hover": {
                          color: red[100],
                        },
                        transition: "0.25s all",
                        cursor: "pointer",
                      }}
                    />
                    </Button>
                  </ParentDiv>

                </Item>
              </Grid2>
            ))}
          </Grid2>
		  
        ) : (
          <NoData />
        )}
        				  <DeleteConfirmation deleting={deleting} deleteFn={deleteFavorite} deleteItem="this from favorites" handleClose={handleClose} open={open}/>

      </Container>
    </>
  );
}
