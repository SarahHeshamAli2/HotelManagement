import { IMAGE_URL } from "../../../../services/urls";
import { Box } from "@mui/material";

const ShowUploadImgBox = ({
  imgUrl,
  // imageName,
  uploadedImage,
}: {
  imgUrl: string;
  // imageName: string;
  uploadedImage: string;
}) => {
  console.log("uploadedImage", uploadedImage);
  console.log(imgUrl);
  return (
    <>
      {imgUrl && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "1rem",
          }}
        >
          <img
            src={
              uploadedImage !== "" && !imgUrl
                ? IMAGE_URL + uploadedImage
                : imgUrl
            }
            style={{ height: "40px", borderRadius: "10px" }}
            alt="preview"
          />
        </Box>
      )}
    </>
  );
};

export default ShowUploadImgBox;
