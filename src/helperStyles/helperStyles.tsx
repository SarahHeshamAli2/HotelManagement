import {
  createTheme,
  styled,
  TableCell,
  tableCellClasses,
  TableRow,
} from "@mui/material";
declare module "@mui/material/styles" {
  interface Palette {
    Grey: Palette["primary"];
    Grey2: Palette["primary"];
    Blue: Palette["primary"];
  }

  interface PaletteOptions {
    Grey?: PaletteOptions["primary"];
    Grey2?: PaletteOptions["primary"];
    Blue?: PaletteOptions["primary"];
  }
}

export const theme = createTheme({
  palette: {
    Grey: {
      main: "#E2E5EB",
      light: "#F8F9FB",
      dark: "#939496",
    },
    Grey2: {
      main: " #B0B0B0",
      light: "#F8F9FB",
      dark: "#939496",
    },
    Blue: {
      main: "#152C5B",
      light: "#3f6bc3",
      dark: "#040e21",
    },
  },
});


export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.Grey.main,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
