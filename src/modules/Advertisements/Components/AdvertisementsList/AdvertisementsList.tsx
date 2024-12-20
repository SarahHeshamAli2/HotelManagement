import ActionMenu from "../../../Shared/ActionMenu/ActionMenu";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React, { useCallback, useEffect } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { red } from "@mui/material/colors";
import {
  CircularProgress,
  FormControl,
  MenuItem,
  TextField,
} from "@mui/material";
import useRooms from "../../../../hooks/useRooms";
import { Ads_URLS, axiosInstance } from "../../../../services/urls";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormButton from "../../../Shared/Components/FormButton/FormButton";
import CustomTable from "../../../Shared/Components/CustomTable/CustomTable";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../../helperStyles/helperStyles";
import NoData from "../../../Shared/Components/NoData/NoData";

import useAds from "../../../../hooks/useAds";
import { ad } from "../../../../services/interfaces";
import DashboardHeading from "../../../Shared/Components/DashboardHeading/DashboardHeading";
import DeleteConfirmation from "../../../Shared/DeleteConfirmation/DeleteConfirmation";
import ViewModal from "../../../Shared/Components/ViewModal/ViewModal";

interface roomDataForm {
  discount: string;
  isActive: boolean | undefined | null | string;
  room: string;
  _id: string;
  roomNumber: "string";
}

