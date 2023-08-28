import {useContext, useEffect} from 'react'
import Head from "next/head";
import LoginForm from "../../components/basic/LoginForm";
import { useRouter } from 'next/router';

export default function Acceso() {
  const router = useRouter();
  
  useEffect(() => {
    if(localStorage.getItem('token') !== null){
      router.replace("/guia")
    }
  },[]);

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