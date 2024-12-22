import { Box } from '@mui/material';

interface BadgeProps {
	text: React.ReactElement;
	width: string;
}

const ImageBadge = ({ text, width }: BadgeProps) => {
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
			{text}
		</Box>
	);
};

export default ImageBadge;
