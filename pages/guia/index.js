import Head from "next/head";
import VideoGuides from "../../components/features/VideoGuides";
import VideoGuidesStatic from "../../components/features/VideoGuidesStatic";

export default function Guia () {
  const isDev = true;
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
      {
        isDev? <VideoGuides /> : <VideoGuidesStatic />
      }
    </div>
  )
}