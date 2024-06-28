import { useRouter } from 'next/router';
import Pedidos from '../../components/applications/Pedidos';
import Reportes from '../../components/applications/Reportes';
import ErrorPage from '../404';
import Alianza from '../../components/applications/Alianza';
import Track from '../../components/applications/Track';
import Produccion from '../../components/applications/Produccion';
import Head from "next/head";
import PVenta from '../../components/applications/PVenta';


const Redirection = ({ app }) => {
  switch (app) {
    case 'pedidos':
      return (
        <>
          <Head>
            <title>GB97 Pedidos Texil</title>
            <meta
              name="description"
              content="Aplicación de GB97 Pedidos Textil"
            />
            <link rel="icon" href="/logo.ico"/>
          </Head>
          <Pedidos />
        </>
      );
    case 'reportes':
      return (
        <>
          <Head>
            <title>GB97 Reportes Texil</title>
            <meta
              name="description"
              content="Aplicación de GB97 Reportes Textil"
            />
            <link rel="icon" href="/logo.ico"/>
          </Head>
          <Reportes />
        </>
      )
    case 'alianza':
      return (
        <>
          <Head>
            <title>Alianza Común</title>
            <meta
              name="description"
              content="Aplicación de Alianza Comun"
            />
            <link rel="icon" href="/logo.ico"/>
          </Head>
          <Alianza />;
        </>
      );
    case 'track':
      return (
        <>
          <Head>
            <title>GB97 Track</title>
            <meta
              name="description"
              content="Aplicación de GB97 Track"
            />
            <link rel="icon" href="/logo.ico"/>
          </Head>
          <Track />
        </>
      );
    case 'produccion':
      return (
        <>
          <Head>
            <title>GB97 Producción Textil</title>
            <meta
              name="description"
              content="Aplicación de GB97 Producción Textil"
            />
            <link rel="icon" href="/logo.ico"/>
          </Head>
          <Produccion />
        </>
      ); 
    // case 'punto-venta':
    //   return (
    //     <>
    //       <Head>
    //         <title>GB97 Punto de Venta</title>
    //         <meta
    //           name="description"
    //           content="Aplicación de GB97 Punto de Venta"
    //         />
    //         <link rel="icon" href="/logo.ico"/>
    //       </Head>
    //       <PVenta />
    //     </>
    //   );
    default:
      return <ErrorPage />;
  }
};

Redirection.getInitialProps = async ({ query }) => {
  const { app } = query;
  return { app };
};

export default Redirection;