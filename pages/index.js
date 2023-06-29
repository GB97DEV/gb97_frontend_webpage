import Head from "next/head";
import Script from "next/script";

import Build from "../components/custom/Build";

export default function Home() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
  return (
    <div>
      <Head>
        <title>GB97 - Ecuador</title>
        <meta
          name="description"
          content="Página WEB de GB97 Ecuador"
        />
        <link rel="icon" href="/logo.ico"/>
      </Head>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />

      <Script id='google-analytics-guide'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <Build />
    </div>
  );
}
