import { Box, Container, Link, Typography } from "@mui/material";
import CustomInput from "../../../Shared/Components/CustomInput/CustomInput";
import CustomPasswordInput from "../../../Shared/Components/CustomPasswordInput/CustomPasswordInput";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  getRequiredMessage,
  getValidationRules,
} from "../../../../services/Validations";
import { AUTH_URLS, axiosInstance } from "../../../../services/urls";
import { toast } from "react-toastify";
import axios from "axios";
import useObjectUrl from "../../../../hooks/useObjectUrl";
import { useRef } from "react";
import UploadImgBox from "../../../Shared/Components/UploadImgBox/UploadImgBox";
import FormButton from "../../../Shared/Components/FormButton/FormButton";

interface RegisterResponse {
  success: boolean;
  message: string;
  data: User;
}
export type User = {
  userName: string;
  phoneNumber: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileImage: FileList | null;
  // profileImage: File | null;
};
export default function Registeration() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    // setError,
    watch,
  } = useForm<User>({
    defaultValues: {
      // profileImage: [],
      profileImage: new DataTransfer().files,
      userName: "",
      phoneNumber: "",
      country: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const navigate = useNavigate();
  const validationRules = getValidationRules(watch);
  const selectedImg = watch("profileImage");
  // const { url } = useObjectUrl(selectedImg);
  const { url } = useObjectUrl(selectedImg);
  // const { url } = useObjectUrl(selectedImg && selectedImg?.[0]);
  console.log(typeof selectedImg);
  console.log(url);
  const onSubmit = async (data: User) => {
    console.log(data);
    const formData = new FormData();
    // if (!data.profileImage) {
    //   setError("profileImage", {
    //     type: "manual",
    //     message: "Profile Image is required",
    //   });
    // }
    for (const key in data) {
      if (key === "profileImage" && data[key]) {
        // if (key === "profileImage" && data[key] && data[key]?.length > 0) {
        formData.append(key, data[key]?.[0]);
      } else {
        formData.append(key, data[key as keyof User] as string);
      }
    }
    formData.append("role", "user");
    try {
      const response = await axiosInstance.post<RegisterResponse>(
        AUTH_URLS.registerUser,
        formData
      );
      if (response.status === 201) {
        toast.success(response?.data?.message || "User created successfully");
        navigate("/login");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Failed to Register. Please try again."
        );
      } else {
        console.error(error);
      }
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <Container
      sx={{
        paddingTop: "5rem",
        marginX: { xs: "1rem", sm: "2rem", md: "5rem" },
      }}
    >
      <Typography variant="h4">Sign up</Typography>
      <Typography
        variant="body1"
        sx={{
          maxWidth: "310px",
          paddingTop: "1rem",
          wordSpacing: "1px",
          lineHeight: "1.6",
        }}
      >
        If you already have an account register You can{" "}
        <Link
          component={RouterLink}
          to={"/login"}
          sx={{ color: "#EB5148", fontWeight: "600", textDecoration: "none" }}
        >
          Login here !
        </Link>
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            paddingTop: "1.625rem",
          }}
        >
          <CustomInput
            label="User Name"
            type="text"
            placeholder="Please type here ..."
            register={{
              ...register("userName", {
                required: getRequiredMessage("User Name"),
              }),
            }}
            isError={errors?.userName}
            errorMessage={errors?.userName?.message}
            bgColor="#F5F6F8"
            widthXS="95%"
            widthSM="80%"
          />
          <Box
            sx={{
              display: "flex",
              width: { xs: "95%", sm: "80%" },
              gap: "1rem",
            }}
          >
            <CustomInput
              label="Phone Number"
              type="tel"
              placeholder="Please type here ..."
              register={{
                ...register("phoneNumber", validationRules.phoneNumber),
              }}
              isError={errors?.phoneNumber}
              errorMessage={errors?.phoneNumber?.message}
              bgColor="#F5F6F8"
              widthXS="95%"
              widthSM="80%"
            />
            <CustomInput
              label="Country"
              type="text"
              placeholder="Please type here ..."
              register={{ ...register("country", validationRules.country) }}
              isError={errors?.country}
              errorMessage={errors?.country?.message}
              bgColor="#F5F6F8"
              widthXS="95%"
              widthSM="80%"
            />
          </Box>
          <CustomInput
            label="Email Address"
            type="email"
            placeholder="Please type here ..."
            register={{ ...register("email", validationRules.email) }}
            isError={errors?.email}
            errorMessage={errors?.email?.message}
            bgColor="#F5F6F8"
            widthXS="95%"
            widthSM="80%"
          />
          <CustomPasswordInput
            label="Password"
            register={{ ...register("password", validationRules.password) }}
            isError={errors?.password}
            errorMessage={errors?.password?.message}
          />
          <CustomPasswordInput
            label="Confirm Password"
            register={{
              ...register("confirmPassword", validationRules.confirmPassword),
            }}
            isError={errors?.confirmPassword}
            errorMessage={errors?.confirmPassword?.message}
          />

          <UploadImgBox
            inputRef={inputRef}
            handleButtonClick={handleButtonClick}
            url={url}
            register={{
              ...register("profileImage", validationRules.profileImage),
            }}
            isError={errors?.profileImage?.message}
            errorMessage={errors?.profileImage?.message}
          />
          <Box sx={{ mt: "10px" }}>
            <FormButton isSubmitting={isSubmitting} btnText="Sign up" />
          </Box>
        </Box>
      </form>
    </Container>
  );
}
