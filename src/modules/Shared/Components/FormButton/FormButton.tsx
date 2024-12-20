import { Button, CircularProgress } from '@mui/material';

interface BtnProps {
  isSubmitting: boolean,
  btnText: string,

}

const FormButton = ({ isSubmitting, btnText }: BtnProps) => {
	return (
		<Button
			type='submit'
			variant='contained'
      disabled={isSubmitting}
			sx={{
				backgroundColor: '#3252DF',
				width: { xs: '95%', sm: '80%' },
			
				height: '3rem',
				borderRadius: '0.25rem',
				textTransform: 'none',
				fontSize: '17px',
				'&.Mui-disabled': {
					background: '#949fcf',
					color: '#c0c0c0',
				},
			}}
		>
			{isSubmitting ? (
				<CircularProgress sx={{ color: 'white' }} size={'1rem'} />
			) : (
				btnText
			)}
		</Button>
	);
};

export default FormButton;
