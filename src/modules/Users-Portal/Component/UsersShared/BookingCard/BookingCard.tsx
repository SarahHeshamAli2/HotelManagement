import { Box, Button, Typography } from "@mui/material";
import { styled, ThemeProvider } from "@mui/system";
import CalendarBooking from "../CalendarBooking/CalendarBooking";
import { theme } from "../../../../../helperStyles/helperStyles";

const CustomizedBox = styled(Box)(({ theme }) => ({
  color: theme.palette.Grey2.main,
  padding: theme.spacing(6),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.Grey.main}`,
  textAlign:'start'
}));

export default function BookingCard() {
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
        <Typography sx={{ color: theme.palette.error.main }}>
          Discount 20% off
        </Typography>
        calender
        <Button  sx={{
            marginBlock: "1rem",
            backgroundColor: "#3252DF",
            width: { xs: "95%", sm: "80%" },
            height: "3rem",
            borderRadius: "0.25rem",
            textTransform: "none",
            color: "#fff",
            fontSize: "17px",
            "&.Mui-disabled": {
              background: "#949fcf",
              color: "#c0c0c0",
            },
          }}>Continue Book</Button>
      </CustomizedBox>
    </ThemeProvider>
  );
}
