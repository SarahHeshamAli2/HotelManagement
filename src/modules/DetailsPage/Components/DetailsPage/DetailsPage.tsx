import { useParams } from "react-router-dom";
import CommentForm from "../../../Shared/Components/CommentForm/CommentForm";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  width: "92%",
  marginInline: "auto",
  border: "1px solid #E5E5E5",
  borderRadius: "15px",
}));
const VerticalLine = styled(Box)(({ theme }) => ({
  width: "1px",
  backgroundColor: "#203FC7",
  margin: "0 10px",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  [theme.breakpoints.up("md")]: {
    display: "block",
  },
}));
export default function DetailsPage() {
  let params = useParams();
  console.log(params.roomId);
  return (
    <>
      <div>DetailsPage</div>
      <StyledBox
        sx={{
          flexDirection: {
            xs: "column",
            lg: "row",
          },
          gap: {
            xs: "3rem",
            md: "2rem",
            lg: "5rem",
          },
          paddingX: {
            xs: "1rem",
            sm: "5rem",
          },
          paddingY: "26px",
        }}
      >
        {/* Replace with Review Form  here */}
        <CommentForm roomId={params.roomId ?? ""} />
        <VerticalLine />
        <CommentForm roomId={params.roomId ?? ""} />
      </StyledBox>
    </>
  );
}
