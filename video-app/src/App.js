import React, { useMemo } from "react";
import "./App.css";

/* React Router */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/** Material UI theme settings */
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";

/** Scenes Import */
import Layout from "./scenes/Layout";
import CardList from "./scenes/CardList";
import History from "./scenes/History";

function App() {
  const mode = useSelector((state) => state.global.mode);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/sports" />} />
              <Route path="/:pathname" element={<CardList />} />
              <Route path="/history" element={<History />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
