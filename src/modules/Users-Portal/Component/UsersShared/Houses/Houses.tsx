import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import img1 from "../../../../../assets/images/home-1.png";
import img2 from "../../../../../assets/images/home-2.png";
import img3 from "../../../../../assets/images/home-3.png";
import img4 from "../../../../../assets/images/home-4.jpg";
import img5 from "../../../../../assets/images/home-5.jpg";
import img6 from "../../../../../assets/images/home-6.jpg";
import CardItem from "../Items/Items";
import { useTranslation } from "react-i18next";  // Import the useTranslation hook

const imageData = [
  {
    img: img1,
    titleKey: "houses.tabby_town", // translation key for title
    locationKey: "houses.gunung_batu", // translation key for location
    label: "houses.popular_choice", // translation key for label
  },
  {
    img: img2,
    titleKey: "houses.anggana",
    locationKey: "houses.bogor",
  },
  {
    img: img3,
    titleKey: "houses.seattle_rain",
    locationKey: "houses.jakarta",
  },
  {
    img: img4,
    titleKey: "houses.wooden_pit",
    locationKey: "houses.wonosobo",
  },
  {
    img: img5,
    titleKey: "houses.sunset_resort",
    locationKey: "houses.bali",
    label: "houses.popular_choice",
  },
  {
    img: img6,
    titleKey: "houses.anggana",
    locationKey: "houses.bali",
  },
];

export default function Houses() {
  const { t } = useTranslation(); 
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1700);

    return () => clearTimeout(timer);
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 1500,
    cssEase: "linear",
    dots: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <Box sx={{ padding: "20px 0" }}>
      {loading ? (
        <Skeleton
          variant="text"
          width="200px"
          height="40px"
          sx={{ marginLeft: "0.5rem" }}
        />
      ) : (
        <Typography
          variant="body1"
          component="h2"
          sx={{
            fontWeight: "500",
            fontSize: "1.5rem",
            marginBottom: "20px",
            color: "#152C5B",
          }}
        >
          {t("houses.title")}
        </Typography>
      )}

      <Box className="slider-container" sx={{ overflow: "hidden" }}>
        {loading ? (
          <Slider {...settings}>
            {Array.from(new Array(4)).map((_, index) => (
              <Box key={index} sx={{ padding: "0 10px" }}>
                <Skeleton
                  variant="rectangular"
                  width="263px"
                  height="180px"
                  animation="wave"
                />
                <Skeleton variant="text" width="50px" animation="wave" />
                <Skeleton variant="text" width="70px" animation="wave" />
              </Box>
            ))}
          </Slider>
        ) : (
          <Slider {...settings}>
            {imageData.map((item, index) => (
              <CardItem
                key={index}
                img={item.img}
                title={t(item.titleKey)} // Use t() for title translation
                location={t(item.locationKey)} // Use t() for location translation
                label={item.label ? t(item.label) : undefined} // Optional label translation
              />
            ))}
          </Slider>
        )}
      </Box>
    </Box>
  );
}
