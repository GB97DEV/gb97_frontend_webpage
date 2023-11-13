import Head from "next/head";
import { Nosotros } from "../../components/features/Nosotros";
export default function main (){
  return (
    <>
      <Head>
        <title>Sobre Nosotros</title>
        <meta
          name="description"
          content="Sobre nosotros GB97 Ecuador"
        />
        <link rel="icon" href="/logo.ico"/>
      </Head>
      <Nosotros />
    </>
  )
}