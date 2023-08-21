import Head from "next/head";
import VideoGuides from "../../components/features/VideoGuides";

export default function Guia () {
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
      <VideoGuides />
    </div>
  )
}