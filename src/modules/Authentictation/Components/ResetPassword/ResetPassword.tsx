import {
  Box,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getValidationRules } from "../../../../services/Validations";
import { AUTH_URLS, axiosInstance } from "../../../../services/urls";
import { toast } from "react-toastify";
import CustomPasswordInput from "../../../Shared/Components/CustomPasswordInput/CustomPasswordInput";
import { ResetPasswordFormData } from "../../../../services/interfaces";
import FormButton from "../../../Shared/Components/FormButton/FormButton";
const ResetPassword = () => {
  const location = useLocation();
  const myLocation = location.state;

  const navigate = useNavigate();

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    watch,
  } = useForm<ResetPasswordFormData>({ defaultValues: { email: myLocation } ,mode : "onChange"});
  const validationRules = getValidationRules(watch);

  const onSubmitHandler = async (data: ResetPasswordFormData) => {
    await axiosInstance
      .post(AUTH_URLS.resetPassword, data)
      .then((response) => {
        console.log(response?.data?.message);
        toast.success(
          response?.data?.message || "password reset successfully !"
        );
        navigate("/login" , {state : data.email});
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message ||
            "something went wrong please try again"
        );
      });
  };

  return (
    <>
      <Box
        component="div"
        sx={{
          ml: { md: "7rem", xs: "2rem" },
          mt: { md: "3.9rem", xs: "2rem" },
        }}>
        <Typography component="h1" sx={{ fontSize: "1.87rem" }}>
          Reset Password
        </Typography>

        <Box component="div" mt="22px">
          <Typography component="p">
            If you already have an account register
            <Typography component="span" display={"block"}>
              You can{" "}
              <Box
                ml={1}
                sx={{ color: red[600] }}
                fontWeight={600}
                component={"span"}>
                <Link className="formLinks" to="/login">
                  Login here !
                </Link>
              </Box>
            </Typography>
          </Typography>
        </Box>

        <Box onSubmit={handleSubmit(onSubmitHandler)} component="form" mt={"96px"} display={'flex'} sx={{width:'100%' , flexDirection:'column'}}>
          
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                
                paddingBottom: "0.5rem",
               
              }}>
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="email"
                sx={{ color: "#152C5B", fontSize: "16px" }}>
                {"Email"}
              </Typography>
              <TextField
                hiddenLabel
                defaultValue=""
                variant="filled"
                size="small"
                id="email"
                placeholder="Please type here ..."
                sx={{
                  width: { xs: "95%", sm: "80%" },
                  "& .MuiFilledInput-root": {
                    "&:before": { borderBottom: "none" },
                    "&:hover:not(.Mui-disabled):before": {
                      borderBottom: "none",
                    },
                    "&:after": { borderBottom: "none" },
                  },

                  backgroundColor: "#F5F6F8",
                }}
                {...register("email", { required: "please enter email" })}
              />
              {errors.email && (
                <FormHelperText
                  sx={{
                    color: "#EB5148",
                    paddingBottom: "0.3rem",
                    fontWeight: "bold",
                  }}>
                  {errors?.email?.message}
                </FormHelperText>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "95%", sm: "80%" },
                paddingBottom: "0.5rem",
              }}>
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="otp"
                sx={{ color: "#152C5B", fontSize: "16px" }}>
                {"OTP"}
              </Typography>
              <TextField
                hiddenLabel
                defaultValue=""
                variant="filled"
                size="small"
                id="otp"
                placeholder="Please type here ..."
                sx={{
                  "& .MuiFilledInput-root": {
                    "&:before": { borderBottom: "none" },
                    "&:hover:not(.Mui-disabled):before": {
                      borderBottom: "none",
                    },
                    "&:after": { borderBottom: "none" },
                  },

                  backgroundColor: "#F5F6F8",
                }}
                {...register("seed", { required: "please enter OTP" })}
              />
              {errors.seed && (
                <FormHelperText
                  sx={{
                    color: "#EB5148",
                    paddingBottom: "0.3rem",
                    fontWeight: "bold",
                  }}>
                  {errors?.seed?.message}
                </FormHelperText>
              )}
            </Box>

            <Box >
              <CustomPasswordInput
                label="Password"
                register={{ ...register("password", validationRules.password) }}
                isError={errors?.password}
                errorMessage={errors?.password?.message}
              />
            </Box>

            <Box>
              <CustomPasswordInput
                label="Confirm Password"
                register={{
                  ...register(
                    "confirmPassword",
                    validationRules.confirmPassword
                  ),
                }}
                isError={errors?.confirmPassword}
                errorMessage={errors?.confirmPassword?.message}
              />
            </Box>

            <Box sx={{mt: { md: "63px", xs: "2rem" }}}>
              <FormButton isSubmitting={isSubmitting} btnText='Reset' />
            </Box>
        </Box>
      </Box>
    </>
  );
};

export default ResetPassword;


