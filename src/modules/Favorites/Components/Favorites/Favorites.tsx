import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid2,
  Typography,
} from "@mui/material";
import UserPageTitle from '../../../Users-Portal/Component/UsersShared/UserPageTitle/UserPageTitle';

import { experimentalStyled as styled } from "@mui/material/styles";
import { axiosInstance, Favorites_URLS } from "../../../../services/urls";
import useFetch from "../../../../hooks/useFetch";
import NoData from "../../../Shared/Components/NoData/NoData";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";
import { room } from "../../../../services/interfaces";
import { useState } from "react";
import DeleteConfirmation from "../../../Shared/DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-toastify";


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
  height: '100%', // Fill the parent's height
  width: '100%', // Fill the parent's width
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
  const [deleting, setDeleting] = useState<boolean>(false);

	const handleOpen = (id:string) => {setOpen(true)
    setRoomId(id)
    console.log(id);
 
    
  }
	const handleClose = () => setOpen(false);
  const getAllFav = async () => {
    const response = await axiosInstance.get(Favorites_URLS.Get_Fav);
    return response;
  };
  const { data, loading,trigger } = useFetch(getAllFav);
  const favoriteRooms = data?.data?.data?.favoriteRooms[0]?.rooms;

  
  const deleteFavorite =()=>{
    setDeleting(true)
    axiosInstance.delete(Favorites_URLS.Delete_Fav(roomId),{
      data:{
        "roomId":roomId
      }

    }).then((resp)=>{
      setDeleting(false)
      toast.success(data?.data?.message)
      trigger()
      handleClose()
      console.log(resp);

      
    }).catch((error)=>{
      setDeleting(false)

      console.log(error);

      
    })
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
        ) : favoriteRooms?.length > 0 ? (
          <Grid2
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 8, md: 12 }}>
            {favoriteRooms?.map((room: room) => (
              <Grid2 key={room?._id} size={{ xs: 2, sm: 4, md: 4 }}>
                <Item
                  sx={{
                    height: { md: "13.4rem", xs: "10rem" },
                  }}>
                  <img
                    className="favoriteImage"
                    src={room?.images[0]}
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
