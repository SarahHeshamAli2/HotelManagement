import { Box } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useLocation } from "react-router-dom";

const ShowUploadImgBox = ({
  imgUrl,
  height,
  width,
  deleteUrl,
}: {
  imgUrl: File | string;
  height?: string;
  width?: string;
  deleteUrl?: () => void;
}) => {
  const { pathname } = useLocation();
  return (
    <>
      {imgUrl && (
        <Box
          sx={{
            // width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "1rem",
            position: "relative",
          }}
        >
          <Box
            component={"img"}
            src={imgUrl instanceof File ? URL.createObjectURL(imgUrl) : imgUrl}
            sx={{
              height: height,
              borderRadius: "10px",
              width: width,
            }}
            alt="preview"
          />
          {pathname.includes("rooms") && (
            <DeleteRoundedIcon
              sx={{
                backgroundColor: "white",
                borderRadius: "4px",
                marginX: "4px",
                marginY: "7px",
                paddingX: "2px",
                cursor: "pointer",
                position: "absolute",
                top: "0",
                left: "0",
              }}
              fontSize="medium"
              onClick={deleteUrl}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default ShowUploadImgBox;
