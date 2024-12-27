import { Box, Grid2, Stack, ThemeProvider, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { theme } from "../../../../helperStyles/helperStyles";
import {
  BathRoomIcon,
  BedRoomIcon,
  DiningRoomIcon,
  LivingRoomIcon,
  RefigratorIcon,
  TvIcon,
  UnitsIcon,
  WifiIcon,
} from "../../../Shared/Components/SvgIcons/SvgIcons";
import { useContext, useEffect, useState } from "react";
import { axiosInstance, USER_ROOMS_URLS } from "../../../../services/urls";
import { GetRoomResponse, Room } from "../../../../interfaces/RoomsInterfaces";
import { toast } from "react-toastify";
import roomImg1 from "../../../../assets/images/room-img1.png";
import roomImg2 from "../../../../assets/images/room-img2.png";
import roomImg3 from "../../../../assets/images/room-img3.png";
import BookingCard from "../../../Users-Portal/Component/UsersShared/BookingCard/BookingCard";
import UserPageTitle from "../../../Users-Portal/Component/UsersShared/UserPageTitle/UserPageTitle";
import CommentForm from "../../../Shared/Components/CommentForm/CommentForm";
import { styled } from "@mui/system";
import ReviewForm from "../../../Users-Portal/Component/ReviewForm/ReviewForm";
import { AuthContext } from "../../../../Context/Context";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  width: "90%",
  marginInline: "auto",
  border: "1px solid #E5E5E5",
  borderRadius: "15px",
  marginBottom: "2rem",
}));
const VerticalLine = styled(Box)(({ theme }) => ({
  width: "1px",
  backgroundColor: "#203FC7",
  margin: "0 10px",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  [theme.breakpoints.up("md")]: {
    display: "block",
  },
}));
export default function DetailsPage() {
  const { loginData } = useContext(AuthContext);
  let { roomId } = useParams<{ roomId: string }>();
  const [room, setRoom] = useState<Room>();
  const facilitiesData = [
    { icon: <BedRoomIcon />, number: 5, name: "bed room" },
    { icon: <LivingRoomIcon />, number: 1, name: "living room" },
    { icon: <BathRoomIcon />, number: 3, name: "bath room" },
    { icon: <DiningRoomIcon />, number: 1, name: "dining room" },
    { icon: <WifiIcon />, number: 10, name: "mbp/s" },
    { icon: <UnitsIcon />, number: 7, name: "unit ready" },
    { icon: <RefigratorIcon />, number: 2, name: "refrigrator" },
    { icon: <TvIcon />, number: 4, name: "television" },
  ];
  let ImgsStyles={
    borderRadius: '1rem',
    width:'100%',
    height:'100%'
  }

  useEffect(() => {
    const getRoom = async () => {
      try {
        const response = await axiosInstance.get<GetRoomResponse>(
          USER_ROOMS_URLS.getRoomDetails(roomId)
        );
        setRoom(response.data.data.room);
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message || "something went wrong");
      }
    };
    getRoom();
  }, [roomId]);
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          paddingBlock: { md: "3.125rem" },
          paddingInline: { md: "9.3rem" },
          textAlign: "center",
          width: "95%",
          marginInline: "auto",
        }}
      >
        {/*header */}
        <Box
          sx={{
            display: "flex",
            gap: "20rem",
            [theme.breakpoints.down("md")]: {
              display: "block",
            },
          }}
        >

          <UserPageTitle current="Room Details" />
          <Stack>
            <Typography
              sx={{ color: theme.palette.Blue.main, fontWeight: "bold" }}
              variant="h4"
              component="h1"
            >
              Village Angga
            </Typography>{" "}
            <Typography
              sx={{ color: theme.palette.Grey2.main }}
              variant="body1"
              component="h3"
            >
              Bogor, Indonesia
            </Typography>
          </Stack>
        </Box>

        {/*room info */}
        <Grid2
          container
          spacing={2}
          sx={{ marginBlock: "3.125rem", minHeight: "500px" }}
        >
          <Grid2
            size={{ sm: 12, md: 6 }}
            sx={{
              gridRow: "span 2",
            }}
          >
            {room?.images[0]?<img src={room?.images[0]} style={ImgsStyles}/> :<img src={roomImg1} style={ImgsStyles}/>}
          </Grid2>
          <Grid2 container spacing={2} size={{ sm: 12, md: 6 }}>
            {" "}
            <Grid2 size={12}>
              {room?.images[1]?<img src={room?.images[1]} style={ImgsStyles}/> :<img src={roomImg2} style={ImgsStyles}/>}
            </Grid2>
            <Grid2 size={12}>
              {room?.images[2]?<img src={room?.images[2]} style={ImgsStyles}/> :<img src={roomImg3} style={ImgsStyles}/>}
            </Grid2>
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2}>
          <Grid2 size={{ sm: 12, md: 6 }}>
            <Typography
              sx={{ textAlign: "start", color: theme.palette.Grey2.main }}
            >
              Minimal techno is a minimalist subgenre of techno music. It is
              characterized by a stripped-down aesthetic that exploits the use
              of repetition and understated development. Minimal techno is
              thought to have been originally developed in the early 1990s by
              Detroit-based producers Robert Hood and Daniel Bell.
              <br></br>
              Such trends saw the demise of the soul-infused techno that
              typified the original Detroit sound. Robert Hood has noted that he
              and Daniel Bell both realized something was missing from techno in
              the post-rave era.
              <br></br>
              Design is a plan or specification for the construction of an
              object or system or for the implementation of an activity or
              process, or the result of that plan or specification in the form
              of a prototype, product or process. The national agency for
              design: enabling Singapore to use design for economic growth and
              to make lives better.
            </Typography>
            <Box
              display="flex"
              gap="3.125rem"
              flexWrap="wrap"
              sx={{ marginBlockStart: "1.875rem" }}
            >
              {facilitiesData.map((facility) => (
                <Stack alignItems="center" key={facility.name}>
                  <Box width="100px">{facility.icon}</Box>
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.Grey2.main }}
                    component="span"
                  >
                    <Box
                      sx={{ color: theme.palette.Blue.main }}
                      component="span"
                    >
                      {facility.number}
                    </Box>{" "}
                    {facility.name}
                  </Typography>
                </Stack>
              ))}
            </Box>
          </Grid2>
          <Grid2 size={{ sm: 12, md: 6 }}>
            <BookingCard
              roomId={room?._id ?? ""}
              totalPrice={room?.price ?? 0}
            />
          </Grid2>
        </Grid2>
        <Box></Box>
      </Box>
      {loginData?.role === "user" ? (
        <StyledBox
          sx={{
            flexDirection: {
              xs: "column",
              lg: "row",
            },
            gap: {
              xs: "3rem",
              md: "2rem",
              lg: "5rem",
            },
            paddingX: {
              xs: "1rem",
              sm: "5.25rem",
            },
            paddingY: "35px",
          }}
        >
          <ReviewForm roomId={room?._id ?? ""} />
          <VerticalLine />
          <CommentForm roomId={room?._id ?? ""} />
        </StyledBox>
      ) : (
        ""
      )}
    </ThemeProvider>
  );
}
