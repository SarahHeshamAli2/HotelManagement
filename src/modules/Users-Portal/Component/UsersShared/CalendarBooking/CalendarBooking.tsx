import Grid from "@mui/material/Grid";
import { useState } from "react";

import img from "../../../../../assets/images/banner.png";
import DatePicker from "../CalendarBooking/DatePicker/DatePicker";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { axiosInstance, getRoomDetails } from "../../../../../services/urls";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function CalendarBooking() {
    const { t } = useTranslation();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const [count, setCount] = useState(1);

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
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

      navigate("/explore", {
        state: {
          startDate: dayjs(startDate).format("YYYY-MM-DD"),
          endDate: dayjs(endDate).format("YYYY-MM-DD"),
        },
      });
      
      
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
              textAlign:'start'
            }}
          >
           {t('hero_title')}
           <br/>
           {t('hero_title2')}
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
            {t('sub_title')}
            <br/>
            {t('sub_title2')}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "600",
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
              marginBottom: "0.1rem",
              color: "#152C5B",
              lineHeight: "1.875rem",
              mb: "1rem",
              textAlign:'start'
            }}
          >
            {t('start_book') }
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
          <Box sx={{ mt: "1.5rem", display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={handleDecrease}
              sx={{
                width: "3.5rem",
                backgroundColor: "#E74C3C",
                borderRadius: "4px 0px 0px 0px",
                "&:hover": {
                  backgroundColor: "#E74C3C",
                },
                mr: "1rem",
              }}
            >
              <Remove sx={{ color: "#fff" }} />
            </IconButton>
            <TextField
              sx={{ color: "#152C5B" }}
              label={t('capacity_title')}
              value={`${count} ${t('person_title')}`}
            />
            <IconButton
              onClick={handleIncrease}
              sx={{
                width: "3.5rem",
                backgroundColor: "#1ABC9C",
                borderRadius: "0px 4px 0px 0px",
                "&:hover": {
                  backgroundColor: "#1ABC9C",
                },
                ml: "1rem",
              }}
            >
              <Add sx={{ color: "white" }} />
            </IconButton>
          </Box>
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
            {t('explore_title')}
          </Button>
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
