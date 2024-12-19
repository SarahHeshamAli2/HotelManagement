import { Box, Button, Modal, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { red } from '@mui/material/colors';
import { useLocation } from 'react-router-dom';

interface Iprops {
	view: boolean;
	closeView: () => void;
}

const ViewModal = ({ view, closeView }: Iprops) => {
	// const [open, setOpen] = useState(true);
	console.log(open);
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
	// const handleOpen = () => setOpen(true);
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
					{/* <div>{children}</div> */}
				</Box>
			</Modal>
		</div>
	);
};

export default ViewModal;


// const [viewId, setViewId] = useState<string>('');
//   const [view, setView] = useState(false);
// const handleView = (id: string) => {
//   setViewId(id);
//   setView(true);
//   console.log(view);
// };

// const viewRoom = useCallback(async () => {
//   const response = await axiosInstance.get(
//     ROOMS_URLS.getRoomDetails(viewId)
//   );
//   console.log(response?.data?.data);
//   return response?.data?.data;
// }, [viewId]);

// useEffect(() => {
//   viewRoom();
// }, [viewRoom]);