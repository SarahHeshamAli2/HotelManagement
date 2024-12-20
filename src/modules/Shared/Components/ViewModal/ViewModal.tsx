import {
	Box,
	Button,
	CircularProgress,
	Modal,
	Typography,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { red } from '@mui/material/colors';
import { useLocation } from 'react-router-dom';
import nodataImg from '../../../../assets/nodata.jpg';
import { formatDate } from '../../../../helperFunctions/helperFunctions';

interface Iprops {
	view: boolean;
	loading: boolean;
	closeView: () => void;
	viewData: unknown;
}

const ViewModal = ({ view, loading, closeView, viewData }: Iprops) => {
	console.log(viewData);
	const style = {
		position: 'absolute',
		top: '30%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 600,
		bgcolor: 'background.paper',
		borderRadius: '1rem',
		p: 4,
	};
	const { pathname } = useLocation();
	const handleClose = () => {
		closeView();
	};
	return (
		<div>
			<Modal
				aria-labelledby='unstyled-modal-title'
				aria-describedby='unstyled-modal-description'
				open={view}
				onClose={handleClose}
			>
				{loading ? (
					<CircularProgress
						sx={{
							color: 'blue',
							marginTop: '4rem',
							marginInline: 'auto',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							textAlign: 'center',
						}}
						size={'4rem'}
					/>
				) : (
					<Box sx={style}>
						<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<Typography id='modal-modal-title' variant='h5'>
								{pathname.includes('rooms')
									? 'Room '
									: pathname.includes('booking')
									? 'Booking '
									: pathname.includes('facilities')
									? 'Facility '
									: 'Ads '}
								Details
							</Typography>
							<Button
								sx={{ ':hover': { backgroundColor: 'unset' } }}
								onClick={handleClose}
							>
								<HighlightOffIcon sx={{ color: red[600] }} />
							</Button>
						</Box>
						<Box>
							{pathname.includes('rooms') ? (
								<Box sx={{ textAlign: 'center' }}>
									<img
										src={
											viewData?.room?.images[0]
												? viewData?.room?.images[0]
												: nodataImg
										}
										style={{
											width: '200px',
											height: '200px',
											borderRadius: '10px',
										}}
										alt='Room'
									/>

									<Typography variant='body1'>
										Room Number: {viewData?.room?.roomNumber}
									</Typography>
									<Typography variant='body1'>
										Capacity: {viewData?.room?.capacity}
									</Typography>
									<Typography variant='body1'>
										Discount: {viewData?.room?.discount}
									</Typography>
									<Typography variant='body1'>
										Price: {viewData?.room?.price}
									</Typography>
									<Typography variant='body1'>
										Facilities:{' '}
										{viewData?.room?.facilities?.map(
											(facility) => `${facility.name}, `
										)}
									</Typography>
								</Box>
							) : pathname.includes('booking') ? (
								<Box>
									<Typography variant='body1'>
										Price: {viewData?.booking?.totalPrice}
									</Typography>
									<Typography variant='body1'>
										Room Number: {viewData?.booking?.room?.roomNumber}
									</Typography>
									<Typography variant='body1'>
										Status: {viewData?.booking?.status}
									</Typography>
									<Typography variant='body1'>
										User: {viewData?.booking?.user?.userName}
									</Typography>
									<Typography variant='body1'>
										Start date: {formatDate(viewData?.booking?.startDate)}
									</Typography>
									<Typography variant='body1'>
										End date: {formatDate(viewData?.booking?.endDate)}
									</Typography>
								</Box>
							) : pathname.includes('facilities') ? (
								<>
									<Typography variant='body1'>
										Facility Name: {viewData?.facility?.name}
									</Typography>
								</>
							) : (
								<>
									<Typography variant='body1'>
										Active: {viewData?.ads?.isActive ? 'Yes' : 'No'}
									</Typography>
									<Typography variant='body1'>
										Active: {viewData?.ads?.room?.roomNumber}
									</Typography>
									<Typography variant='body1'>
										Capacity: {viewData?.ads?.room?.capacity}
									</Typography>
									<Typography variant='body1'>
										Price: {viewData?.ads?.room?.price}
									</Typography>
								</>
							)}
						</Box>
					</Box>
				)}
			</Modal>
		</div>
	);
};

export default ViewModal;
