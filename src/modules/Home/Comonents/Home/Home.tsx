import { Box } from "@mui/material";
import CalendarBooking from "../../../Users-Portal/Component/UsersShared/CalendarBooking/CalendarBooking";
import MostPopularAds from "../../../Users-Portal/Component/UsersShared/MostPopularAds/MostPopularAds";
import Houses from "../../../Users-Portal/Component/UsersShared/Houses/Houses";
import Hotels from "../../../Users-Portal/Component/UsersShared/Hotels/Hotels";
import Ads from "../../../Users-Portal/Component/UsersShared/Ads/Ads";

export default function Home() {
  return (
    <Box>
      <CalendarBooking />
      <MostPopularAds />
      <Houses />
      <Hotels />
      <Ads />
    </Box>
  );
}
