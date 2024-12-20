import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAds from "../../../../hooks/useAds";
import { ad } from "../../../../services/interfaces";
import ActionMenu from "../../../Shared/ActionMenu/ActionMenu";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { red } from "@mui/material/colors";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  TextField,
} from "@mui/material";
import useRooms from "../../../../hooks/useRooms";
import { Ads_URLS, axiosInstance } from "../../../../services/urls";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormButton from '../../../Shared/Components/FormButton/FormButton';

interface roomDataForm  {
  discount : string,
  roomNumber:string,
  isActive : string,
  room:string,
  _id : string
}

export default function AdvertisementsList() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  

  const { Rooms } = useRooms();
  const { Ads, trigger } = useAds();

  const style = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    borderRadius: "1rem",
    p: 4,
  };

  const {
    register,
    handleSubmit,
    formState: { errors ,isSubmitting},
  } = useForm   <roomDataForm>  ({mode:'onChange'});

  const createNewAd = async(data:roomDataForm) => {
    await axiosInstance
      .post(Ads_URLS.createNewAd, data)
      .then((response) => {
        console.log(response);
        trigger();
        handleClose()
        toast.success(response?.data?.message||"add has been created succ");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message)
      });
    console.log(data);
  };




  return (
    <>
      <button onClick={handleOpen}>Add new add</button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Room Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Discount</TableCell>
              <TableCell align="right">Capacity</TableCell>
              <TableCell align="right">Active</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Ads?.map((ad: ad) => (
              <TableRow
                key={ad._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {ad?.room?.roomNumber}
                </TableCell>
                <TableCell align="right">{ad?.room?.price}</TableCell>
                <TableCell align="right">{ad?.room?.discount}</TableCell>
                <TableCell align="right">{ad?.room?.capacity}</TableCell>
                <TableCell align="right">
                  {ad?.isActive == true ? "Yes" : "No"}
                </TableCell>
                <TableCell align="right">{<ActionMenu />}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Ads
              </Typography>
              <Button
                sx={{ ":hover": { backgroundColor: "unset" } }}
                onClick={handleClose}>
                <HighlightOffIcon sx={{ color: red[600] }} />
              </Button>
            </Box>
            <Box id="modal-modal-description" sx={{ mt: 2 }}>
              <FormControl
                component={"form"}
                onSubmit={handleSubmit(createNewAd)}
                sx={{ width: "100%"}}>
                <TextField
                  select
                  defaultValue={''}
                  fullWidth
                  label={"Room Name"}
                  sx={{
                    backgroundColor: "#F5F6F8",
                    ":hover": { outline: "red" },
                  }}
               
                {...register("room", {
                    required: "please enter room name",
                  })}                  >

              
                  {Rooms?.map((room:roomDataForm) => (

                 <MenuItem value={room?._id} key={room?._id}>
                 {room?.roomNumber}
                 </MenuItem>
                  ))}
                
                </TextField>
                {errors.room && (
                  <FormHelperText
                    sx={{
                      color: "#EB5148",
                      paddingBottom: "0.3rem",
                      fontWeight: "bold",
                    }}>
                    {errors?.room?.message}
                  </FormHelperText>
                )}
                <TextField
                defaultValue=''
              
                  fullWidth
                  label={"Discount"}
                  sx={{ backgroundColor: "#F5F6F8", my: "1rem" }}
                  
                  
                  {...register("discount", {
                                    required: "please enter discount range",
                                    pattern: {
                                      value: /^[0-9]*$/,
                                      message: "please enter numbers only",
                                    },
                                  })}
                  
                  ></TextField>
                {errors.discount && (
                  <FormHelperText
                    sx={{
                      color: "#EB5148",
                      paddingBottom: "0.3rem",
                      fontWeight: "bold",
                    }}>
                    {errors?.discount?.message}
                  </FormHelperText>
                )}
                <TextField
                select
                defaultValue=''
                  {...register("isActive", {
                    required: "please enter ad is active or not",
                  })}
                  fullWidth
                  label={"Active"}
                  sx={{
                    backgroundColor: "#F5F6F8",
                    ":hover": { outline: "red" },
                  }}
                  >
                  <MenuItem value={"true"}>Yes</MenuItem>
                  <MenuItem value={"false"}>No</MenuItem>
                </TextField>
                {errors.isActive && (
                  <FormHelperText
                    sx={{
                      color: "#EB5148",
                      paddingBottom: "0.3rem",
                      fontWeight: "bold",
                    }}>
                    {errors?.isActive?.message}
                  </FormHelperText>
                )}
               <Box sx={{display:'flex' , my:'1rem',width:'40%',justifyContent:'end' , alignSelf:'end'} }>
                 <FormButton isSubmitting={isSubmitting}  btnText="save"/>
                </Box>
              </FormControl>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
}
