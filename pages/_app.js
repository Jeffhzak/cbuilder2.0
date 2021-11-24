import '../styles/globals.css'
import { AuthProvider, useAuth } from '../components/AuthContext'
import { Appbar } from '../components/Appbar'
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from '@mui/system';

function MyApp({ Component, pageProps }) {

  const theme = createTheme({
    palette: {mode:"dark"},
  });

  return (

    <ThemeProvider theme={theme}>
    <AuthProvider>
      <CssBaseline/>
      <Appbar />
      <Box sx={{m:"1em", mb:"10%"}}>
      <Component {...pageProps} />
      </Box>
    </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp
