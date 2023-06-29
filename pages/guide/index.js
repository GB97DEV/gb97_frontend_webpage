import Head from "next/head";
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
      <GuideBuild />
    </div>
  )
}

export default VideoGuide