import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import ShowUploadImgBox from "../ShowUploadImgBox/ShowUploadImgBox";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { Room } from "../../../Rooms/Components/RoomsForm/RoomsForm";
import { UploadIcon } from "../SvgIcons/SvgIcons";
import { getRoomValidationRules } from "../../../../services/Validations";

type uploadPropsType = {
  inputRef: React.RefObject<HTMLInputElement>;
  handleButtonClick?: () => void;
  url: string | string[] | null;
  register?: ReturnType<UseFormRegister<FieldValues>>;
  isError?: FieldError | undefined | boolean | string;
  errorMessage?: string;
  handleImageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValue?: UseFormSetValue<Room>;
  currentImgs?: File[];
  control?: Control<Room>;
  trigger?: UseFormTrigger<Room>;
  validationRules?: ReturnType<typeof getRoomValidationRules>;
};
const UploadImgBox = ({
  inputRef,
  handleButtonClick,
  url,
  register,
  isError,
  errorMessage,
  setValue,
  currentImgs,
  control,
  validationRules,
}: uploadPropsType) => {
  const { pathname } = useLocation();
  const [dragOver, setDragOver] = useState(false);
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files || []);
    const updatedFiles = [...(currentImgs ?? []), ...files];
    if (updatedFiles.length > 5) {
      toast.error("You can only upload up to 5 images");
      return;
    }
    setValue!("imgs", updatedFiles, { shouldValidate: true });
    toast.success("Image uploaded successfully");
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => {
    setDragOver(false);
  };
  return (
    <>
      {pathname === "/register" && (
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
            {url && <ShowUploadImgBox imgUrl={url[0]} height={"40px"} />}
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
      )}
      {pathname.includes("rooms") && (
        <Box
          sx={{
            width: "100%",
            cursor: url?.length === 5 ? "not-allowed" : "pointer",
          }}
        >
          <Controller
            name="imgs"
            control={control}
            rules={{ ...validationRules?.imgs }}
            render={() => (
              <>
                <TextField
                  type="file"
                  id="room-images"
                  inputRef={inputRef}
                  sx={{
                    display: "none",
                  }}
                  slotProps={{
                    htmlInput: { accept: "image/*", multiple: true },
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = Array.from(e.target.files || []);
                    const updatedFiles = [...(currentImgs ?? []), ...files];
                    if (updatedFiles.length > 5) {
                      toast.error("You can only upload up to 5 images");
                      return;
                    }
                    setValue!("imgs", updatedFiles, { shouldValidate: true });
                  }}
                />
                <InputLabel
                  component="label"
                  htmlFor="room-images"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  sx={{
                    border: dragOver ? "2px dashed gray" : "2px dashed #009247",
                    backgroundColor: "#F1FFF0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                    width: "100%",
                    cursor: url?.length === 5 ? "not-allowed" : "pointer",
                    paddingY: "2rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  <UploadIcon />
                  <Typography component="span" sx={{ color: "#000000" }}>
                    Drag & Drop or{" "}
                    <Typography component="span" sx={{ color: "#009247" }}>
                      Choose Room Images{" "}
                    </Typography>
                    to Upload
                  </Typography>
                </InputLabel>
              </>
            )}
          />
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
      )}
    </>
  );
};

export default UploadImgBox;
