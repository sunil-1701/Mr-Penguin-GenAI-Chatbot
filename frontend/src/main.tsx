import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material";
import {BrowserRouter} from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext.tsx";
import axios from "axios";
import {Toaster} from "react-hot-toast";

axios.defaults.baseURL="https://mr-penguin.onrender.com/:5000/api/v1";
axios.defaults.withCredentials = true;
const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab,serif",
    allVariants: { color: "white" },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Toaster position="top-right" />
      <App />
    </ThemeProvider>
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
