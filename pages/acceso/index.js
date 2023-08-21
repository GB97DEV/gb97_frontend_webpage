import Head from "next/head";
import LoginForm from "../../components/basic/LoginForm";

export default function Acceso() {
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
      <LoginForm />
    </div>
  )
}