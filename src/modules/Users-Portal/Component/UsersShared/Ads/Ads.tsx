import { Box, Typography } from "@mui/material";

export default function Ads() {
  return (
    <Box>
      <Typography
				variant='body1'
				component='h2'
				sx={{
					fontWeight: '500',
					fontSize: '1.5rem',
					marginBottom: '20px',
					color: '#152C5B',
				}}
			>
				Ads
			</Typography>
    </Box>
  )
}
