import { Box,Grid2 as Grid, Typography, } from '@mui/material';
import Footer from '../../../Shared/Components/Footer/Footer';
import UserPageTitle from '../../../Users-Portal/Component/UsersShared/UserPageTitle/UserPageTitle';

export default function ExplorePage() {
	return (
		<Box sx={{ width: "85%", margin: "auto", padding: "20px 0" }}>
      <Box>
        <Grid container alignItems="center">
          <Grid size={{ xs: 12, sm: 3 }}>
            <UserPageTitle current="Explore" />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} sx={{ textAlign: "center" }}>
            <Typography
              variant="h5"
              component={"h2"}
              sx={{
                fontWeight: "600",
                fontSize: "2.1rem",
                lineHeight: "0.5rem",
                color: "#152C5B",
                marginBlock: { xs: "0.5rem", sm: "1rem" },
              }}>
            </Typography>
          </Grid>
			<Footer />
			</Grid>
		</Box>
		</Box>
	);
}
