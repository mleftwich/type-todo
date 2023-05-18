import { amber, grey } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { makeServer } from "./server/server";
import TodosContextProvider from "./store/TodoContext";
makeServer();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// THEME
const theme = createTheme({
  palette: {
    primary: {
      main: amber[400],
    },
    secondary: {
      main: grey[100],
    },
  },
});

root.render(
  <TodosContextProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </TodosContextProvider>
);
