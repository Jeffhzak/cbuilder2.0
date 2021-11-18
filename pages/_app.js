import '../styles/globals.css'
import { AuthProvider, useAuth } from '../components/AuthContext'
import { Appbar } from '../components/Appbar'
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function MyApp({ Component, pageProps }) {

  const theme = createTheme({
    palette: {mode:"dark"},
  });

  return (

    <ThemeProvider theme={theme}>
    <AuthProvider>
      <CssBaseline/>
      <Appbar />
      <div style={{margin:"1em"}}>
      <Component {...pageProps} />
      </div>
    </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp
