import Head from "next/head";
import RegistroOrganizacion from "../../components/features/RegistroOrganizacion";
import Layout from "../../layout/Layout";
export default function main (){
  return (
    <>
      <Head>
        <title>Registro</title>
        <meta
          name="description"
          content="Formulario de Registro"
        />
        <link rel="icon" href="/logo.ico"/>
      </Head>
      <RegistroOrganizacion />
    </>
  )
}