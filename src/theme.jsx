import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
      grey: {
        100: "#e0e0e0",
        200: "#c2c2c2",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#525252",
        700: "#3d3d3d",
        800: "#292929",
        900: "#141414",
      },
      primary: {
        100: "#cde2ce", // lighter green
        200: "#9ac49d",
        300: "#68a66b",
        400: "#35783a",
        500: "#14551a", // main green
        600: "#104612",
        700: "#0c370e",
        800: "#08280a",
        900: "#041805",
      },
      secondary: {
        100: "#d8e3f0", // lighter blue
        200: "#b2c7e0",
        300: "#8baccf",
        400: "#6590bf",
        500: "#3e74af", // main blue
        600: "#315d8c",
        700: "#25466a",
        800: "#193048",
        900: "#0c1925",
      },
      neutral: {
        100: "#e0e0e0",
        200: "#c2c2c2",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#525252",
        700: "#3d3d3d",
        800: "#292929",
        900: "#141414",
      },
    }
    : {
      grey: {
        100: "#141414",
        200: "#292929",
        300: "#3d3d3d",
        400: "#525252",
        500: "#666666",
        600: "#858585",
        700: "#a3a3a3",
        800: "#c2c2c2",
        900: "#e0e0e0",
      },
      primary: {
        100: "#e6f4e7", // lighter green
        200: "#cde9cf",
        300: "#b4dec0",
        400: "#9bd3a8",
        500: "#82c891", // main green
        600: "#69bd79",
        700: "#50b262",
        800: "#37a64a",
        900: "#1e9b33",
      },
      secondary: {
        100: "#e0f1fb", // lighter blue
        200: "#c1e3f6",
        300: "#a2d5f2",
        400: "#83c7ed",
        500: "#64b9e8", // main blue
        600: "#45abde",
        700: "#269cd4",
        800: "#078ec9",
        900: "#007fbe",
      },
      neutral: {
        100: "#f5f5f5",
        200: "#ebebeb",
        300: "#e0e0e0",
        400: "#d6d6d6",
        500: "#cccccc",
        600: "#b3b3b3",
        700: "#999999",
        800: "#808080",
        900: "#666666",
      },
    }),
});


export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          primary: {
            main: colors.primary[400],
          },
          secondary: {
            main: colors.secondary[500],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: colors.primary[900],
            paper: colors.primary[800],
          },
        }
        : {
          primary: {
            main: colors.primary[800],
          },
          secondary: {
            main: colors.secondary[500],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: colors.primary[50],
            paper: colors.primary[100],
          },
        }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};


// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => { },
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [colorMode, theme];
};