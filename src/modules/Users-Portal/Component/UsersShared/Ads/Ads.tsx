import { Box, Skeleton, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import UseRecentAds from '../../../../../hooks/UseRecentAds';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { ad } from '../../../../../services/interfaces';
import ImageBadge from '../../../../Shared/ImageBadge/ImageBadge';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const settings = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  speed: 1500,
  autoplaySpeed: 1500,
  cssEase: 'linear',
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

const Ads = () => {
  const { t, i18n } = useTranslation(); 
  const { ads, triggerAds } = UseRecentAds();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1700);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    triggerAds();
  }, []);



  return (
    <Box>
      {loading ? (
        <Skeleton
          variant="text"
          width="200px"
          height="40px"
          sx={{ marginLeft: '0.5rem' }}
        />
      ) : (
        <Typography
          variant="body1"
          component="h2"
          sx={{
            fontWeight: '500',
            fontSize: '1.5rem',
            marginBottom: '20px',
            color: '#152C5B',
          }}
        >
          {t('ads')} 
        </Typography>
      )}

     

      <Box className="slider-container" sx={{ overflow: 'hidden' }}>
        {loading ? (
          <Slider {...settings}>
            {Array.from(new Array(ads?.length)).map((_, index) => (
              <Box key={index} sx={{ padding: '0 10px' }}>
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
            {ads?.map((ad: ad) => (
              <div
                style={{
                  display: 'inline-block',
                  width: '15%',
                  marginRight: '20px',
                }}
                key={ad._id}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '90%',
                  }}
                  key={ad._id}
                >
                  <img
                    src={ad.room.images[0]}
                    alt="room-img"
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '180px',
                      borderRadius: '15px',
                    }}
                  />
                  <ImageBadge width="60%">
                    <Typography sx={{ color: '#fff', fontWeight: '300' }}>
                      <span style={{ fontWeight: '500' }}>
                        {ad.room.discount}%           {t('off')} 

                      </span>
                    </Typography>
                  </ImageBadge>
                  <Box sx={{ marginTop: '16px' }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: '400',
                        color: '#152C5B',
                        fontSize: '20px',
                      }}
                    >
                      {t('ps_wood')} 
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      sx={{ color: '#B0B0B0', fontWeight: '300' }}
                    >
                      {t('depok_indonesia')} 
                    </Typography>
                  </Box>
                </Box>
              </div>
            ))}
          </Slider>
        )}
      </Box>
    </Box>
  );
};

export default Ads;
