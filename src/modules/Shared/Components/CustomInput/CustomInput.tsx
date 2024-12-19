import { Box, FormHelperText, TextField, Typography } from "@mui/material";
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

interface CustomInputProps {
  label?: string;
  type: string;
  register?: ReturnType<UseFormRegister<FieldValues>>;
  isError?: FieldError | undefined | boolean;
  errorMessage?: string;
  placeholder?: string;
  bgColor?: string;
  placeColor?: string;
  widthSM?: string;
  widthXS?: string;
}

const CustomInput = ({
  label,
  type,
  register,
  isError,
  errorMessage,
  placeholder,
  bgColor,
  placeColor,
  widthSM,
  widthXS,
}: CustomInputProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: { xs: widthXS, sm: widthSM },
        paddingBottom: "0.4rem",
      }}
    >
      <Typography
        variant="subtitle1"
        component="label"
        htmlFor={`${label}-textfield`}
        sx={{ color: "#152C5B", fontSize: "16px" }}
      >
        {label}
      </Typography>
      <TextField
        hiddenLabel
        type={type}
        id={`${label}-textfield`}
        defaultValue=""
        variant="filled"
        size="small"
        placeholder={placeholder}
        sx={{
          "& .MuiFilledInput-root": {
            border: type === "file" ? "2px dashed #3252DF" : "none",
            display: type === "file" ? "none" : "",
            "&:before": { borderBottom: "none" },
            "&:hover:not(.Mui-disabled):before": { borderBottom: "none" },
            "&:after": { borderBottom: "none" },
            borderRadius: placeColor === "#000000" ? "0.5rem" : "",
          },
          "& .MuiInputBase-input::placeholder": {
            color: placeColor,
            opacity: placeColor === "#000000" ? 1 : 0.4,
            fontWeight: placeColor === "#000000" ? "500" : "normal",
          },
          backgroundColor: bgColor,
        }}
        {...register}
      />

      {isError && (
        <FormHelperText
          sx={{
            color: "#EB5148",
            paddingBottom: "0.2rem",
            fontWeight: "bold",
          }}
        >
          {errorMessage}
        </FormHelperText>
      )}
    </Box>
  );
};

export default CustomInput;
