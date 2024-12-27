import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Logo from "../Logo/Logo";
import { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AuthContext } from "../../../../Context/Context";
import { useLocation, useNavigate } from "react-router-dom";
import ToggleButtonLang from "../../../LangToggleBtn/LangToggleBtn";
import { useTranslation } from "react-i18next";

export default function LandingPageNavbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { loginData, userName, profileImage, logout } = useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const anonymousMenuItems = [
    t("landing_nav.home"),
    t("landing_nav.explore"),
    t("landing_nav.register"),
    t("landing_nav.login"),
  ];
  const userMenuItems = [
    t("landing_nav.home"),
    t("landing_nav.explore"),
    t("landing_nav.reviews"),
    t("landing_nav.favorite"),
  ];
  const adminMenuItem = [
    t("landing_nav.home"),
    t("landing_nav.explore"),
    t("landing_nav.reviews"),
  ];
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const localizationMap: { [key: string]: string } = {
    "استكشف معنا": "explore",
    المفضلة: "favorites",
    الرئيسية: "home",
    مراجعات: "reviews",
    تسجيل: "register",
    "تسجيل الدخول": "login",
  };

  const handleNavLink = (item: string) => {
    let existItem = item.toLowerCase();
    // Check if the item exists in the localization map
    if (localizationMap[existItem]) {
      existItem = localizationMap[existItem];
    }
    if (!existItem.includes("reviews")) {
      navigate(`/${existItem}`);
    } else {
      const element = document.getElementById(existItem);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    handleClose();
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
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: "1rem",
              alignItems: "center",
            }}
          >
            {(loginData && loginData?.role == "user"
              ? userMenuItems
              : loginData && loginData?.role == "admin"
              ? adminMenuItem
              : anonymousMenuItems
            ).map((item) => {
              const existItem = item === "Login" || item === "Register";

              const isActive =
                pathname === `/${item.toLowerCase()}` ||
                pathname === `/${localizationMap[item]}` ||
                (pathname === "/" && item.toLowerCase() === "home");

              return (
                <Button
                  key={item}
                  onClick={() => handleNavLink(item)}
                  variant={existItem ? "contained" : "text"}
                  sx={{
                    color:
                      existItem && !isActive
                        ? "#fff"
                        : isActive
                        ? "#3252DF"
                        : "inherit",
                    textTransform: "none",
                    backgroundColor: existItem ? "#3252DF" : "unset",
                    boxShadow: existItem
                      ? "0px 3px 7px rgba(50, 82, 223, 0.3)"
                      : "none",
                    height: "fit-content",
                  }}
                >
                  {item === "Login" ? item + " Now" : item}
                </Button>
              );
            })}
            {!loginData && (
              <Box sx={{ display: { xs: "none", sm: "flex" }, gap: "1rem" }}>
                <ToggleButtonLang />
              </Box>
            )}
          </Box>
          {loginData && (
            <>
              <Tooltip title="Open menu">
                <IconButton
                  onClick={handleMenu}
                  sx={{
                    p: 0,
                    gap: 1,
                    "&:hover": { backgroundColor: "unset", color: "#3252DF" },
                    paddingLeft: "1rem",
                    marginInline: { xs: "0rem", sm: "1rem" },
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
              <Box sx={{ display: { xs: "none", sm: "flex" }, gap: "1rem" }}>
                <ToggleButtonLang />
              </Box>
            </>
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

              {!loginData && (
                <MenuItem
                  sx={{
                    display: {
                      xs: "flex",
                      sm: "none",
                    },
                  }}
                >
                  <ToggleButtonLang />
                </MenuItem>
              )}
              {loginData && (
                <>
                  <MenuItem onClick={() => navigate("/change-password")}>
                    {t("landing_nav.changePassword")}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                  >
                    {t("landing_nav.logOut")}
                  </MenuItem>
                  <MenuItem
                    sx={{
                      display: {
                        xs: "flex",
                        sm: "none",
                      },
                    }}
                  >
                    <ToggleButtonLang />
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
