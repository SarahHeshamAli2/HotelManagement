import { Box, Grid2, Typography } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import RegisterImg from "../../../../assets/bg-register.png";
import LoginImg from "../../../../assets/bg-login.png";
import ForgetImg from "../../../../assets/bg-forget.png";

export default function AuthLayout() {
  const { pathname } = useLocation();
  const renderImg = () => {
    if (pathname === "/register") {
      return RegisterImg;
    } else if (pathname === "/login") {
      return LoginImg;
    } else {
      return ForgetImg;
    }
  };
  return (
    <Grid2
      container
      spacing={2}
      height={{ sx: "auto", sm: "100vh" }}
      columns={{ xs: 6, sm: 12 }}
    >
      <Grid2 size={6} sx={{ height: { xs: "80%", sm: "100%" } }}>
        <Outlet />
      </Grid2>
      <Grid2
        size={6}
        sx={{
          height: { xs: "20%", sm: "155%", lg: "130%" },
          position: "relative",
          borderRadius: "15%",
          marginX: { xs: "1.5rem", sm: "0" },
          paddingLeft: { xs: "0.5rem", sm: "0" },
        }}
      >
        <Box
          component="img"
          src={renderImg()}
          sx={{
            width: "100%",
            height: { xs: "100%", sm: "auto" },
            minHeight: { xs: "30%", sm: "100%" },
            objectFit: "cover",
            borderRadius: { xs: "6%", sm: "0%" },
            backgroundColor: "rgba(23, 33, 33, 0.15)",
          }}
          alt="image"
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: { xs: "fit-content", sm: "100%" },
            height: "100%",
            backgroundColor: "rgba(23, 33, 33, 0.15)",
            borderRadius: "3%",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: { xs: "50%", sm: "70%" },
            left: { xs: "45%", sm: "52%", md: "50%", lg: "45%" },
            width: { xs: "auto", md: "max-content", lg: "max-content" },
            transform: "translate(-60%,-50%)",
            color: "white",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: { xs: 700, sm: 600 },
              fontSize: { xs: "2.3rem", sm: "2.5rem" },
            }}
          >
            {pathname === "/register" && "Sign up to Roamhome"}
            {pathname === "/login" && "Sign in to Roamhome"}
            {pathname === "/forget-password" && "Forgot Password"}
            {pathname === "/reset-password" && "Reset Password"}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1.3rem", sm: "1.25rem" },
            }}
          >
            Homes as unique as you.
          </Typography>
        </Box>
      </Grid2>
    </Grid2>
  );
}
