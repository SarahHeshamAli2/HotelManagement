import {
  Box,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { getValidationRules } from "../../../../services/Validations";
import { AUTH_URLS, axiosInstance } from "../../../../services/urls";
import { toast } from "react-toastify";
import { User } from "../Registeration/Registeration";
import FormButton from "../../../Shared/Components/FormButton/FormButton";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    watch,
  } = useForm<User>({
    mode : "onChange"
  });

  const validationRules = getValidationRules(watch);

  const onSubmitHandler = async (data: User) => {
    await axiosInstance
      .post(AUTH_URLS.forgetPassword, data)
      .then((response) => {
        console.log(response?.data?.message);
        toast.success(
          response?.data?.message || "please check your email for OTP"
        );
        navigate("/reset-password", { state: data.email });
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
          Forgot password
        </Typography>

        <Box component="div" mt="22px">
          <Typography component="p">
            If you already have an account register
            <Typography component="span" display={"block"}>
              You can{" "}
              <Box 
                ml={1}
                sx={{ color: red[600] , textDecoration:'none' }}
                fontWeight={600}
                component={Link} to={'/login'}>
               
                  Login here !
            
              </Box>
            </Typography>
          </Typography>
        </Box>

        <Box component="form" mt={"96px"} onSubmit={handleSubmit(onSubmitHandler)}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "95%", sm: "80%" },
              }}>
              <label htmlFor="email">Email</label>
              <TextField
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
                hiddenLabel
                defaultValue=""
                variant="filled"
                size="small"
                placeholder="Please type here ..."
                {...register("email", validationRules.email)}
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

            <Box sx={{mt: { md: "63px", xs: "2rem" }}}>
              <FormButton isSubmitting={isSubmitting} btnText='Send mail' />
            </Box>
        </Box>
      </Box>
    </>
  );
};

export default ForgetPassword;
