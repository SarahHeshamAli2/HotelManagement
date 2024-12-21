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

import { useCallback, useEffect, useRef } from "react";
import UploadImgBox from "../../../Shared/Components/UploadImgBox/UploadImgBox";
import { Controller, useForm } from "react-hook-form";
import {
  getRequiredMessage,
  getRoomValidationRules,
} from "../../../../services/Validations";
import useObjectUrl from "../../../../hooks/useObjectUrl";
import {
  axiosInstance,
  FACILITIES_URLS,
  ROOM_URLS,
} from "../../../../services/urls";
import { toast } from "react-toastify";
import axios from "axios";
import ShowUploadImgBox from "../../../Shared/Components/ShowUploadImgBox/ShowUploadImgBox";
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";

interface RoomResponse {
  success: boolean;
  message: string;
  data: Room;
}
interface RoomDetailResponse {
  success: boolean;
  message: string;
  data: {
    room: Room;
  };
}
interface FacilityResponse {
  success: boolean;
  message: string;
  data: { facilities: RoomFacilities[] };
}
type RoomFacilities = {
  _id: string;
  name: string;
};
export type Room = {
  roomNumber: string;
  price: string;
  capacity: string;
  discount: string;
  facilities: string[] | RoomFacilities[];
  imgs: File[];
  images?: string[];
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
  const uploadedImgs = getValues("images");
  const validationRules = getRoomValidationRules();
  const url = useObjectUrl(imgs);
  const { roomId } = useParams();
  const { pathname } = useLocation();
  const newRoom = pathname.includes("new-room");

  const onSubmit = async (data: Room) => {
    console.log(data);
    const formData = new FormData();
    for (const key in data) {
      if (key === "imgs") {
        if (uploadedImgs) {
          const filesFromUrls = await convertUrlsToFiles(uploadedImgs || []);
          filesFromUrls.forEach((file) => formData.append("imgs", file));
        }
        const fileList = data.imgs;
        const files = Array.from(fileList);
        for (const file of files) {
          formData.append("imgs", file);
        }
      } else if (key === "facilities") {
        if (
          Array.isArray(data[key]) &&
          data[key].every((facility) => typeof facility === "string")
        ) {
          // facilities is an array of strings
          data[key].forEach((facility: string) => {
            formData.append("facilities", facility);
          });
        }
      } else {
        formData.append(key, data[key as keyof Room] as string);
      }
    }

    try {
      const response = await axiosInstance?.[
        newRoom ? "post" : "put"
      ]<RoomResponse>(
        newRoom
          ? ROOM_URLS.createRoom
          : `${ROOM_URLS.updateRoom(roomId ?? "")}`,
        formData
      );
      if (response.status === 201) {
        toast.success(response?.data?.message || "Room created successfully");
        navigate("/rooms");
      } else if (response.status === 200) {
        toast.success(response?.data?.message || "Room updated successfully");
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
    const updatedFiles = imgs && imgs!.filter((_, i) => i !== index);
    setValue("imgs", updatedFiles, { shouldValidate: true });
  };
  async function convertUrlsToFiles(urls: string[]) {
    // Function to fetch a single image and convert it to a File
    const urlToFile = async (url: string) => {
      const response = await axios.get(url, { responseType: "blob" });
      const blob = response.data;
      // Extract file name from the URL
      const fileName = url.split("/").pop();
      // Create a File object
      return new File([blob], fileName!, { type: blob.type });
    };
    // Map through the URLs and convert each to a File
    const filePromises = urls.map((url) => urlToFile(url));
    return Promise.all(filePromises);
  }

  const getFacilities = useCallback(async () => {
    const response = await axiosInstance.get<FacilityResponse>(
      FACILITIES_URLS.getFacilities,
      {
        params: { size: 100000, page: 1 },
      }
    );
    return response?.data;
  }, []);
  const { data: facilitiesList, loading: facilitiesLoading } =
    useFetch<FacilityResponse>(getFacilities);
  console.log(uploadedImgs);

  useEffect(() => {
    if (!newRoom) {
      const getFacilities = async () => {
        const response = await axiosInstance.get<RoomDetailResponse>(
          ROOM_URLS.getRoomById(roomId!)
        );
        console.log(response);
        setValue("roomNumber", response?.data?.data.room.roomNumber);
        setValue("price", response?.data?.data.room.price);
        setValue("capacity", response?.data?.data.room.capacity);
        setValue("discount", response?.data?.data.room.discount);

        setValue(
          "facilities",
          response?.data?.data.room.facilities.map(
            (f: RoomFacilities | string) =>
              typeof f === "string" ? f : f["_id"]
          )
        );

        if (
          response?.data?.data?.room?.images
            ?.join("")
            .replace("http://", "https://")
        ) {
          convertUrlsToFiles(response?.data?.data.room.images).then((files) => {
            setValue("imgs", files);
          });
        }
      };
      getFacilities();
    }
  }, [newRoom]);

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
                transform:
                  facilities && facilities?.length === 0
                    ? "translateY(8px)"
                    : "",
                pl: facilities && facilities?.length === 0 ? "10px" : 0,
                position: "absolute",
              }}
            >
              Facilities
            </InputLabel>
            <Controller
              name="facilities"
              control={control}
              rules={{
                required: getRequiredMessage("Facilities"),
              }}
              render={({ field }) => (
                <Select
                  labelId="Facilities-select-label"
                  id="Facilities-select"
                  value={facilities}
                  onChange={(event) => {
                    field.onChange(event);
                  }}
                  sx={{
                    height: "40px",
                    color: "#152C5B !important",
                  }}
                  multiple
                >
                  {!facilitiesLoading &&
                    facilitiesList?.data?.facilities &&
                    facilitiesList?.data?.facilities.map((facility) => (
                      <MenuItem key={facility?._id} value={facility?._id}>
                        {facility?.name}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
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
          validationRules={validationRules}
          currentImgs={imgs}
        />

        {(imgs?.length > 0 || (uploadedImgs && uploadedImgs!.length > 0)) && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            {imgs?.map((url, index) => (
              <ShowUploadImgBox
                key={index}
                imgUrl={url}
                height="80px"
                width="150px"
                deleteUrl={() => {
                  handleRemoveImage(index);
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
