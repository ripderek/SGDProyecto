import '@/styles/globals.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App({ Component, pageProps }) {

  //return <Component {...pageProps} />

  return (
    <GoogleOAuthProvider clientId="991886636860-3c06bj0m71bv01dg3eckn0f5jhjgrirp.apps.googleusercontent.com">
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}
