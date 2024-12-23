import { CalendarMonth} from "@mui/icons-material";
import {
  Box,
  Button,
  Popover,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import img from "../../../../../assets/images/banner.png";
import { axiosInstance, getRoomDetails } from "../../../../../services/urls";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import CapacitySelector from "../CalendarBooking/CapacitySelector/CapacitySelector"; 

interface DateRange {
  startDate?: Date | null;
  endDate?: Date | null;
}

export default function CalendarBooking() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [dateRange, setDateRange] = useState<DateRange>({});
  const [count, setCount] = useState(1);
  const [error, setError] = useState<string>("");

  const handleButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (ranges: any) => {
    const { selection } = ranges;
    setDateRange({
      startDate: selection.startDate,
      endDate: selection.endDate,
    });
    setError("");
    handlePopoverClose();
  };

  const getRooms = async () => {
    if (!dateRange.startDate || !dateRange.endDate) {
      setError("Please pick a start and end date.");
      return;
    }

    try {
      const { startDate, endDate } = dateRange;

      const response = await axiosInstance.get(getRoomDetails, {
        params: {
          startDate: dayjs(startDate).format("YYYY-MM-DD"),
          endDate: dayjs(endDate).format("YYYY-MM-DD"),
        },
      });

      console.log(dateRange);
      console.log(response.data.data.rooms);

      navigate("/explore");
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.message);
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: "700",
              fontSize: { xs: "1.5rem", sm: "2.625rem" },
              marginBottom: ".2rem",
              color: "#152C5B",
              lineHeight: "1.2",
            }}
          >
            Forget Busy Work,
            <br />
            Start Next Vacation
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "300",
              fontSize: "1rem",
              marginBottom: "1.5rem",
              color: "#B0B0B0",
              lineHeight: "1.7rem",
            }}
          >
            We provide what you need to enjoy your holiday with family.
            <br /> Time to make another memorable moment.
          </Typography>
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "600",
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                marginBottom: "0.1rem",
                color: "#152C5B",
                lineHeight: "1.875rem",
                mb: "1rem",
              }}
            >
              Start Booking
            </Typography>
            <Button
              sx={{
                padding: "15px 20px",
                borderRadius: "12px",
                mr: "10px",
              }}
              onClick={handleButtonClick}
              variant="contained"
              color="primary"
            >
              <CalendarMonth />
            </Button>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <DateRangePicker
                ranges={[
                  {
                    startDate: dateRange.startDate || dayjs().toDate(),
                    endDate: dateRange.endDate || dayjs().toDate(),
                    key: "selection",
                  },
                ]}
                onChange={handleDateChange}
                minDate={dayjs().toDate()}
              />
            </Popover>
            <TextField
              onClick={handleButtonClick}
              label="Pick a Date"
              value={
                dateRange.startDate && dateRange.endDate
                  ? `${dayjs(dateRange.startDate).format(
                      "YYYY-MM-DD"
                    )} - ${dayjs(dateRange.endDate).format("YYYY-MM-DD")}`
                  : "Pick a Start & End Date"
              }
              error={Boolean(error)}
            />
            {error && (
              <FormHelperText error sx={{ ml: "5rem" }}>
                {error}
              </FormHelperText>
            )}
            <CapacitySelector
              initialCount={count}
              onChange={(newCount) => setCount(newCount)}
            />
            <Button
              sx={{
                mt: "2rem",
                backgroundColor: "#3252DF",
                color: "white",
                paddingBlock: "1rem",
                paddingInline: "5rem",
              }}
              onClick={getRooms}
            >
              Explore
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              width: { xs: "90%", sm: "80%" },
              height: { xs: "490px", sm: "490px" },
              border: "2px solid #E5E5E5",
              borderRadius: "15px",
              position: "relative",
              marginTop: { xs: "6rem", sm: "2.5rem" },
              marginInline: { xs: "2.5rem" },
            }}
          >
            <img
              src={img}
              style={{
                width: "130%",
                height: "100%",
                borderRadius: "105px 20px 20px 20px",
                position: "absolute",
                bottom: "40px",
                right: "40px",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
