import { Box, Button, CircularProgress,  Typography } from "@mui/material";
import CustomPasswordInput from "../../../Shared/Components/CustomPasswordInput/CustomPasswordInput";
import { getValidationRules } from "../../../../services/Validations";
import { useForm } from "react-hook-form";
import { AUTH_URLS, axiosInstance } from "../../../../services/urls";
import { toast } from "react-toastify";
import { changePasswordFormData } from "../../../../services/interfaces";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function ChangePassword() {
  const navigate = useNavigate()
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
        navigate('/dashboard')

        toast.success(response?.data?.message|| "password changed successfully")
      } catch (error : unknown) {

        if(axios.isAxiosError(error)) {
          toast.error( error.response?.data?.message ||"please try again")

        }
        console.log(error)
      }
    }
  

  return (
    <>


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
