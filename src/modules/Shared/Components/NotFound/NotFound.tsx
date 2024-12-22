import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import NotFoundImage from "../../../../assets/images/notfound.jpg"
export default function NotFound() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "32px",
          textAlign: "left",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "72px",
            fontWeight: "bold",
            color: "#203FC7",
            marginBottom: "16px",
          }}
        >
          Oops!
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: "20px",
            color: "#555",
            marginBottom: "32px",
          }}
        >
          The page you are looking for doesn’t exist or has been moved.
        </Typography>
        <Button
          sx={{
            backgroundColor: "#203FC7",
            color: "#fff",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 700,
            padding: "12px 24px",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#1a3199",
            },
          }}
          variant="contained"
        >
          <Link
            to="/home"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Back to Home
          </Link>
        </Button>
      </Box>

      <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${NotFoundImage})`,
                    backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
        }}
      ></Box>
    </Box>
  );
}
