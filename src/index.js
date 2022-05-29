import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "app/store";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { CircularProgress, CssBaseline } from "@mui/material";
import { PersistGate } from "redux-persist/lib/integration/react";
import AuthContextProvider from "context/AuthContext";
import { ThemeProvider } from "@mui/material/node_modules/@mui/system";
import theme from "styles/theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Provider store={store}>
          <PersistGate loading={<CircularProgress />} persistor={persistor}>
            <AuthContextProvider>
              <CssBaseline />
              <App />
            </AuthContextProvider>
          </PersistGate>
        </Provider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
