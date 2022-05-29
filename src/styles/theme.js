import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00837B",
      light: "#54A545",
    },
    secondary: {
      main: "#0A2240",
    },
    warning: {
      main: "#E07E37",
    },
    error: {
      main: "#DA6744",
    },
    grey: {
      main: "#E2E1E1",
      900: "#707070",
    },
    info: {
      main: "#F4C867",
    },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: 18,
          lineHeight: "22px",
          padding: "12px ",
          borderRadius: "6px",
          border: "none",
          textTransform: "none",
        },
        containedPrimary: {
          color: "white",
        },
        containedError: {
          color: "white",
        },
        containedWarning: {
          color: "white",
          backgroundColor: "#F4C867",
        },
        containedInfo: {
          color: "white",
          backgroundColor: "#F4C867",
        },
        containedGrey: {
          color: "#0A2240",
        },

        outlinedPrimary: {
          border: "1px solid #00837B",
          color: "#00837B",
        },
        outlinedSecondary: {
          border: "1px solid #0A2240",
          color: "#0A2240",
        },
        sizeSmall: {
          width: "150px",
          height: "48px",
        },
        sizeMedium: {
          padding: "13px",
          minWidth: "200px",
          height: "48px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Montserrat, sans-serif",
        },

        h1: {
          fontWeight: "600",
          fontSize: "48px",
          lineHeight: "60px",
        },
        h2: {
          fontWeight: "500",
          fontSize: "40px",
          lineHeight: "50px",
        },
        h3: {
          fontWeight: "500",
          fontSize: "32px",
          lineHeight: "40px",
        },
        h4: {
          fontWeight: "600",
          fontSize: "24px",
          lineHeight: "30px",
        },
        h5: {
          fontWeight: "600",
          fontSize: "20px",
          lineHeight: "26px",
        },
        subtitle1: {
          fontWeight: "400",
          fontSize: "20px",
          lineHeight: "32px",
        },
        subtitle2: {
          fontWeight: "400",
          fontSize: "16px",
          lineHeight: "26px",
        },
        body1: {
          fontWeight: "600",
          fontSize: "16px",
          lineHeight: "20px",
        },
        body2: {
          fontWeight: "400",
          fontSize: "16px",
          lineHeight: "20px",
        },
        caption: {
          fontWeight: "400",
          fontSize: "12px",
          lineHeight: "15px",
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          // height: 48,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#000",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          "&.MuiTableCell-paddingCheckbox": {
            backgroundColor: "#333",
          },
        },
      },
    },
  },
});
export default theme;
