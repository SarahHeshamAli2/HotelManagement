import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import { styled, ThemeProvider } from "@mui/system";
import { theme } from "../../../../../helperStyles/helperStyles";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../../Context/Context";
import DatePicker from "../CalendarBooking/DatePicker/DatePicker";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { red } from "@mui/material/colors";
import { axiosInstance, BOOKING_URLS } from "../../../../../services/urls";
import { toast } from "react-toastify";
import axios from "axios";

const CustomizedBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  color: theme.palette.Grey2.main,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.Grey.main}`,
  textAlign: "start",
  width: "100%",
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "1rem",
  boxShadow: 24,
  p: 4,
};

export default function BookingCard({
  roomId,
  totalPrice,
}: {
  roomId: string;
  totalPrice: number;
}) {
  let navigate = useNavigate();
  const { loginData } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const onSubmit = async (data: FieldValues) => {
  //   console.log(data);
  //   try {
  //     if (!data.dateRange.startDate || !data.dateRange.endDate) {
  //       setError("Please pick a start and end date.");
  //       return;
  //     }
  //     if (loginData?.role === "user") {
  //       const response = await axiosInstance.post(BOOKING_URLS.createBooking, {
  //         room: roomId,
  //         startDate: data?.dateRange.startDate,
  //         endDate: data?.dateRange.endDate,
  //         totalPrice,
  //       });
  //       if (response.status === 201) {
  //         toast.success(
  //           response?.data?.message || "Booking created successfully"
  //         );
  //         navigate(`/booking/${roomId}/user-info`);
  //       }
  //     } else {
  //       handleOpen();
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       toast.error(
  //         error.response?.data?.message || "Something went wrong, try again"
  //       );
  //     } else {
  //       console.error(error);
  //     }
  //   }
  // };
  const handleButtonClick = async () => {
    try {
      if (!dateRange.startDate || !dateRange.endDate) {
        setError("Please pick a start and end date.");
        return;
      }
      setIsSubmitting(true);
      if (loginData?.role === "user") {
        const response = await axiosInstance.post(BOOKING_URLS.createBooking, {
          room: roomId,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          totalPrice,
        });
        console.log(response);
        if (response.status === 201) {
          toast.success(
            response?.data?.message || "Booking created successfully"
          );
          navigate(`/booking/${roomId}/user-info`, {
            state: { bookingId: response?.data?.data?.booking._id },
          });
        }
      } else {
        handleOpen();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Something went wrong, try again"
        );
      } else {
        console.error(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <CustomizedBox>
        <Typography sx={{ color: theme.palette.Blue.main }}>
          Start Booking
        </Typography>
        <Typography variant="h4" component="p">
          <Box sx={{ color: theme.palette.Green.main }} component="span">
            $280
          </Box>{" "}
          per night
        </Typography>
        <Typography
          sx={{ color: theme.palette.error.main, marginBlockEnd: "7.875rem" }}
        >
          Discount 20% off
        </Typography>
        <Typography
          sx={{ color: theme.palette.Blue.main, marginBlockEnd: "0.5rem" }}
        >
          Pick a Date
        </Typography>
        <DatePicker
          dateRange={dateRange}
          setDateRange={setDateRange}
          error={error}
          setError={setError}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          onClose={handlePopoverClose}
        />

        <Button
          onClick={handleButtonClick}
          sx={{
            marginBlock: "1rem",
            marginInline: "auto",
            backgroundColor: "#3252DF",
            width: { xs: "95%", md: "70%" },
            height: "3rem",
            borderRadius: "0.25rem",
            textTransform: "none",
            color: "#fff",
            fontSize: "17px",
            "&.Mui-disabled": {
              background: "#949fcf",
              color: "#c0c0c0",
            },
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress sx={{ color: "white" }} size={"1rem"} />
          ) : (
            " Continue Book"
          )}
        </Button>
      </CustomizedBox>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Continue Booking
            </Typography>
            <Button
              sx={{ ":hover": { backgroundColor: "unset" } }}
              onClick={handleClose}
            >
              <HighlightOffIcon sx={{ color: red[600] }} />
            </Button>
          </Box>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, color: theme.palette.Blue.main }}
          >
            You need to log in to continue with your booking. Please log in or
            sign up for prooceed.
            <Typography></Typography>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#3252DF" }}
              >
                Login?
              </Link>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "#3252DF" }}
              >
                Sign Up?
              </Link>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
