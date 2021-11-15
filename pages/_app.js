import '../styles/globals.css'
import { AuthProvider, useAuth } from '../components/AuthContext'
import { Appbar } from '../components/Appbar'

function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <Appbar />
      <div style={{margin:"1em"}}>
      <Component {...pageProps} />
      </div>
    </AuthProvider>
  )
}

export default MyApp
