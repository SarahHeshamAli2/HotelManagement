import { Popover } from "@mui/material";
import { DateRangePicker } from "react-date-range";
import dayjs from "dayjs";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

interface DatePickerProps {
  dateRange: { startDate: Date | null; endDate: Date | null };
  setDateRange: React.Dispatch<
    React.SetStateAction<{ startDate: Date | null; endDate: Date | null }>
  >;
  error: string;
  setError: (error: string) => void;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export default function DatePicker({
  dateRange,
  setDateRange,
  error,
  setError,
  anchorEl,
  onClose,
}: DatePickerProps) {
  const open = Boolean(anchorEl);

  const handleDateChange = (ranges: any) => {
    const { selection } = ranges;
    setDateRange({
      startDate: selection.startDate,
      endDate: selection.endDate,
    });
    setError("");
    onClose();
  };

  return (
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
  );
}
