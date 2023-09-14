import "../styles/scss/style.scss";
import Layout from "../layout/Layout";
import Script from "next/script";
import { AuthProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Script
          src={"https://www.googletagmanager.com/gtag/js?id=G-S6V94DDDNW"}
        />
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-S6V94DDDNW');
            `}
        </Script>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
