import { Box, Button, Stack, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";

const linkTo = (item: string) => {
  if (item === "Room") {
    return "new-room";
  } else if (item === "Facility") {
    return "new-facility";
  } else if (item === "Ads") {
    return "new-ads";
  } else {
    return "";
  }
};

const DashboardHeading = ({ item, label }: { item: string; label: string }) => {
  return (
    <Stack
      direction={"row"}
      justifyContent="space-between"
      alignItems="center"
      sx={{ px: "2rem", py: "1rem" }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "600",
          }}
        >
          {label} Table Details
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#323C47",
            fontSize: "14px",
          }}
        >
          You can check all details
        </Typography>
      </Box>
      <Button
        component={Link}
        to={linkTo(item)}
        sx={{
          backgroundColor: "#203FC7",
          color: "white",
          textTransform: "none",
          width: "14rem",
          height: "3rem",
          borderRadius: "0.5rem",
          gap: { xs: "0.3rem", md: "0" },
        }}
      >
        <Typography
          component={"span"}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          Add New&nbsp;
        </Typography>
        <AddCircleOutlineIcon sx={{ display: { xs: "block", md: "none" } }} />
        {item}
      </Button>
    </Stack>
  );
};

export default DashboardHeading;
