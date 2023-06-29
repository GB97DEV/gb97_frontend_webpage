//@ts-ignore
import Head from "next/head";
import Script from "next/script";
import GuideBuild from "../../components/custom/GuideBuild";


const VideoGuide = () => {
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
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script id='google-analytics-guide'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
      </Script>
      <GuideBuild />
    </div>
  )
}

export default VideoGuide