import { Box, Button, Modal, Typography } from "@mui/material";
import { borderRadius, styled, ThemeProvider } from "@mui/system";
import { theme } from "../../../../../helperStyles/helperStyles";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../../Context/Context";
import DatePicker from "../CalendarBooking/DatePicker/DatePicker";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { red } from "@mui/material/colors";

const CustomizedBox = styled(Box)(({ theme }) => ({
  color: theme.palette.Grey2.main,
  padding: theme.spacing(6),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.Grey.main}`,
  textAlign: "start",
}));
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius:'1rem',
  boxShadow: 24,
  p: 4,
};

export default function BookingCard({ roomId }: { roomId: string }) {
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
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleButtonClick =()=>{
    if(loginData?.role === "user" ){
      navigate(`/booking/${roomId}`);

    }
    else{
      handleOpen()
    }
  }
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
        <Typography sx={{ color: theme.palette.error.main ,marginBlockEnd:'7.875rem' }}>
          Discount 20% off
        </Typography>
        <Typography sx={{ color: theme.palette.Blue.main,marginBlockEnd:'0.5rem'  }}>
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
            }}
          >
            Continue Book
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
          <Typography id="modal-modal-description" sx={{ mt: 2 ,color:theme.palette.Blue.main}}>
            You need to log in to continue with your booking. Please log in or sign up for prooceed.
            <Typography></Typography>
           <Box sx={{display:'flex' , justifyContent:'space-between',mt: 2}}>
            <Link to ='/login' style={{textDecoration:'none',color:"#3252DF"}}>Login?</Link>
            <Link to ='/register' style={{textDecoration:'none',color:"#3252DF"}}>Sign Up?</Link>
           </Box>
          </Typography>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
