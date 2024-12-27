import { CalendarMonth } from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import { Popover } from "@mui/material";
import { DateRangePicker } from "react-date-range";
import dayjs from "dayjs";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useState } from "react";
import { axiosInstance, getRoomDetails } from "../../../../../../services/urls";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface DatePickerProps {
  dateRange: { startDate: Date | null; endDate: Date | null };
  setDateRange: React.Dispatch<
    React.SetStateAction<{ startDate: Date | null; endDate: Date | null }>
  >;
  error: string;
  setError: (error: string) => void;
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  onClose: () => void;
}

export default function DatePicker({
  dateRange,
  setDateRange,
  error,
  setError,
  anchorEl,
  setAnchorEl,
  onClose,
}: DatePickerProps) {
  const open = Boolean(anchorEl);

  const handleDateChange = (ranges: any) => {
    const { selection } = ranges;
    const newDateRange ={
      startDate: selection.startDate,
      endDate: selection.endDate,
    };
   
    setDateRange(newDateRange)
    setError("");
    localStorage.setItem("dateRange", JSON.stringify(newDateRange));
    onClose();
  };
  const handleButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <Box>
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
        onClose={onClose}
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
            ? `${dayjs(dateRange.startDate).format("YYYY-MM-DD")} - ${dayjs(
                dateRange.endDate
              ).format("YYYY-MM-DD")}`
            : "Pick a Start & End Date"
        }
        error={Boolean(error)}
      />
      {error && (
        <FormHelperText error sx={{ ml: "5rem" }}>
          {error}
        </FormHelperText>
      )}
    </Box>
  );
}
