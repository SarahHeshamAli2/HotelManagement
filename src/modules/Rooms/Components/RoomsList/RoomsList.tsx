import { useEffect, useState } from "react";
import { GetRoomsResponse, Room } from "../../../../interfaces/RoomsInterfaces";
import { axiosInstance, ROOMS_URLS } from "../../../../services/urls";
import CustomTable from "../../../Shared/Components/CustomTable/CustomTable";

import {
  StyledTableCell,
  StyledTableRow,
} from "../../../../helperStyles/helperStyles";
import { PaginationOptions } from "../../../../interfaces/PaginationInterfaces";
import { CircularProgress } from "@mui/material";
import NoData from "../../../Shared/Components/NoData/NoData";

export default function RoomsList() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  let getRooms = async ({ size, page }: PaginationOptions) => {
    try {
      setLoading(true);
      let response = await axiosInstance.get<GetRoomsResponse>(
        ROOMS_URLS.GET_ALL_ROOMS,
        {
          params: { size, page },
        }
      );
      console.log(response.data.data.rooms);
      setRooms(response.data.data.rooms);
      setCount(response.data.data.totalCount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getRooms({ size: 5, page: 1 });
    console.log("here");
  }, []);
  console.log("Loading state:", loading);
  console.log("Rooms state:", rooms);
  console.log("Count state:", count);
  return (
    <>
      <CustomTable
        columnTitles={["Room Number", "Image", "Price", "Discount", "Capacity"]}
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
                    src={room.images[0]}
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
              </StyledTableRow>
            ))
          : !loading && <NoData />}
      </CustomTable>
    </>
  );
}
