import { Box, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import { red } from '@mui/material/colors';

interface OverlayProps {
	detailsPath: string;
	handleClick: () => void;
	isRed: boolean;
}

const Overlay = ({ detailsPath, handleClick, isRed }: OverlayProps) => {
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
			<IconButton color='primary' onClick={handleClick}>
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
		</Box>
	);
};

export default Overlay;
