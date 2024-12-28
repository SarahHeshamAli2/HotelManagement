import { Box, Typography, Button} from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { useNavigate } from "react-router-dom";

// Component: BookingSuccess
const BookingSuccess = ({
  title = "Payment Successful!",
  message = "Your transaction has been completed successfully.",
  buttonText = "Back to Home",
  redirectPath = "/home",
}) => {
  const navigate = useNavigate();

  // Animations
  const bounceAnimation = useSpring({
    from: { transform: "scale(0)" },
    to: { transform: "scale(1)" },
    config: { tension: 120, friction: 10 },
  });

  const fadeAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay: 300,
  });

  return (
    <Box
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "75vh",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        padding: "20px",
        marginTop: "30px",
      }}
    >
      <animated.div style={bounceAnimation}>
        <Box
          sx={{
            width: "80px",
            height: "80px",
            backgroundColor: "#1ABC9C",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            sx={{
              fontSize: "40px",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            ✔
          </Typography>
        </Box>
      </animated.div>

      <animated.div style={fadeAnimation}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#333",
            marginBottom: "10px",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#555",
            marginBottom: "20px",
          }}
        >
          {message}
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate(redirectPath)}
          sx={{
            backgroundColor: "#1ABC9C",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          {buttonText}
        </Button>
      </animated.div>
    </Box>
  );
};

export default BookingSuccess;
