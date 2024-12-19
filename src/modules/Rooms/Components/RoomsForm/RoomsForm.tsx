import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import CustomInput from "../../../Shared/Components/CustomInput/CustomInput";

import { useRef } from "react";
import UploadImgBox from "../../../Shared/Components/UploadImgBox/UploadImgBox";
import { useForm } from "react-hook-form";
import {
  getRequiredMessage,
  getRoomValidationRules,
} from "../../../../services/Validations";
import useObjectUrl from "../../../../hooks/useObjectUrl";
import { axiosInstance, ROOM_URLS } from "../../../../services/urls";
import { toast } from "react-toastify";
import axios from "axios";
import ShowUploadImgBox from "../../../Shared/Components/ShowUploadImgBox/ShowUploadImgBox";
import { Link as RouterLink, useNavigate } from "react-router-dom";

interface RoomResponse {
  success: boolean;
  message: string;
  data: Room;
}
export type Room = {
  roomNumber: string;
  price: string;
  capacity: string;
  discount: string;
  facilities: string[];
  imgs: File[];
};
export default function RoomsForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    getValues,
    setValue,
    trigger,
    watch,
    control,
  } = useForm<Room>({
    defaultValues: {
      // imgs: [],
      imgs: undefined,
      roomNumber: "",
      price: "",
      capacity: "",
      discount: "",
      facilities: [],
    },
    mode: "onChange",
  });

  const navigate = useNavigate();
  const facilities = watch("facilities");
  const imgs = getValues("imgs");
  const validationRules = getRoomValidationRules();
  const { url } = useObjectUrl(imgs);
  console.log(url);
  const menuItems = [
    { value: "66ffd9526475e2d50daa20ea", label: "Ten" },
    { value: "66e3457d6475e2d50da5fef8", label: "Twenty" },
  ];

  const onSubmit = async (data: Room) => {
    console.log(data);
    // await trigger("imgs");
    const formData = new FormData();
    for (const key in data) {
      if (key === "imgs") {
        const fileList = data[key];
        if (fileList) {
          const files = Array.from(fileList);
          // Convert FileList to File[]
          for (let i = 0; i < files.length; i++) {
            if (files[i]) {
              formData.append("imgs", files[i]);
            }
          }
        }
        // const files = data[key];
        // if (files) {
        //   for (let i = 0; i < 6; i++) {
        //     if (files[i]) {
        //       formData.append("imgs", files[i]);
        //     }
        //   }
        // }
        // for (let i = 0; i < data[key]!.length; i++) {
        //   formData.append("imgs", data[key]?.[i]);
        // }
        // data[key].forEach((file) => {
        //   formData.append("imgs", file);
        // });
      } else if (key === "facilities") {
        // for (let i = 0; i < data[key].length; i++) {
        //   formData.append("facilities", data[key][i]);
        // }
        data[key].forEach((facility) => {
          formData.append("facilities", facility);
        });
      } else {
        formData.append(key, data[key as keyof Room] as string);
      }
    }

    try {
      const response = await axiosInstance.post<RoomResponse>(
        ROOM_URLS.createRoom,
        formData
      );
      if (response.status === 201) {
        toast.success(response?.data?.message || "Room created successfully");
        navigate("/rooms");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Failed to create room. Please try again."
        );
      } else {
        console.error(error);
      }
    }
  };
  const handleRemoveImage = (index: number) => {
    console.log(index);
    const updatedFiles = imgs.filter((_, i) => i !== index);
    setValue("imgs", updatedFiles, { shouldValidate: true });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        component={Container}
        direction={"column"}
        spacing={2}
        sx={{
          width: "75%",
          marginX: "auto",
          paddingTop: "5.25rem",
        }}
      >
        <CustomInput
          type="text"
          placeholder="Room Number"
          bgColor="#F7F7F7"
          placeColor="#000000"
          register={{
            ...register("roomNumber", {
              required: getRequiredMessage("Room Number"),
            }),
          }}
          isError={!!errors.roomNumber}
          errorMessage={errors.roomNumber?.message}
        />
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <CustomInput
            type="number"
            placeholder="Price"
            bgColor="#F7F7F7"
            placeColor="#000000"
            widthSM="50%"
            register={{
              ...register("price", {
                required: getRequiredMessage("Price"),
              }),
            }}
            isError={!!errors.price}
            errorMessage={errors.price?.message}
          />
          <CustomInput
            type="number"
            placeholder="Capacity"
            bgColor="#F7F7F7"
            placeColor="#000000"
            widthSM="50%"
            register={{
              ...register("capacity", {
                required: getRequiredMessage("Capacity"),
              }),
            }}
            isError={!!errors.capacity}
            errorMessage={errors.capacity?.message}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: { xs: "wrap", sm: "nowrap" },
            gap: "1rem",
          }}
        >
          <CustomInput
            type="number"
            placeholder="Discount"
            bgColor="#F7F7F7"
            placeColor="#000000"
            widthSM="50%"
            register={{
              ...register("discount", {
                required: getRequiredMessage("Discount"),
              }),
            }}
            isError={!!errors.discount}
            errorMessage={errors.discount?.message}
          />
          <FormControl
            variant="filled"
            size="small"
            sx={{
              width: { xs: "100%", sm: "50%" },
              "& .MuiFormLabel-root": {
                color: "#000000 !important",
                paddingTop: "0px !important",
                fontWeight: "500",
              },
              "& .MuiFilledInput-root": {
                "&:before": { borderBottom: "none" },
                "&:hover:not(.Mui-disabled):before": { borderBottom: "none" },
                "&:after": { borderBottom: "none" },
                borderRadius: "0.5rem",
              },
              backgroundColor: "#F7F7F7",
            }}
          >
            <InputLabel
              id="Facilities-select-label"
              sx={{
                width: "100%",
                transform: facilities.length === 0 ? "translateY(8px)" : "",
                pl: facilities.length === 0 ? "10px" : 0,
                position: "absolute",
              }}
            >
              Facilities
            </InputLabel>
            <Select
              labelId="Facilities-select-label"
              id="Facilities-select"
              value={facilities}
              sx={{
                height: "40px",
              }}
              multiple={true}
              {...register("facilities", {
                required: getRequiredMessage("Facilities"),
              })}
            >
              {menuItems.map((menuItem) => (
                <MenuItem key={menuItem.value} value={menuItem.value}>
                  {menuItem.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText
              sx={{
                color: "#EB5148",
                paddingBottom: "0.2rem",
                fontWeight: "bold",
              }}
            >
              {errors.facilities?.message}
            </FormHelperText>
          </FormControl>
        </Box>
        <UploadImgBox
          url={url}
          inputRef={inputRef}
          register={{
            ...register("imgs", validationRules.imgs),
          }}
          isError={errors?.imgs?.message}
          errorMessage={errors?.imgs?.message}
          setValue={setValue}
          control={control}
          trigger={trigger}
          // setImgUrl={setUrl}
          validationRules={validationRules}
          currentImgs={imgs}
        />

        {imgs?.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            {imgs.map((url, index) => (
              <ShowUploadImgBox
                key={index}
                imgUrl={url}
                height="80px"
                width="150px"
                deleteUrl={() => {
                  // const urlToRemove = url;
                  // removeObjectURL(url);

                  handleRemoveImage(index);
                  // removeObjectURL(+url);
                  // const dataTransfer = new DataTransfer();
                  // Array.from(imgs).forEach((file) => {
                  //   if (URL.createObjectURL(file) !== url) {
                  //     dataTransfer.items.add(file);
                  //   }
                  // });
                  // const files = Array.from(e.dataTransfer.files);
                  // setValue("imgs", dataTransfer.files);
                }}
              />
            ))}
          </Box>
        )}
        <Divider sx={{ paddingTop: "6.75rem" }} />
        <Box
          sx={{
            display: "flex",
            gap: "1.5rem",
            justifyContent: "flex-end",
            paddingTop: "3rem",
          }}
        >
          <Button
            component={RouterLink}
            to="/rooms"
            variant="outlined"
            sx={{ textTransform: "none", width: "10.625rem" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ textTransform: "none", width: "6.4375rem" }}
            disabled={isSubmitting}
          >
            Save
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
