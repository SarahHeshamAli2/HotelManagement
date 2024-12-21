import { Box, Link, Stack, Typography } from '@mui/material';
import Logo from '../Logo/Logo';

const Footer = () => {
	const headerStyles = {
		marginBottom: '1.4375rem',
		color: '#152C5B',
		fontSize: '1.125rem',
	};
	const textStyles = {
		fontWeight: '300',
		color: '#B0B0B0',
		marginBottom: '8px',
	};

	return (
		<Box
			component='footer'
			sx={{
				// bgcolor: 'blue',
				paddingBlock: '50px',
				borderTop: '1px solid #E5E5E5',
			}}
		>
			<Stack
				direction={{ xs: 'column', md: 'row' }}
				spacing={{ xs: 3, md: 9 }}
				sx={{
					justifyContent: 'center',
					alignItems: { xs: 'center', md: 'normal' },
				}}
			>
				<Box>
					<Logo />
					<Typography sx={{ ...textStyles, mt: '8px' }}>
						We kaboom your beauty holiday
						<br /> instantly and memorable.
					</Typography>
				</Box>
				<Box>
					<Typography variant='h6' sx={headerStyles}>
						For Beginners
					</Typography>
					<Typography variant='body1' sx={textStyles}>
						<Link
							href='/register'
							sx={{
								textDecoration: 'none',
								cursor: 'pointer',
								color: '#B0B0B0',
							}}
						>
							New Account
						</Link>
					</Typography>
					<Typography variant='body1' sx={textStyles}>
						Start Booking a Room
					</Typography>
					<Typography variant='body1' sx={textStyles}>
						Use Payments
					</Typography>
				</Box>
				<Box>
					<Typography variant='h6' sx={headerStyles}>
						Explore Us
					</Typography>
					<Typography variant='body1' sx={textStyles}>
						Our Careers
					</Typography>
					<Typography variant='body1' sx={textStyles}>
						Privacy
					</Typography>
					<Typography variant='body1' sx={textStyles}>
						Terms & Conditions
					</Typography>
				</Box>
				<Box>
					<Typography variant='h6' sx={headerStyles}>
						Contact Us
					</Typography>
					<Typography sx={textStyles}>support@staycation.id</Typography>
					<Typography sx={textStyles}>021 - 2208 - 1996</Typography>
					<Typography sx={textStyles}>Staycation, Kemang, Jakarta</Typography>
				</Box>
			</Stack>
			<Box sx={{ textAlign: 'center', mt: '50px', ...textStyles }}>
				Copyright 2019 • All rights reserved • Staycation
			</Box>
		</Box>
	);
};

export default Footer;
