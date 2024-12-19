import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import deleteImg from "../../../assets/images/deleteImg.png";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { grey, red } from "@mui/material/colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};
interface DeleteConfirmationProps {
  deleteItem: string;
  deleteFn: () => void;
  handleClose: () => void;
  open: boolean;
  deleting: boolean;
}
export default function DeleteConfirmation({
  deleteItem,
  deleteFn,
  handleClose,
  open,
  deleting,
}: DeleteConfirmationProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete this {deleteItem}
          </Typography>
          <Button
            sx={{ ":hover": { backgroundColor: "unset" } }}
            onClick={handleClose}
          >
            <HighlightOffIcon sx={{ color: red[600] }} />
          </Button>
        </Box>

        <img
          src={deleteImg}
          alt="modal-delete-image"
          style={{ marginBlock: "1rem" }}
        />
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2, color: grey[600] }}
        >
          are you sure you want to delete this item ? if you are sure just click
          on delete it
        </Typography>
        <Button
          onClick={deleteFn}
          sx={{
            marginBlock: "1rem",
            backgroundColor: "#3252DF",
            width: { xs: "95%", sm: "80%" },
            height: "3rem",
            borderRadius: "0.25rem",
            textTransform: "none",
            color: "#fff",
            fontSize: "17px",
            "&.Mui-disabled": {
              background: "#949fcf",
              color: "#c0c0c0",
            },
          }}
        >
          {deleting ? (
            <CircularProgress sx={{ color: "white" }} size={"1rem"} />
          ) : (
            "Delete"
          )}
        </Button>
      </Box>
    </Modal>
  );
}
