import React from "react";
import paymentImg from "../../assets/images/payment.svg";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/system";
import { AppBar, Grid2 } from "@mui/material";
import Logo from "../Shared/Components/Logo/Logo";

export default function BookingPage() {
  return (
    <Box sx={{height:'100vh' , display:'flex' ,flexDirection:'column', alignItems:'center'}}>
            <AppBar
        position="static"
        component="nav"
        sx={{
          backgroundColor: "#fff",
          color: "#152C5B",
          boxShadow: "none",
          borderBottom: "1px solid #E5E5E5",
          display:'flex',
         alignItems:'center',
         paddingBlock:'1rem'
        }}
      >
        <Logo/>
      </AppBar>
      <Box sx={{ width: "85%", margin: "auto", padding: "20px 0" }}>
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <img src={paymentImg} style={{ width: "100%" }}></img>
          </Grid2>
          <Grid2 size={6}>
            <Outlet />
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}
