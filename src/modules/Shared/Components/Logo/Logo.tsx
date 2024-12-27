import { createTheme, ThemeProvider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Logo = () => {
	const{t}=useTranslation()
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
				{t('logo_part1')}<span style={{ color: 'black' }}>{t('logo_part2')}</span>
			</Typography>
		</ThemeProvider>
	);
};

export default Logo;
