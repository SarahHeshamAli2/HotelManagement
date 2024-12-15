import { Box, createTheme, ThemeProvider, Typography } from '@mui/material';

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
		<Box
			component='div'
			sx={{ mt: { md: '0.7rem' }, ml: { md: '3rem', xs: '2rem' } }}
		>
			<ThemeProvider theme={theme}>
				<Typography sx={{ fontWeight: 500 }} color='primary' variant='h5'>
					Stay<span style={{ color: 'black' }}>cation.</span>
				</Typography>
			</ThemeProvider>
		</Box>
	);
};

export default Logo;
