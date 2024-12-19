import { useEffect, useState } from "react";
import CustomTable from "../../../Shared/Components/CustomTable/CustomTable";

import {
  StyledTableCell,
  StyledTableRow,
} from "../../../../helperStyles/helperStyles";
import { PaginationOptions } from "../../../../interfaces/PaginationInterfaces";
import { CircularProgress } from "@mui/material";
import NoData from "../../../Shared/Components/NoData/NoData";
import {
  Booking,
  GetBookingsResponse,
} from "../../../../interfaces/BookingInterfaces";
import { axiosInstance, BOOKING_URLS } from "../../../../services/urls";
import { toast } from "react-toastify";
import { formatDate } from "../../../../helperFunctions/helperFunctions";
import DashboardHeading from "../../../Shared/Components/DashboardHeading/DashboardHeading";

export default function BookingList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  let getBookings = async ({ size, page }: PaginationOptions) => {
    try {
      setLoading(true);
      let response = await axiosInstance.get<GetBookingsResponse>(
        BOOKING_URLS.getAllBookings,
        {
          params: { size, page },
        }
      );
      console.log(response.data.data.booking);
      setBookings(response.data.data.booking);
      setCount(response.data.data.totalCount);
      toast.success("Get all bookings successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getBookings({ size: 5, page: 1 });
  }, []);

  return (
    <>
      <DashboardHeading label="Bookings" item="Booking" />

      <CustomTable
        columnTitles={[
          "Room Number",
          "Price",
          "Start Date",
          "End Date",
          "User",
          "",
        ]}
        count={count}
        getListFn={getBookings}
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
        {!loading && bookings.length > 0
          ? bookings.map((booking) => (
              <StyledTableRow key={booking?._id}>
                <StyledTableCell component="th" scope="row" align="center">
                  {booking?.room?.roomNumber}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {booking?.totalPrice}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formatDate(booking?.startDate)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formatDate(booking?.endDate)}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {booking?.user?.userName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  view
                </StyledTableCell>
              </StyledTableRow>
            ))
          : !loading && <NoData />}
      </CustomTable>
    </>
  );
}
