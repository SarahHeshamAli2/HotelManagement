import { Box, Button, CircularProgress, createTheme,ThemeProvider, Typography } from "@mui/material";
import CustomPasswordInput from "../../../Shared/Components/CustomPasswordInput/CustomPasswordInput";
import { getValidationRules } from "../../../../services/Validations";
import {changePasswordFormData } from "../../../../services/interfaces";
import { useForm } from "react-hook-form";
import { AUTH_URLS, axiosInstance } from "../../../../services/urls";
import { toast } from "react-toastify";

export default function ChangePassword() {
    const {
      formState:{errors,isSubmitting},
      register,
      handleSubmit,
      watch,
    } = useForm<changePasswordFormData>()
    const validationRules = getValidationRules(watch);

    const onSubmitData= async(data:changePasswordFormData) => {
      try {
        const response = await axiosInstance.post(AUTH_URLS.changePassword, data)
        console.log(response)
        toast.success(response?.data?.message|| "password changed successfully")
      } catch (error) {
        console.log(error)
        toast.error("please try again")
      }
    }
  
    const theme = createTheme(
    {
      palette:{
        primary:{
          main: "#3252DF",
        },
        secondary:{
          main: "#f44336",
        }
      }
    }

  );
  return (
    <>
      <Box component="div" sx={{mt:"1rem" , ml:"3rem"}}>
        <ThemeProvider theme={theme}>
          <Typography color="primary" sx={{fontWeight:500}} variant="h5">
            Stay<span style={{color:"black"}}>cation.</span>
          </Typography>
        </ThemeProvider>
      </Box>

      <Box component="div" sx={{mt:"3.9rem" , ml:"7rem"}}>
        <Typography component="h1" sx={{fontSize:"1.87rem"}}>
          Change Password
        </Typography>

        <Box component="div" sx={{mt:5}}>
          <form onSubmit={handleSubmit(onSubmitData)}>

            <Box sx={{ my: "1rem" }}>
              <CustomPasswordInput
                label="old password"
                register={{ ...register("oldPassword", validationRules.password) }}
                isError={errors?.oldPassword}
                errorMessage={errors?.oldPassword?.message}
              />
            </Box>
            <Box sx={{ my: "1rem" }}>
              <CustomPasswordInput
                label=" new password"
                register={{ ...register("newPassword", validationRules.password) }}
                isError={errors?.newPassword}
                errorMessage={errors?.newPassword?.message}
              />
            </Box>
            <Box sx={{ my: "1rem" }}>
              <CustomPasswordInput
                label="confirm new password"
                register={{ ...register("confirmPassword", validationRules.password) }}
                isError={errors?.confirmPassword}
                errorMessage={errors?.confirmPassword?.message}
              />
            </Box>

            <Button
              disabled={isSubmitting}
              type="submit"
              sx={{
                mt: { md: "63px", xs: "2rem" },
                backgroundColor: "#3252DF",
                color: "white",
                width: "80%",
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
                "Send"
              )}
            </Button>
          </form>

        </Box>
     
     
      </Box>
    </>
   
  )
}
