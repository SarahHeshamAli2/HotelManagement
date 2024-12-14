import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ShowUploadImgBox from "../ShowUploadImgBox/ShowUploadImgBox";
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const UploadImgBox = ({
  inputRef,
  handleButtonClick,
  url,
  register,
  isError,
  errorMessage,
}: {
  inputRef: React.RefObject<HTMLInputElement>;
  handleButtonClick: () => void;
  url: string | null;
  register?: ReturnType<UseFormRegister<FieldValues>>;
  // validationRules: any;
  isError?: FieldError | undefined | boolean;
  errorMessage?: string;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.3,
        width: { xs: "95%", sm: "80%" },
        paddingBottom: "0.5rem",
        paddingTop: "0.5rem",
      }}
    >
      <TextField
        type={"file"}
        id={`image-textfield` + "-file"}
        slotProps={{ htmlInput: { type: "file", accept: "image/*" } }}
        inputRef={inputRef}
        sx={{
          cursor: "pointer",
          display: "none",
        }}
        {...register}
      />
      <FormControl
        fullWidth
        sx={{
          border: "2px dashed #3252DF",
          cursor: "pointer",
        }}
      >
        {url && <ShowUploadImgBox imgUrl={url} uploadedImage={""} />}

        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={handleButtonClick}
          sx={{
            gap: "0.5rem",
            cursor: "pointer",
          }}
        >
          <PhotoCamera />
          <Typography
            variant="subtitle1"
            component="label"
            htmlFor="name-textfield"
            sx={{
              color: "#3252DF",
              fontSize: "16px",
              cursor: "pointer",
              textAlign: { xs: "left", sm: "center" },
            }}
          >
            {url
              ? "Uploaded successfully Upload another ?"
              : "Upload an image file right here"}
          </Typography>
        </IconButton>
      </FormControl>
      {isError && (
        <FormHelperText
          sx={{
            color: "#EB5148",
            paddingBottom: "0.3rem",
            fontWeight: "bold",
          }}
        >
          {errorMessage}
        </FormHelperText>
      )}
    </Box>
  );
};

export default UploadImgBox;
