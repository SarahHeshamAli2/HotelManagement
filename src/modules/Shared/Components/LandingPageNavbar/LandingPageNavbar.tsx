import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Logo from "../Logo/Logo";
import { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AuthContext } from "../../../../Context/Context";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const anonymousMenuItems = ["Home", "Explore", "Register", "Login"];
const userMenuItems = ["Home", "Explore", "Reviews", "Favorites"];

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  "&.active": { color: "#3252DF" },
}));

export default function LandingPageNavbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { loginData, userName, profileImage, logout } = useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavLink = (item: string) => {
    const existItem = item.toLowerCase();
    console.log("Navigating to:", existItem);
    if (!existItem.includes("reviews")) {
      navigate(`/${existItem}`);
    } else {
      const element = document.getElementById(existItem);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    // handleClose();
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="static"
        component="nav"
        sx={{
          backgroundColor: "#fff",
          color: "#152C5B",
          boxShadow: "none",
          borderBottom: "1px solid #E5E5E5",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              paddingInlineStart: { xs: "0.1rem", lg: "8rem", md: "3rem" },
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <Logo />
          </Box>
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: "1rem" }}>
            {(loginData ? userMenuItems : anonymousMenuItems).map((item) => {
              const existItem = item === "Login" || item === "Register";
              const isActive =
                pathname === item.toLowerCase() ||
                (pathname === "/" && item.toLowerCase() === "home");
              return (
                <Button
                  key={item}
                  component={
                    item.toLowerCase() === "reviews" ? "div" : StyledNavLink
                  }
                  to={
                    item.toLowerCase() !== "reviews"
                      ? `/${item.toLowerCase()}`
                      : ""
                  }
                  onClick={() =>
                    item.toLowerCase() === "reviews" && handleNavLink(item)
                  }
                  className={isActive ? "active" : ""}
                  variant={existItem ? "contained" : "text"}
                  sx={{
                    color: existItem ? "#fff" : "inherit",
                    textTransform: "none",
                    backgroundColor: existItem ? "#3252DF" : "unset",
                    boxShadow: existItem
                      ? "0px 3px 7px rgba(50, 82, 223, 0.3)"
                      : "none",
                  }}
                >
                  {item === "Login" ? item + " Now" : item}
                </Button>
              );
            })}
          </Box>
          {loginData && (
            <Tooltip title="Open menu">
              <IconButton
                onClick={handleMenu}
                sx={{
                  p: 0,
                  gap: 1,
                  "&:hover": { backgroundColor: "unset", color: "#3252DF" },
                  paddingLeft: "1rem",
                  marginRight: { xs: "0rem", sm: "1rem" },
                  cursor: "pointer",
                }}
              >
                <Avatar alt={userName} src={profileImage} />
                <Typography variant="body2" component={"span"}>
                  {userName}
                </Typography>
                <KeyboardArrowDownIcon />
              </IconButton>
            </Tooltip>
          )}
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            {loginData === null && (
              <Tooltip title="Open menu">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            )}
            <Menu
              sx={{ mt: "40px" }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {(loginData ? userMenuItems : anonymousMenuItems).map((item) => (
                <MenuItem
                  key={item}
                  onClick={() => handleNavLink(item)}
                  sx={{
                    display: {
                      sm: loginData ? "none" : "flex",
                    },
                  }}
                >
                  {item}
                </MenuItem>
              ))}
              {loginData && (
                <>
                  <MenuItem onClick={() => navigate("/change-password")}>
                    Change password
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                  >
                    Logout
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
