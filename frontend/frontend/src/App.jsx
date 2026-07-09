import { ToastContainer} from 'react-toastify';
import { useState, useEffect } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  Box
} from "@mui/material";

import QuestionInput from "./components/QuestionInput";
import SQLBox from "./components/SQLBox";
import ResultTable from "./components/ResultTable";
import QueryHistory from "./components/QueryHistory";
import SchemaExplorer from "./components/SchemaExplorer";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import HistoryIcon from "@mui/icons-material/History";
import TableChartIcon from "@mui/icons-material/TableChart";
import StorageIcon from "@mui/icons-material/Storage";

function App() {

  const [question, setQuestion] = useState("");
  const [sql, setSql] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [loadingExecute, setLoadingExecute] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",

      primary: {
        main: "#1976d2",
      },

      secondary: {
        main: "#00bcd4",
      },

      background: {
        default: darkMode ? "#121212" : "#f4f6f8",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
    },

    shape: {
      borderRadius: 12,
    },
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
      <ThemeProvider theme={theme}>
      <AppBar position="sticky"
      elevation={2}>

          <Toolbar>

              <Typography
                  variant="h5"
                  sx={{ flexGrow: 1 }}
              >
                  Natural Language to SQL Engine
              </Typography>

              <IconButton
                  color="inherit"
                  onClick={() => setDarkMode(!darkMode)}
              >

                  {darkMode ?

                      <LightModeIcon />

                      :

                      <DarkModeIcon />

                  }

              </IconButton>

          </Toolbar>

      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid container spacing={3}>

          {/* LEFT SIDEBAR */}

          <Grid size={{ xs: 12, md: 3 }}>

            <SchemaExplorer />

            <Paper sx={{ mt: 2, p: 2 }}>

              <QueryHistory
                history={history}
                setQuestion={setQuestion}
                setSql={setSql}
                setResult={setResult}
              />

            </Paper>

          </Grid>

          {/* RIGHT CONTENT */}

          <Grid size={{ xs: 12, md: 9 }}>

            <Paper elevation={4}
             sx={{ p: 3, mb: 3, borderRadius: 3, }}>

              <QuestionInput
                question={question}
                setQuestion={setQuestion}
                setSql={setSql}
                loading={loadingGenerate}
                setLoading={setLoadingGenerate}
              />

            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>

              <SQLBox
                question={question}
                sql={sql}
                setSql={setSql}
                setResult={setResult}
                history={history}
                setHistory={setHistory}
                loading={loadingExecute}
                setLoading={setLoadingExecute}
              />

            </Paper>

            <Paper sx={{ p: 3 }}>

              <ResultTable
                result={result}
              />

            </Paper>

          </Grid>

        </Grid>
      </Container>
      <ToastContainer
      position="top-right"
      autoClose={2500}
      newestOnTop
      />
      
      <Box
          sx={{
              mt: 5,
              py: 2,
              textAlign: "center",
              opacity: 0.7,
          }}
      >

          <Typography variant="body2">

              Built with React • FastAPI • SQLite • Gemini AI

          </Typography>

      </Box>

    </ThemeProvider>
  );
}

export default App;