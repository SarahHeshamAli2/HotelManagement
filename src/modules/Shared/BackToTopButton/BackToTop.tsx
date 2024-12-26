import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';

const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.scrollY > 300) { // Show button after scrolling 300px
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box>
      {visible && (
        <Button
          onClick={scrollToTop}
          sx={{
            width:'3.5rem',
            height:'3.5rem',
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#3252DF',
            color: '#fff',
            borderRadius: '50%',
            boxShadow: 3,
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
            zIndex:'9999999999999'
          }}
        >
          <ArrowUpward />
        </Button>
      )}
    </Box>
  );
};

export default BackToTopButton;