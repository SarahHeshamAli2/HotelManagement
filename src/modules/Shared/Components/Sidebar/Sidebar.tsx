/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import BookOnlineTwoToneIcon from "@mui/icons-material/BookOnlineTwoTone";
import PrecisionManufacturingTwoToneIcon from "@mui/icons-material/PrecisionManufacturingTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Box, IconButton } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthContext";

interface SidebarProps {
  onToggle: () => void;
  collapsed: boolean;
}

export default function SidebarComponent({
  onToggle,
  collapsed,
}: SidebarProps) {
  const { logout }: any = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current path

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Helper function to determine if the path is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar
      rootStyles={{
        height: "100vh",
      }}
    >
      <IconButton
        onClick={onToggle}
        sx={{
          transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
          transition: "all 0.3s",
          position: "absolute",
          right: collapsed ? "170px" : "5px",
          color: "white",
        }}
      >
        <DoubleArrowIcon />
      </IconButton>
      <Menu
        rootStyles={{
          paddingTop: "4rem",
          backgroundColor: "rgba(32, 63, 199, 1)",
          height: "100%",
        }}
      >
        <MenuItem
          component={<Link to="/dashboard" />}
          rootStyles={{
            backgroundColor: isActive("/dashboard") ? "rgba(0, 0, 0, 0.2)" : "transparent",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "0.5rem" : "1rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <HomeTwoToneIcon />
            {!collapsed && <span style={{ marginLeft: "1rem" }}>Home</span>}
          </Box>
        </MenuItem>

        <MenuItem
          component={<Link to="/users" />}
          rootStyles={{
            backgroundColor: isActive("/users") ? "rgba(0, 0, 0, 0.2)" : "transparent",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "0.5rem" : "1rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <PeopleAltTwoToneIcon />
            {!collapsed && <span style={{ marginLeft: "1rem" }}>Users</span>}
          </Box>
        </MenuItem>

        <MenuItem
          component={<Link to="/rooms" />}
          rootStyles={{
            backgroundColor: isActive("/rooms") ? "rgba(0, 0, 0, 0.2)" : "transparent",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "0.5rem" : "1rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <DashboardTwoToneIcon />
            {!collapsed && <span style={{ marginLeft: "1rem" }}>Rooms</span>}
          </Box>
        </MenuItem>

        <MenuItem
          component={<Link to="/advertisments" />}
          rootStyles={{
            backgroundColor: isActive("/advertisments") ? "rgba(0, 0, 0, 0.2)" : "transparent",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "0.5rem" : "1rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <CalendarMonthTwoToneIcon />
            {!collapsed && <span style={{ marginLeft: "1rem" }}>Ads</span>}
          </Box>
        </MenuItem>

        <MenuItem
          component={<Link to="/booking" />}
          rootStyles={{
            backgroundColor: isActive("/booking") ? "rgba(0, 0, 0, 0.2)" : "transparent",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "0.5rem" : "1rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <BookOnlineTwoToneIcon />
            {!collapsed && <span style={{ marginLeft: "1rem" }}>Bookings</span>}
          </Box>
        </MenuItem>

        <MenuItem
          component={<Link to="/facilities" />}
          rootStyles={{
            backgroundColor: isActive("/facilities") ? "rgba(0, 0, 0, 0.2)" : "transparent",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "0.5rem" : "1rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <PrecisionManufacturingTwoToneIcon />
            {!collapsed && <span style={{ marginLeft: "1rem" }}>Facilities</span>}
          </Box>
        </MenuItem>

        <MenuItem
          component={<Link to="/change-password" />}
          rootStyles={{
            backgroundColor: isActive("/change-password") ? "rgba(0, 0, 0, 0.2)" : "transparent",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "0.5rem" : "1rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <LockOpenTwoToneIcon />
            {!collapsed && <span style={{ marginLeft: "1rem" }}>Change Password</span>}
          </Box>
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "0.5rem" : "1rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <LogoutTwoToneIcon />
            {!collapsed && <span style={{ marginLeft: "1rem" }}>Logout</span>}
          </Box>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
