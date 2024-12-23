import { Box, createTheme, IconButton, ThemeProvider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';

interface Iprops {
	detailsPath: string;
	handleClick: () => void;
}

const Overlay = ({ detailsPath, handleClick }: Iprops) => {
	const theme = createTheme({
		palette: {
			primary: {
				main: '#fff',
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
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
					<FavoriteIcon fontSize='large' />
				</IconButton>

				<Link to={detailsPath}>
					<IconButton color='primary'>
						<VisibilityIcon fontSize='large' />
					</IconButton>
				</Link>
			</Box>
		</ThemeProvider>
	);
};

export default Overlay;
