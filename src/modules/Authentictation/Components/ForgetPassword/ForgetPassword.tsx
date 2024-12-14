import {
  Box,
  Button,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { getValidationRules } from "../../../../services/Validations";
import { AUTH_URLS, axiosInstance } from "../../../../services/urls";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { User } from "../Registeration/Registeration";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    watch,
  } = useForm<User>();

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

  const theme = createTheme({
    palette: {
      primary: {
        main: "#3252DF",
      },
      secondary: {
        main: "#f44336",
      },
    },
  });
  return (
    <>
      <Box
        component="div"
        sx={{ mt: { md: "0.7rem" }, ml: { md: "3rem", xs: "2rem" } }}>
        <ThemeProvider theme={theme}>
          <Typography sx={{ fontWeight: 500 }} color="primary" variant="h5">
            Stay<span style={{ color: "black" }}>cation.</span>
          </Typography>
        </ThemeProvider>
      </Box>

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

        <Box component="div" mt={"96px"}>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { md: "70%", xs: "90%" },
              }}>
              <label htmlFor="email">Email</label>
              <input
                className="forgetPasswordInput"
                type="text"
                id="email"
                placeholder="Please type here ..."
                {...register("email", validationRules.email)}
              />

              {errors.email && (
                <Box color={red[600]}>{String(errors.email.message)}</Box>
              )}
            </Box>
            <Button
              disabled={isSubmitting}
              type="submit"
              sx={{
                mt: { md: "63px", xs: "2rem" },
                backgroundColor: "#3252DF",
                color: "white",
                width: "70%",
                py: "0.8rem",
                textTransform: "none",
                "&.Mui-disabled": {
                  background: "#949fcf",
                  color: "#c0c0c0",
                },
              }}>
              {isSubmitting ? (
                <CircularProgress sx={{ color: "white" }} size={"1rem"} />
              ) : (
                "Send mail"
              )}
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default ForgetPassword;
