import { IconButton, TextField, Box } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useState } from "react";

interface CapacitySelectorProps {
  initialCount?: number;
  onChange: (count: number) => void;
}

export default function CapacitySelector({
  initialCount = 1,
  onChange,
}: CapacitySelectorProps) {
  const [count, setCount] = useState(initialCount);

  const handleIncrease = () => {
    const newCount = count + 1;
    setCount(newCount);
    onChange(newCount);
  };

  const handleDecrease = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      onChange(newCount);
    }
  };

  return (
    <Box sx={{ mt: "1.5rem", display: "flex", alignItems: "center" }}>
      <IconButton
        onClick={handleDecrease}
        sx={{
          width: "3.5rem",
          backgroundColor: "#E74C3C",
          borderRadius: "4px 0px 0px 0px",
          "&:hover": {
            backgroundColor: "#E74C3C",
          },
          mr: "1rem",
        }}
      >
        <Remove sx={{ color: "#fff" }} />
      </IconButton>
      <TextField
        sx={{ color: "#152C5B" }}
        label="Capacity"
        value={`${count} person`}
        InputProps={{
          readOnly: true,
        }}
      />
      <IconButton
        onClick={handleIncrease}
        sx={{
          width: "3.5rem",
          backgroundColor: "#1ABC9C",
          borderRadius: "0px 4px 0px 0px",
          "&:hover": {
            backgroundColor: "#1ABC9C",
          },
          ml: "1rem",
        }}
      >
        <Add sx={{ color: "white" }} />
      </IconButton>
    </Box>
  );
}
