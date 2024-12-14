import { Box, Button, createTheme, ThemeProvider, Typography } from "@mui/material"
import {  red } from '@mui/material/colors';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { emailValidation } from "../../../../services/Validations";
import { AUTH_URLS, axiosInstance } from "../../../../services/urls";
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from "react-toastify";
import { ResetPasswordFormData } from "../../../../services/interfaces";
import PasswordInput from "../../../Shared/PasswordInput/PasswordInput";
const ResetPassword = () => {
  const location = useLocation();
  const myLocation = location.state
  console.log(myLocation);

  const navigate = useNavigate()

  const {formState:{errors,isSubmitting} , register , handleSubmit}= useForm<ResetPasswordFormData>({defaultValues:{email:myLocation}})

  const onSubmitHandler = async (data:ResetPasswordFormData) => {

   await axiosInstance.post(AUTH_URLS.forgetPassword,data).then((response)=>{
      console.log(response?.data?.message);
      toast.success(response?.data?.message || 'please check your email for OTP')
    navigate('/reset-password')
      
    }).catch((error)=>{
      console.log(error);
      toast.error(error?.response?.data?.message || 'something went wrong please try again')
      
    })
    
  }


const theme = createTheme({
  palette: {
    primary: {
      main: '#3252DF',
    },
    secondary: {
      main: '#f44336',
    },
 
 
  },
});
return <>

<Box component='div' sx={{ mt:{md:'0.7rem'},ml:{md:'3rem' , xs:'2rem'} } }>
  <ThemeProvider theme={theme}>
<Typography sx={{fontWeight:500}} color="primary" variant="h5">
  Stay<span style={{color:'black'}}>cation.</span>
</Typography>
</ThemeProvider>
</Box>


<Box  component='div' sx={{ml:{md:'7rem' , xs:'2rem'},mt:{md:'3.9rem' , xs:'2rem'}}}> 

<Typography component='h1' sx={{fontSize : '1.87rem'}}>

Reset Password
</Typography>

<Box  component='div' mt='22px'>
<Typography component='p'>
If you already have an account register
<Typography component='span' display={'block'} >
You can <Box ml={1} sx={{color:red[600]}} fontWeight={600} component={'span'}><Link className="formLinks" to='/login'>Login here !</Link></Box>
</Typography>
</Typography>
</Box>

<Box component='div' mt={'96px'}>
  <form onSubmit={handleSubmit(onSubmitHandler)} >


<Box component='div'>



<label htmlFor="email">Email</label>
    <input className="forgetPasswordInput"  type="text" id="email" placeholder="Please type here ..." {...register('email' , emailValidation)} />


    {errors.email && (
                        <Box color={red[600]}>{String(errors.email.message)}</Box>
                      )}
</Box>
<Box component='div' sx={{mt:'1rem'}}>



<label htmlFor="OTP">OTP</label>
    <input className="forgetPasswordInput"  type="text" id="OTP" placeholder="Please type here ..." {...register('seed' ,{required:'please enter OTP'})} />


    {errors.seed && (
                        <Box color={red[600]}>{String(errors.seed.message)}</Box>
                      )}
</Box>
<PasswordInput registerInput={register('password',{required:'please enter your password'})} />
{errors.password && (
                        <Box color={red[600]}>{String(errors.password.message)}</Box>
                      )}












    <Button disabled={isSubmitting} type="submit" sx={{mt: {md: '63px' , xs : '2rem'} , backgroundColor:'#3252DF' , color:'white' , width:'70%' , py:'0.8rem' , textTransform:'none' , "&.Mui-disabled": {
          background: '#949fcf',
          color: "#c0c0c0"
        }}}>
          {
            isSubmitting ?                 <CircularProgress sx={{color:'white'}} /> : 'Send mail'

          }

    </Button>
  </form>

</Box>
</Box>


</>
}

export default ResetPassword
