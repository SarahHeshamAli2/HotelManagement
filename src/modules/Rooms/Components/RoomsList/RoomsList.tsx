import { useCallback, useEffect, useState } from "react";
import { GetRoomsResponse, Room } from "../../../../interfaces/RoomsInterfaces";
import { axiosInstance, ROOMS_URLS } from "../../../../services/urls";
import CustomTable from "../../../Shared/Components/CustomTable/CustomTable";
import nodataImg from "../../../../assets/nodata.jpg";

import {
  StyledTableCell,
  StyledTableRow,
} from "../../../../helperStyles/helperStyles";
import { PaginationOptions } from "../../../../interfaces/PaginationInterfaces";
import { CircularProgress } from "@mui/material";
import NoData from "../../../Shared/Components/NoData/NoData";
import { toast } from "react-toastify";
import ActionMenu from "../../../Shared/ActionMenu/ActionMenu";
import DeleteConfirmation from "../../../Shared/DeleteConfirmation/DeleteConfirmation";
import DashboardHeading from "../../../Shared/Components/DashboardHeading/DashboardHeading";
import ViewModal from "../../../Shared/Components/ViewModal/ViewModal";
import { useNavigate } from "react-router-dom";

export default function RoomsList() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [viewId, setViewId] = useState<string>("");
  const [view, setView] = useState<boolean>(false);
  const [viewData, setViewData] = useState({});

  const handleOpen = (id: string) => {
    setSelectedId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const getRooms = async ({ size, page }: PaginationOptions) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<GetRoomsResponse>(
        ROOMS_URLS.getAllRooms,
        {
          params: { size, page },
        }
      );
      console.log(response.data.data.rooms);
      setRooms(response.data.data.rooms);
      setCount(response.data.data.totalCount);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const deleteRoom = async () => {
    try {
      setDeleting(true);
      await axiosInstance.delete(ROOMS_URLS.deleteRoom(selectedId));
      toast.success("Room deleted successfully");
      getRooms({ size: 5, page: 1 });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "something went wrong");
    } finally {
      setDeleting(false);
      handleClose();
    }
  };
  useEffect(() => {
    getRooms({ size: 5, page: 1 });
    console.log("here");
  }, []);

  const handleView = (id: string) => {
    setViewId(id);
    setView(true);
    console.log(view);
  };

  const viewRoom = useCallback(async () => {
    const response = await axiosInstance.get(ROOMS_URLS.getRoomDetails(viewId));
    console.log(response?.data?.data);
    setViewData(response?.data?.data);
  }, [viewId]);

  useEffect(() => {
    viewRoom();
  }, [viewRoom]);

  return (
    <>
      <DashboardHeading label="Rooms" item="Room" />
      <DeleteConfirmation
        handleClose={handleClose}
        open={open}
        deleteFn={deleteRoom}
        deleteItem="Room"
        deleting={deleting}
      />
      <CustomTable
        columnTitles={[
          "Room Number",
          "Image",
          "Price",
          "Discount",
          "Capacity",
          "",
        ]}
        count={count}
        getListFn={getRooms}
      >
        {" "}
        {loading && (
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
        {!loading && rooms.length > 0
          ? rooms.map((room) => (
              <StyledTableRow key={room._id}>
                <StyledTableCell component="th" scope="row" align="center">
                  {room.roomNumber}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <img
                    src={room.images[0] ? room.images[0] : nodataImg}
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "8px",
                    }}
                    alt="Room"
                  />
                </StyledTableCell>
                <StyledTableCell align="center">{room.price}</StyledTableCell>
                <StyledTableCell align="center">
                  {room.discount}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {room.capacity}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <ActionMenu
                    handleShowView={() => handleView(room?._id)}
                    handleOpenDelete={() => handleOpen(room?._id)}
                    editFunction={() => {
                      navigate(`/rooms/${room._id}`);
                    }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))
          : !loading && <NoData />}
      </CustomTable>
      <ViewModal viewData={viewData} view={view} closeView={() => setView(false)} />
    </>
  );
}
