import Head from "next/head";
import Script from "next/script";

import Build from "../components/custom/Build";

export default function Home() {
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
      <Build />
    </div>
  );
}
