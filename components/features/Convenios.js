import { Col, Container, Row } from "reactstrap";
import { ConveniosEPS } from "../../interface/ConveniosEPS";
import ConveniosCard from "../basic/ConveniosCard";

const Convenios = () => {
  return (
    <>
      <div className="feature4 pb-5 bg-light">
        <Container>
          <Row className="pt-4 pb-4 justify-content-center">
            <Col md="12" className="text-center">
              <h1 className="title">Nuestros Convenios</h1>
            </Col>
          </Row>
          <div className="pt-2 text-justify">
            Nuestro Proyecto Ecuadorable está en marcha desde el 2022 y vemos la necesidad de buscar mecanismos que nos permitan la coordinación entre otras instituciones para evitar la atomización de las actuaciones, sino más bien fomentar la complementariedad en beneficio de nuestra comunidad.
            Nuestro plan director tiene un enfoque abierto y muy participativo con aportaciones de diferentes actores del sector público y privado.   
          </div>
        </Container>
        <Container>
          <Row>
              {
                ConveniosEPS.map(item => {
                  return (
                    <Col key={item.name} md="4" className="mt-5">
                      <ConveniosCard title={item.name} image={item.imagen} size={item.size}/>
                    </Col>
                  )
                })
              }
          </Row>
        </Container>
      </div>
    </>
  )
};

export default Convenios;