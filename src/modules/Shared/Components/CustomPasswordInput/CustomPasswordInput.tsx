import {
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useState } from "react";
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

interface CustomInputProps {
  label: string;
  register: ReturnType<UseFormRegister<FieldValues>>;
  isError?: FieldError | undefined;
  errorMessage?: string;
}

const CustomPasswordInput = ({
  label,
  register,
  isError,
  errorMessage,
}: CustomInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: { xs: "95%", sm: "80%" },
        paddingBottom: "0.5rem",
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
        type={showPassword ? "text" : "password"}
        id={`${label}-textfield`}
        defaultValue=""
        variant="filled"
        size="small"
        placeholder="Please type here ..."
        sx={{
          "& .MuiFilledInput-root": {
            "&:before": { borderBottom: "none" },
            "&:hover:not(.Mui-disabled):before": { borderBottom: "none" },
            "&:after": { borderBottom: "none" },
          },

          backgroundColor: "#F5F6F8",
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  sx={{ color: "#ABABAB" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        {...register}
      />
      {isError && (
        <FormHelperText
          sx={{ color: "#EB5148", paddingBottom: "0.3rem", fontWeight: "bold" }}
        >
          {errorMessage}
        </FormHelperText>
      )}
    </Box>
  );
};

export default CustomPasswordInput;