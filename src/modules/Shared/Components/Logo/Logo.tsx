import { createTheme, ThemeProvider, Typography } from '@mui/material';

const Logo = () => {
	const theme = createTheme({
		palette: {
			primary: {
				main: '#3252DF',
			},
			secondary: {
				main: '#f44336',
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Typography sx={{ fontWeight: 500 }} color='primary' variant='h5'>
				Stay<span style={{ color: 'black' }}>cation.</span>
			</Typography>
		</ThemeProvider>
	);
};

export default Logo;
