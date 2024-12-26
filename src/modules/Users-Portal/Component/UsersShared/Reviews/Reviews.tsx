import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Rating, Typography } from "@mui/material";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import StarIcon from "@mui/icons-material/Star";
import img1 from "../../../../../assets/images/reviewImg.png";
import img2 from "../../../../../assets/images/review2.jpg";
import { css, styled } from "@mui/system";
import { useRef } from "react";

const reviewData = [
  {
    img: img1,
    title: "Happy Family",
    rate: (
      <Rating
        name="text-feedback"
        value={5}
        readOnly
        precision={0.5}
        size="large"
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    ),
    comment:
      "What a great trip with my family and I should try again next time soon ...",
    person: "Angga, Product Designer",
  },
  {
    img: img2,
    title: "Amazing Journey",
    rate: (
      <Rating
        name="text-feedback"
        value={4.5}
        readOnly
        precision={0.5}
        size="large"
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    ),
    comment:
      "An amazing journey that I had with my family and I should try again next time soon ...",
    person: "Andi, Product Designer",
  },
  {
    img: img1,
    title: "Wonderful Place",
    rate: (
      <Rating
        name="text-feedback"
        value={4}
        readOnly
        precision={0.5}
        size="large"
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    ),
    comment: "This place is amazing, I should try again next time soon ...",
    person: "Maria, Software Engineer",
  },
  {
    img: img2,
    title: "Beautiful Place",
    rate: (
      <Rating
        name="text-feedback"
        value={5}
        readOnly
        precision={0.5}
        size="large"
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    ),
    comment: "This place is beautiful, I should try again next time soon ...",
    person: "Andi, Marketing Manager",
  },
];

const Reviews = () => {
  const sliderRef = useRef<Slider>(null);
  const next = () => {
    sliderRef.current?.slickNext();
  };
  const prev = () => {
    sliderRef.current?.slickPrev();
  };
  const settings: Settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingBottom: "50px",
      }}
      id="reviews"
    >
      <Slider {...settings} ref={sliderRef}>
        {reviewData.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex !important",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              gap: {
                xs: "0px",
                sm: "80px",
              },
              height: {
                xs: "auto",
                md: "820px",
              },

              alignItems: {
                xs: "center",
              },
            }}
          >
            {/* ************* Left Side ************* */}
            <Box
              sx={{
                display: "flex !important",
                flexDirection: "column !important",
              }}
            >
              <StyledImgBox
                sx={{
                  width: { xs: "240px", sm: "356px", lg: "450px" },
                  height: { xs: "30rem", sm: "33.8rem", lg: "32.8rem" },
                  marginTop: { xs: "6rem", sm: "2.5rem" },
                  marginInline: { xs: "2.5rem", sm: "0rem" },
                }}
              >
                <Box
                  component={"img"}
                  src={item.img}
                  sx={{
                    width: {
                      xs: "240px",
                      sm: "356px",
                      lg: "450px",
                    },
                    height: {
                      xs: "490px",
                      sm: "560px",
                      lg: "550px",
                    },
                    borderRadius: "15px 15px 100px 15px",
                    position: "absolute",
                    top: "40px",
                    left: {
                      xs: "20px",
                      sm: "40px",
                    },
                    zIndex: 10,
                  }}
                />
              </StyledImgBox>
            </Box>
            {/* ************* Right Side ************* */}
            <StyledBoxContent
              sx={{
                paddingInline: {
                  xs: "2rem",
                  sm: "0rem",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "500", fontSize: "24px", color: "#152C5B" }}
              >
                {item.title}
              </Typography>

              <Box>
                <Box
                  sx={{
                    textAlign: {
                      xs: "center",
                      md: "start",
                    },
                  }}
                >
                  {item.rate}
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    maxWidth: "595px",
                    fontSize: {
                      xs: "20px",
                      sm: "32px",
                    },
                    color: "#152C5B",
                    paddingTop: "8px",
                  }}
                >
                  {item.comment}
                </Typography>
                <StyledPersonText variant="body2">
                  {item.person}
                </StyledPersonText>
              </Box>
              <StyledArrowBox>
                <ArrowCircleLeftOutlinedIcon
                  onClick={prev}
                  sx={{
                    color: "#203FC7",
                    display: "flex",
                    zIndex: 10,
                    cursor: "pointer",
                    fontSize: "57px",
                  }}
                />
                <ArrowCircleRightOutlinedIcon
                  onClick={next}
                  sx={{
                    color: "#203FC7",
                    display: "flex",
                    zIndex: 10,
                    cursor: "pointer",
                    fontSize: "57px",
                  }}
                />
              </StyledArrowBox>
            </StyledBoxContent>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Reviews;

const StyledBoxContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  paddingTop: "7.9rem",
  [theme.breakpoints.between("xs", "md")]: {
    textAlign: "center",
  },
  [theme.breakpoints.down("md")]: {
    alignItems: "center",
  },
}));
const StyledImgBox = styled(Box)(() => ({
  border: "2px solid #E5E5E5",
  borderRadius: "15px",
  position: "relative",
  zIndex: 0,
}));
const StyledArrowBox = styled(Box)(() => ({
  display: "flex",
  gap: "60px",
  marginTop: "10px",
}));

const StyledPersonText = styled(Typography)(() => ({
  color: "#B0B0B0",
  paddingTop: "8px",
  fontWeight: "400",
  fontSize: "18px",
}));
