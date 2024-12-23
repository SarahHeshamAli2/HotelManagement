import {
	Box,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	Typography,
} from '@mui/material';
import { Ads_URLS, axiosInstance, Favorites_URLS } from '../../../../../services/urls';
import { useEffect, useState } from 'react';
import ImageBadge from '../../../../Shared/ImageBadge/ImageBadge';
import Overlay from '../../../../Shared/Overlay/Overlay';
import { toast } from 'react-toastify';

const MostPopularAds = () => {
	const [ads, setAds] = useState([]);


const handleFavoriteClick = (id: string) => {
 axiosInstance.post(Favorites_URLS.Add_To_Fav,{
		"roomId":id
	  }).then((resp)=>{
		toast.success(resp?.data?.message)
		console.log(resp)
	  }).catch((error)=>{
		console.log(error)
		toast.error(error?.response?.data?.message || 'something went wrong')
	  })
}
	const getRecentAds = async () => {
		const response = await axiosInstance.get(Ads_URLS.getAllAds);
		const adsArr = response.data.data.ads;
		const recentAds = adsArr
			.filter((ad: { isActive: boolean }) => ad.isActive)
			.slice(0, 5);
		console.log(recentAds);
		setAds(recentAds);
	};
	useEffect(() => {
	
		getRecentAds();
	}, []);

	const imagesItems = ads?.map((ad: any, i: number) => (
		<ImageListItem
			sx={{
				borderRadius: '15px',
				position: 'relative',
				'&:hover .overlay': {
					opacity: 1,
				},
			}}
			key={ad._id}
			cols={1}
			rows={i === 0 ? 2 : 1}
		>
			<img
				style={{ borderRadius: '15px' }}
				src={ad.room.images[0]}
				alt='room-img'
				loading='lazy'
			/>
			<ImageListItemBar sx={{ bgcolor: 'transparent' }}></ImageListItemBar>
			<ImageBadge width='50%'>
				<Typography sx={{ color: '#fff', fontWeight: '300' }}>
					<span style={{ fontWeight: '500' }}>${ad.room.price}</span> per night
				</Typography>
			</ImageBadge>
			<Overlay handleClick={()=>{handleFavoriteClick(ad.room._id)}}  detailsPath={`/details/${ad.room._id}`} />
		</ImageListItem>
	));

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
				Most popular ads
			</Typography>
			<ImageList variant='quilted' cols={3} rowHeight={200} gap={30}>
				{imagesItems}
			</ImageList>
		</Box>
	);
};

export default MostPopularAds;
