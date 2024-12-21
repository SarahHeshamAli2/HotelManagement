/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../../../Context/Context";

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { logout, userName, profileImage }: any = useContext(AuthContext);

  const navigate = useNavigate();
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const getNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams), name: value });
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#F8F9FB",
        boxShadow: "none",
        borderRadius: "15px",
      }}
    >
      <Toolbar>
        {/* Search Input */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            padding: "0.2rem",
            paddingInline: "10px",
            borderRadius: "25px",
          }}
        >
          <SearchIcon sx={{ color: "gray", mr: 1 }} />
          <InputBase
            placeholder="Search here..."
            sx={{ flexGrow: 1 }}
            onChange={getNameValue}
            value={searchParams.get("name") || ""}
          />
        </Box>

        {/* User Avatar and Name */}
        <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
          <Avatar alt="User Photo" src={profileImage} />
          <Typography sx={{ ml: 1, color: "black" }}>{userName}</Typography>

          {/* Dropdown Menu Trigger */}
          <IconButton onClick={handleMenuClick}>
            <ArrowDropDownIcon sx={{ color: "#2F313F" }} />
          </IconButton>
        </Box>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>

        {/* Notifications Icon */}
        <IconButton sx={{ ml: 2 }}>
          <NotificationsIcon sx={{ color: "#2F313F" }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
