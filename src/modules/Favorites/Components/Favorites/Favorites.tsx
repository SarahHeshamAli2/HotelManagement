import { Box, Grid, Typography } from '@mui/material';
import Footer from '../../../Shared/Components/Footer/Footer';
import UserPageTitle from '../../../Users-Portal/Component/UsersShared/UserPageTitle/UserPageTitle';

export default function Favorites() {
	return (
		<Box sx={{ width: "85%", margin: "auto", paddingInline: "20px", paddingTop: "50px" }}>
		<Box>
		  <Grid container alignItems="center">
			<Grid item xs={12} sm={3}>
			  <UserPageTitle current="Favorites" />
			</Grid>
			<Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
			  <Typography variant="h5" component={"h2"} sx={{ fontWeight: "600", fontSize: "2.1rem", lineHeight: "0.5rem", color: "#152C5B", marginBlock: { xs: "0.5rem", sm: "1rem" } }}>
				Your Favorites
			  </Typography>
			</Grid>
			<Grid item xs={false} sm={3}></Grid>
		  </Grid>
		</Box>
			<Footer />
		</Box>
	);
}
