import { Box } from '@mui/material';

interface BadgeProps {
	children: React.ReactNode;
	width: string;
}

const ImageBadge = ({ children, width }: BadgeProps) => {
	return (
		<Box
			sx={{
				width,
				position: 'absolute',
				top: 0,
				right: 0,
				bgcolor: '#FF498B',
				textAlign: 'center',
				borderBottomLeftRadius: '15px',
				borderTopRightRadius: '15px',
				paddingBlock: '10px',
			}}
		>
			{children}
		</Box>
	);
};

export default ImageBadge;
