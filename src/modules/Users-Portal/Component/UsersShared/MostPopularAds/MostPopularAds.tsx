import { Box, Typography } from '@mui/material';
import { Ads_URLS, axiosInstance } from '../../../../../services/urls';
import ImageBadge from '../../../../Shared/ImageBadge/ImageBadge';

const MostPopularAds = () => {
	const getRecentAds = async () => {
		const response = await axiosInstance.get(Ads_URLS.getAllAds);
		const adsArr = response.data.data.ads;
		const recentAds = adsArr
			.filter((ad: { isActive: boolean }) => ad.isActive)
			.slice(0.5);
		console.log(recentAds);
	};
	getRecentAds();
	return (
		<Box
			sx={{
				width: '300px',
				height: '300px',
				bgcolor: 'red',
				position: 'relative',
				borderRadius: '15px',
			}}
		>
			<ImageBadge width='70%'>
				<Typography>$22 off</Typography>
			</ImageBadge>
		</Box>
	);
};

export default MostPopularAds;
