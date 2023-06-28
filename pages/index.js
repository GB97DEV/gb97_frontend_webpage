import Head from "next/head";
import Script from "next/script";

import Build from "../components/custom/Build";

export default function Home() {
  return (
    <div>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script id='google-analytics' strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <Head>
        <title>GB97 - Ecuador</title>
        <meta
          name="description"
          content="Página WEB de GB97 Ecuador"
        />
        <link rel="icon" href="/logo.ico"/>
      </Head>
      <Build />
    </div>
  );
}
