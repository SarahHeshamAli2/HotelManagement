import { useCallback, useEffect, useState } from 'react';
import CustomTable from '../../../Shared/Components/CustomTable/CustomTable';

import {
	StyledTableCell,
	StyledTableRow,
} from '../../../../helperStyles/helperStyles';
import { PaginationOptions } from '../../../../interfaces/PaginationInterfaces';
import { Button, CircularProgress } from '@mui/material';
import NoData from '../../../Shared/Components/NoData/NoData';
import {
  Booking,
  GetBookingsResponse,
} from "../../../../interfaces/BookingInterfaces";
import { axiosInstance, BOOKING_URLS } from "../../../../services/urls";
import { toast } from "react-toastify";
import { formatDate } from "../../../../helperFunctions/helperFunctions";
import DashboardHeading from "../../../Shared/Components/DashboardHeading/DashboardHeading";
import ViewModal from '../../../Shared/Components/ViewModal/ViewModal';
import { blue } from '@mui/material/colors';
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function BookingList() {
	const [bookings, setBookings] = useState<Booking[]>([]);
	const [count, setCount] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const [viewId, setViewId] = useState<string>('');
	const [view, setView] = useState<boolean>(false);
  const [viewLoading, setViewLoading] = useState<boolean>(false);
  const [viewData, setViewData] = useState({});

  const getBookings = async ({ size, page }: PaginationOptions) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<GetBookingsResponse>(
        BOOKING_URLS.getAllBookings,
        {
          params: { size, page },
        }
      );
      console.log(response.data.data.booking);
      setBookings(response.data.data.booking);
      setCount(response.data.data.totalCount);
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

  const handleView = (id: string) => {
  setViewId(id);
  setViewLoading(true);
  setView(true);
  console.log(view);
};

const viewBooking = useCallback(async () => {
  try {
    const response = await axiosInstance.get(
      BOOKING_URLS.getBookingDetails(viewId)
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
  viewBooking();
}, [viewBooking]);

  return (
    <>
      <DashboardHeading label="Bookings" item="Booking" />

      <CustomTable
      loading={loading}
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
                  <Button onClick={() => handleView(booking?._id)}>
                    <VisibilityIcon sx={{ color: blue[900], mx: "10px" }} />
                    View
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))
          : !loading && <NoData />}
      </CustomTable>
      <ViewModal loading={viewLoading} viewData={viewData} view={view} closeView={() => setView(false)} />
    </>
  );
}
