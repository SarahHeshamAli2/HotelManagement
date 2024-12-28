import { Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box, styled } from "@mui/system";
import { AddressElement, useElements } from "@stripe/react-stripe-js";
import { FormEvent } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const StyledBox = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: grey[100],
  padding: "1rem",
  height: "100%",
  width: "100%",
}));

export default function UserInfo() {
  const { roomId } = useParams();
  const navigte = useNavigate();
  const elements = useElements();
  const location = useLocation();
  const { bookingId } = location.state || {};
  console.log(bookingId);
  const handleButtonClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const addressElement = elements?.getElement("address");
      if (!addressElement) return;
      const value = await addressElement?.getValue();
      console.log(value);
      localStorage.setItem("name", value?.value.name);
      localStorage.setItem("country", value?.value.address.country);
      localStorage.setItem("city", value?.value.address.city);
      navigte(`/booking/${roomId}/payment-info`, { state: { bookingId } });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StyledBox>
      <form
        onSubmit={handleButtonClick}
        style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
      >
        <Box sx={{ marginBlockEnd: "2rem", textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h4"
            sx={{ marginBlockEnd: "0.5rem" }}
          >
            Payment
          </Typography>
          <Typography variant="body1" color="#3252DF">
            Kindly follow the instructions below
          </Typography>
        </Box>

        <AddressElement options={{ mode: "billing" }}></AddressElement>
        <Button
          type="submit"
          sx={{
            marginInline: "auto",
            backgroundColor: "#1ABC9C",
            width: { xs: "95%", md: "40%" },
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
          Next
        </Button>
      </form>
    </StyledBox>
  );
}
