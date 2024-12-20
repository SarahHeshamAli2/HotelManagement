import { Box, Grid2, Typography } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import RegisterImg from "../../../../assets/bg-register.png";
import LoginImg from "../../../../assets/bg-login.png";
import ForgetImg from "../../../../assets/bg-forget.png";
import Logo from "../Logo/Logo";

const renderImg = (pathname: string) => {
  if (pathname === "/register") {
    return RegisterImg;
  } else if (pathname === "/login") {
    return LoginImg;
  } else {
    return ForgetImg;
  }
};
export default function AuthLayout() {
  const { pathname } = useLocation();

  return (
    <Grid2
      container
      spacing={2}
      sx={{ height: { sm: "100vh" } }}
      columns={{ xs: 6, sm: 12 }}
    >
      <Grid2
        size={6}
        sx={{
          height: { xs: "70%", sm: "100%" },
          top: "0",
        }}
      >
        <Logo />
        <Outlet />
      </Grid2>
      <Grid2
        size={6}
        sx={{
          height: { xs: "30%", sm: "100%" },
          position: { xs: "relative", sm: "fixed" },
          right: { sm: 0 },
          paddingLeft: { xs: "0.5rem", sm: "0" },
          marginX: { xs: "1.5rem", sm: "0" },
          borderRadius: "15%",
        }}
      >
        <Box
          component="img"
          src={renderImg(pathname)}
          sx={{
            width: "100%",
            height: { xs: "100%", sm: "auto" },
            minHeight: { xs: "30%", sm: "100%" },
            objectFit: "cover",
            borderRadius: { xs: "6%", sm: "0%" },
          }}
          alt="image"
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "auto",
            height: "100%",
            backgroundColor: "rgba(23, 33, 33, 0.15)",
            borderRadius: "3%",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: { xs: "50%", sm: "92%" },
            left: { xs: "55%", sm: "52%", md: "55%", lg: "45%" },
            width: { xs: "auto", md: "max-content", lg: "max-content" },
            transform: "translate(-60%,-50%)",
            color: "white",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: { xs: 700, sm: 600 },
              fontSize: { xs: "2.5rem", sm: "2.5rem" },
            }}
          >
            {pathname === "/register" && "Sign up to Roamhome"}
            {pathname === "/login" && "Sign in to Roamhome"}
            {pathname === "/forget-password" && "Forgot Password"}
            {pathname === "/reset-password" && "Reset Password"}
            {pathname === "/change-password" && "Change Password"}
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
