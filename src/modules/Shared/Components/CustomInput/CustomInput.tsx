import { Box, FormHelperText, TextField, Typography } from "@mui/material";
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

interface CustomInputProps {
  label: string;
  type: string;
  register?: ReturnType<UseFormRegister<FieldValues>>;
  isError?: FieldError | undefined | boolean;
  errorMessage?: string;
}

const CustomInput = ({
  label,
  type,
  register,
  isError,
  errorMessage,
}: CustomInputProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: { xs: "95%", sm: "80%" },
        paddingBottom: "0.4rem",
      }}
    >
      <Typography
        variant="subtitle1"
        component="label"
        htmlFor="name-textfield"
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
        placeholder={"Please type here ..."}
        sx={{
          "& .MuiFilledInput-root": {
            border: type === "file" ? "2px dashed #3252DF" : "none",
            display: type === "file" ? "none" : "",
            "&:before": { borderBottom: "none" },
            "&:hover:not(.Mui-disabled):before": { borderBottom: "none" },
            "&:after": { borderBottom: "none" },
          },

          backgroundColor: "#F5F6F8",
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