export default function AdvertisementsList() {
  const [open, setOpen] = React.useState(false);
  const [isEdited, setIsEdited] = React.useState(false);
  const [adId, setAdId] = React.useState<string>("");
  const [isActive, setIsActive] = React.useState<boolean>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [viewId, setViewId] = React.useState<string>('');
  const [view, setView] = React.useState<boolean>(false);
  const [viewLoading, setViewLoading] = React.useState<boolean>(false);
  const [viewData, setViewData] = React.useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [deleting, setDeleting] = React.useState<boolean>(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string>("");
  const handleOpenDelete = (id: string) => {
    setSelectedId(id);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);
  

  const { Ads, AdsCount, getAd, Loading, setIsChanged } = useAds();

  const { Rooms } = useRooms();

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
    handleSubmit,
    reset,
    control,
    setValue,

    formState: { errors, isSubmitting },
  } = useForm<roomDataForm>({
    mode: "onChange",
    defaultValues: {
      isActive: null,
      discount: "",
      room: "",
    },
  });

  const onSbumitHandler = async (data: roomDataForm) => {
    setIsChanged(true);
    await axiosInstance[isEdited ? "put" : "post"](
      isEdited ? Ads_URLS.UpdateAd(adId) : Ads_URLS.createNewAd,
      isEdited ? { isActive: data.isActive, discount: data.discount } : data
    )
      .then((response) => {
        handleClose();
        toast.success(response?.data?.message || "add has been created succ");
        reset({
          isActive: "false",
          discount: "",
          room: "",
        });
        setIsChanged(false);
      })

      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message || "something wrong went");
      });
  };

  const handleAddNewAd = () => {
    handleOpen();
    setIsLoading(false);
    setIsEdited(false);
    setValue("isActive", "");
    setValue("discount", "");
  };

  const getAdById = (id: string) => {
    handleOpen();
    setIsLoading(true);
    axiosInstance
      .get(Ads_URLS.getAdById(id))
      .then((resp) => {
        setIsLoading(false);
        const value = resp?.data?.data?.ads;
        setIsEdited(true);

        setAdId(resp.data.data.ads._id);
        setValue("discount", value?.room?.discount);
        setValue("isActive", value?.isActive || "false");
        setIsActive(value?.isActive || "false");
        setValue("roomNumber", resp.data.data.ads._id);
        setIsActive(value?.isActive);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteAd = async () => {
    try {
      setIsChanged(true);
      setDeleting(true);
      await axiosInstance.delete(Ads_URLS.deleteAd(selectedId));
      toast.success("Ad deleted successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "something went wrong");
    } finally {
      setIsChanged(false);
      setDeleting(false);
      handleCloseDelete();
    }
  };
  React.useEffect(() => {
    setValue("isActive", isActive === null ? "false" : String(isActive));
  }, [isActive, setValue, Loading]);

  const handleView = (id: string) => {
  setViewId(id);
  setViewLoading(true);
  setView(true);
  console.log(view);
};

const viewAd = useCallback(async () => {
  try {
    const response = await axiosInstance.get(
      Ads_URLS.getAdById(viewId)
    );
    console.log(response?.data?.data);
    setViewData(response?.data?.data);
  } catch (error) {
    console.log(error)
  } finally {
    setViewLoading(false);
  }
}, [viewId]);

useEffect(() => {
  viewAd();
}, [viewAd]);

  return (
    <>
      <DashboardHeading label="ADS" item="Ads" handleClick={handleAddNewAd} />
      <CustomTable
        columnTitles={[
          "Room Name",
          "Price",
          "Discount",
          "Capacity",
          "Active",
          "Actions",
        ]}
        count={Number(AdsCount) ? AdsCount : 5}
        getListFn={getAd}
      >
        {Loading && (
          <CircularProgress
            sx={{
              color: "blue",
              marginTop: "4rem",
              marginInline: "auto",
              display: "flex",
            }}
            size={"4rem"}
          />
        )}
        {!Loading && Ads?.length > 0
          ? Ads?.map((ad: ad) => (
              <StyledTableRow key={ad._id}>
                <StyledTableCell component="th" scope="row" align="center">
                  {ad?.room?.roomNumber}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {ad?.room?.price}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {ad?.room?.discount}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {ad?.room?.capacity}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {ad?.isActive == true ? "Yes" : "No"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <ActionMenu
                    handleShowView={() => handleView(ad._id)}
                    editFunction={() => getAdById(ad._id)}
                    handleOpenDelete={() => handleOpenDelete(ad?._id)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))
          : !Loading && <NoData />}
      </CustomTable>

      {/*ADD & Edit Model */}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Ads
              </Typography>
              <Button
                sx={{ ":hover": { backgroundColor: "unset" } }}
                onClick={handleClose}
              >
                <HighlightOffIcon sx={{ color: red[600] }} />
              </Button>
            </Box>
            <Box id="modal-modal-description" sx={{ mt: 2 }}>
              {isLoading ? (
                <CircularProgress
                  sx={{
                    color: "blue",
                    marginTop: "4rem",
                    marginInline: "auto",
                    display: "flex",
                  }}
                  size={"4rem"}
                />
              ) : (
                <FormControl
                  sx={{ width: "100%" }}
                  component={"form"}
                  onSubmit={handleSubmit(onSbumitHandler)}
                >
                  {!isEdited ? (
                    <Box>
                      <Controller
                        name="room"
                        control={control}
                        rules={{ required: "Please select a room" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            label="Room Name"
                            error={!!errors.room}
                            helperText={errors.room?.message}
                            sx={{ backgroundColor: "#F5F6F8" }}
                            fullWidth
                          >
                            {Rooms?.map((room: roomDataForm) => (
                              <MenuItem key={room._id} value={room._id}>
                                {room.roomNumber}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Box>
                  ) : (
                    ""
                  )}
                  <Box my={"1rem"}>
                    <Controller
                      name="discount"
                      control={control}
                      rules={{
                        required: "Please enter discount",
                        pattern: { value: /^[0-9]*$/, message: "Numbers only" },
                      }}
                      render={({ field }) => (
                        <>
                          {isEdited ? <label>Discount Amount :</label> : ""}
                          <TextField
                            label={isEdited ? "" : "Discount"}
                            {...field}
                            error={!!errors.discount}
                            helperText={errors.discount?.message}
                            sx={{ backgroundColor: "#F5F6F8" }}
                            fullWidth
                          />
                        </>
                      )}
                    />
                  </Box>

                  <Box>
                    <Controller
                      name="isActive"
                      control={control}
                      rules={{ required: "Please select if active" }}
                      render={({ field }) => (
                        <>
                          {isEdited ? <label>is active ad:</label> : ""}
                          <TextField
                            {...field}
                            select
                            label={isEdited ? "" : "Active"}
                            error={!!errors.isActive}
                            helperText={errors.isActive?.message}
                            sx={{ backgroundColor: "#F5F6F8" }}
                            fullWidth
                          >
                            <MenuItem value="true">Yes</MenuItem>
                            <MenuItem value="false">No</MenuItem>
                          </TextField>
                        </>
                      )}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      my: "1rem",
                      width: "40%",
                      justifyContent: "end",
                      alignSelf: "end",
                    }}
                  >
                    <FormButton isSubmitting={isSubmitting} btnText="save" />
                  </Box>
                </FormControl>
              )}
            </Box>
          </Box>
        </Modal>
      </div>
      {/*Delete Modal */}
      <DeleteConfirmation
        handleClose={handleCloseDelete}
        open={openDelete}
        deleteFn={deleteAd}
        deleteItem="Ad"
        deleting={deleting}
      />
      <ViewModal loading={viewLoading} viewData={viewData} view={view} closeView={() => setView(false)} />
    </>
  );
}