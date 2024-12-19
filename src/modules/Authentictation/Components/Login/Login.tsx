import { Typography, Link, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AUTH_URLS, axiosInstance } from '../../../../services/urls';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../../Context/AuthContext';
import CustomInput from '../../../Shared/Components/CustomInput/CustomInput';
import CustomPasswordInput from '../../../Shared/Components/CustomPasswordInput/CustomPasswordInput';
import { getValidationRules } from '../../../../services/Validations';
import { User } from '../Registeration/Registeration';
import axios from 'axios';
import FormButton from '../../../Shared/Components/FormButton/FormButton';

interface LoginFormData extends User {
	email: string;
	password: string;
}

const Login = () => {
	const location = useLocation()
	const myLocation = location.state;

	const navigate = useNavigate();
	const { saveLoginData } = useContext(AuthContext);
	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
		watch,
	} = useForm<LoginFormData>({defaultValues : {email : myLocation? myLocation : ''}});
	const validationRules = getValidationRules(watch);

	const onSubmit = async (data: LoginFormData) => {
		try {
			const response = await axiosInstance.post(AUTH_URLS.login, data);
			localStorage.setItem('token', response?.data?.data?.token.split(' ')[1]);
			saveLoginData();
			toast.success('Login successful');
			navigate('/dashboard');
		} catch (error: unknown) {
			if(axios.isAxiosError(error)) {
				toast.error(error.response?.data?.message || 'Cannot Logged in');

			}
			console.log(error);

		}
	};

	return (
		<>
			<Box sx={{ mt: '5rem', ml: { md: '5rem', xs: '2rem' } }}>
				<Typography variant='h4'>Sign in</Typography>
				<Typography
					variant='body1'
					sx={{
						maxWidth: '310px',
						paddingTop: '1rem',
						wordSpacing: '1px',
						lineHeight: '1.6',
						marginBottom: '28px',
					}}
				>
					If you don’t have an account <br />
					You can{' '}
					<Link
						component={RouterLink}
						to={'/register'}
						sx={{ color: '#152C5B', fontWeight: '600', textDecoration: 'none' }}
					>
						Register here!
					</Link>
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box>
						<Box sx={{ mb: '2.8rem' }}>
							<CustomInput
								label='Email Address'
								type='email'
								register={register('email', validationRules.email)}
								isError={errors?.email}
								errorMessage={errors?.email?.message}
							/>
						</Box>
						<CustomPasswordInput
							label='Password'
							register={register('password', {
								required: 'please enter Password',
							})}
							isError={errors?.password}
							errorMessage={errors?.password?.message}
						/>
						<Box sx={{ display: 'flex', justifyContent: 'end' }}>
							<Link
								component={RouterLink}
								to={'/forget-password'}
								sx={{
									color: '#4D4D4D',
									textDecoration: 'none',
									mt: '12px',
									mr: '130px',
									mb: '90px',
								}}
							>
								Forgot Password ?
							</Link>
						</Box>

            <FormButton isSubmitting={isSubmitting} btnText='Login' />
					</Box>
				</form>
			</Box>
		</>
	);
};

export default Login;
