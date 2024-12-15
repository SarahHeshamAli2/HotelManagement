import { Box } from "@mui/material";

const ShowUploadImgBox = ({ imgUrl }: { imgUrl: string }) => {
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
            src={imgUrl}
            style={{ height: "40px", borderRadius: "10px" }}
            alt="preview"
          />
        </Box>
      )}
    </>
  );
};

export default ShowUploadImgBox;
