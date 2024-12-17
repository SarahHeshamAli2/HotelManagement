import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Typography,
  Modal,
  FormControl,
  TextField,
  MenuItem,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { red } from "@mui/material/colors";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import useRooms from "../../../../hooks/useRooms";
import useAds from "../../../../hooks/useAds";
import { Ads_URLS, axiosInstance } from "../../../../services/urls";
import ActionMenu from "../../../Shared/ActionMenu/ActionMenu";
import FormButton from "../../../Shared/Components/FormButton/FormButton";

// Interface for form inputs
interface AdFormData {
  room: string;
  discount: string;
  isActive: string;
}

// Component Definition
export default function AdvertisementsList() {
  const [open, setOpen] = useState(false);
  const { Rooms } = useRooms();
  const { Ads, trigger } = useAds();

  // Modal Handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Form Logic
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AdFormData>({ mode: "onChange" });

  // Form Submit Handler
  const createNewAd = async (data: AdFormData) => {
    try {
      const response = await axiosInstance.post(Ads_URLS.createNewAd, data);
      toast.success(response?.data?.message || "Ad created successfully");
      trigger();
      handleClose();
      reset(); // Reset the form fields after successful submission
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to create ad");
    }
  };

  // Modal Style
  const modalStyle = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    borderRadius: "1rem",
    p: 4,
  };

  return (
    <>
      {/* Add Button */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add New Ad
      </Button>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="ads table">
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
            {Ads?.map((ad) => (
              <TableRow key={ad._id}>
                <TableCell>{ad?.room?.roomNumber}</TableCell>
                <TableCell align="right">{ad?.room?.price}</TableCell>
                <TableCell align="right">{ad?.room?.discount}</TableCell>
                <TableCell align="right">{ad?.room?.capacity}</TableCell>
                <TableCell align="right">
                  {ad?.isActive ? "Yes" : "No"}
                </TableCell>
                <TableCell align="right">
                  <ActionMenu />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Section */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          {/* Modal Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Create New Ad</Typography>
            <Button sx={{ ":hover": { backgroundColor: "unset" } }} onClick={handleClose}>
              <HighlightOffIcon sx={{ color: red[600] }} />
            </Button>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit(createNewAd)} sx={{ mt: 2 }}>
            <FormControl sx={{ width: "100%", mb: 2 }}>
              {/* Room Select */}
              <Controller
                name="room"
                control={control}
                rules={{ required: "Please select a room" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Room Name"
                    defaultValue=""
                    error={!!errors.room}
                    helperText={errors.room?.message}
                    sx={{ backgroundColor: "#F5F6F8" }}
                  >
                    {Rooms?.map((room) => (
                      <MenuItem key={room._id} value={room._id}>
                        {room.roomNumber}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </FormControl>

            {/* Discount Input */}
            <FormControl sx={{ width: "100%", mb: 2 }}>
              <Controller
                name="discount"
                control={control}
                rules={{
                  required: "Please enter discount",
                  pattern: { value: /^[0-9]*$/, message: "Numbers only" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Discount"
                    error={!!errors.discount}
                    helperText={errors.discount?.message}
                    sx={{ backgroundColor: "#F5F6F8" }}
                  />
                )}
              />
            </FormControl>

            {/* Active Select */}
            <FormControl sx={{ width: "100%", mb: 2 }}>
              <Controller
                name="isActive"
                control={control}
                rules={{ required: "Please select if active" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Active"
                    defaultValue=""
                    error={!!errors.isActive}
                    helperText={errors.isActive?.message}
                    sx={{ backgroundColor: "#F5F6F8" }}
                  >
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </TextField>
                )}
              />
            </FormControl>

            {/* Submit Button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <FormButton isSubmitting={isSubmitting} btnText="Save" />
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
