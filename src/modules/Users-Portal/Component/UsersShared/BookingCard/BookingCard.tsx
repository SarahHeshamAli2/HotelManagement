import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

const CustomizedBox = styled(Box)(({ theme }) => ({
  color: theme.palette.Grey.main,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.Grey.main}`,
}));

export default function BookingCard() {
  return (
    <CustomizedBox>
      <Typography>Start Booking</Typography>
      <Typography><Box>$280</Box>per night</Typography>
      <Typography>Discount 20% off</Typography>
       bookingCalinder
       <Button>Continue Book</Button>
    </CustomizedBox>
  );
}
