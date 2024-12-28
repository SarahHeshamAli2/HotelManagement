import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import { red } from '@mui/material/colors';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useContext, useState } from 'react';
import { theme } from '../../../helperStyles/helperStyles';
import { AuthContext } from '../../../Context/Context';

interface OverlayProps {
	detailsPath: string;
	handleClick: () => void;
	isRed: boolean;
}

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "none",
	borderRadius: "1rem",
	boxShadow: 24,
	p: 4,
  };



const Overlay = ({ detailsPath, handleClick, isRed }: OverlayProps) => {
	const{loginData}= useContext(AuthContext)

	  const [open, setOpen] = useState(false);
	  const handleOpen = () => setOpen(true);
	  const handleClose = () => setOpen(false);
	return (
		<Box
			className='overlay'
			sx={{
				position: 'absolute',
				width: '100%',
				height: '100%',
				top: 0,
				left: 0,
				bgcolor: '#203FC736',
				borderRadius: '15px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				opacity: 0,
				transition: 'opacity 0.3s ease',
			}}
		>
			<IconButton color='primary' onClick={  localStorage.getItem('token') ? handleClick : handleOpen
			
			}>
				<FavoriteIcon
					sx={{ color: isRed ? red[800] : '#fff' }}
					fontSize='large'
					
				/>
			</IconButton>

			<Link to={detailsPath}>
				<IconButton color='primary'>
					<VisibilityIcon sx={{ color: '#fff' }} fontSize='large' />
				</IconButton>
			</Link>


			<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
			Oops! You need to be logged in to add items to your favorites. <FavoriteIcon sx={{color:red[800]}}/>
            </Typography>
            <Button
              sx={{ ":hover": { backgroundColor: "unset" } }}
              onClick={handleClose}
            >
              <HighlightOffIcon sx={{ color: red[600] }} />
            </Button>
          </Box>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, color: theme.palette.Blue.main }}
          >
           
            <Typography></Typography>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#3252DF" }}
              >
                Login?
              </Link>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "#3252DF" }}
              >
                Sign Up?
              </Link>
            </Box>
          </Typography>
        </Box>
      </Modal>
		</Box>
	);
};

export default Overlay;
