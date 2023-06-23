import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col, Button } from "reactstrap";

const ErrorPage = () => {
  return (
    <div className="static-slider-head">
      <Head>
        <title>404 - Page not Found</title>
        <meta
          name="description"
          content="La pagina que estas buscando no existe"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row className="justify-content-center">
          <Col lg="8" md="6" className="align-self-center text-center">
            <h1 className="title">404 - Error</h1>
            <h4 className="subtitle font-light">
              La pagina que buscas aun esta en consturcción
              <br /> regresa mas tarde
            </h4>
            <Link href="/">
              <Button className="btn btn-md m-t-30 btn-info-gradiant font-14">
                Inicio
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ErrorPage;
