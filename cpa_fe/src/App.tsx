import { ThemeSettings } from "./theme/Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./App.css";

function App() {
  const theme = ThemeSettings();

  return (
    <ThemeProvider theme={theme}>
      {/* <RTL direction={customizer.activeDir}> */}
      {/* <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de"> */}
      <CssBaseline />
      {/* <ScrollToTop> */}
      <RouterProvider router={router} />
      {/* </ScrollToTop> */}
      {/* </LocalizationProvider> */}
      {/* </RTL> */}
    </ThemeProvider>
  );
}

export default App;
