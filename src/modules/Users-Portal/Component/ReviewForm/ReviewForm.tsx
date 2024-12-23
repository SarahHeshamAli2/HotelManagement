import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Rating,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { Controller, useForm } from "react-hook-form";
import { axiosInstance, Reviews_URLS } from "../../../../services/urls";
import { toast } from "react-toastify";
import axios from "axios";
import { getReviewValidationRules } from "../../../../services/Validations";
import { theme } from "../../../../helperStyles/helperStyles";
import {
  Review,
  ReviewResponse,
} from "../../../../interfaces/ReviewInterfaces";

const StyledTextField = styled(TextField)(() => ({
  width: "32.25rem",
  "& .MuiOutlinedInput-root": {
    border: "1px solid #203FC7",
    borderRadius: "15px",
    marginTop: "0.8rem",
  },
}));
const StyledButton = styled(Button)(() => ({
  height: "50px",
  fontSize: "18px",
  display: "flex",
  backgroundColor: "#3252DF",
  width: "210px",
  boxShadow: "0px 4px 10px rgba(50, 82, 223, 0.3)",
  marginTop: "1.7rem",
  "&.Mui-disabled": {
    background: "#949fcf",
    color: "#c0c0c0",
  },
}));
const ReviewForm = ({ roomId }: { roomId: string }) => {
  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
    reset,
  } = useForm<Review>({
    defaultValues: {
      roomId: roomId,
      rating: 1,
      review: "",
    },
    mode: "onChange",
  });
  const validationRules = getReviewValidationRules();
  const onSubmit = async (data: Review) => {
    console.log(data);
    try {
      const response = await axiosInstance.post<ReviewResponse>(
        Reviews_URLS.addReview,
        { ...data, roomId: roomId }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message || "Review added successfully");
        reset();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Something went wrong, try again"
        );
      }
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          color: theme.palette.Blue.main,
          width: "100%",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: "500", fontSize: "20px" }}
        >
          Rate
        </Typography>
        <Box
          sx={{ display: "flex", flexDirection: "column" }}
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="rating"
            control={control}
            rules={validationRules.review}
            render={({ field, fieldState }) => (
              <FormControl>
                <Rating disabled={isSubmitting} precision={0.5} {...field} />
                {fieldState?.error && (
                  <FormHelperText
                    sx={{ color: "#EB5148", fontWeight: 600, fontSize: 12 }}
                  >
                    {fieldState.error.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              marginBlockStart: "1.15rem",
            }}
          >
            Message
          </Typography>
          <Controller
            name="review"
            control={control}
            rules={validationRules.review}
            render={({ field, fieldState }) => (
              <FormControl>
                <StyledTextField
                  type="text"
                  multiline
                  rows={3}
                  sx={{
                    width: {
                      xs: "100%",
                      xl: "516px",
                    },
                  }}
                  {...field}
                />
                {fieldState?.error && (
                  <FormHelperText
                    sx={{ color: "#EB5148", fontWeight: 600, fontSize: 12 }}
                  >
                    {fieldState.error.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <StyledButton
            variant="contained"
            type="submit"
            disabled={isSubmitting}
            sx={{
              textTransform: "none",
              alignSelf: {
                xs: "flex-start",
                sm: "flex-end",
              },
            }}
          >
            {isSubmitting ? (
              <CircularProgress sx={{ color: "white" }} size={"1rem"} />
            ) : (
              "Rate"
            )}
          </StyledButton>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ReviewForm;
