import { Card, Row, Col, CardBody, CardHeader, CardImg, CardImgOverlay, CardText, CardTitle, CardFooter } from "reactstrap"
import Image from "next/image"
export const ApplicationCard = ({fondo, logo, title, content, href}) => {
  return(
    <Card className="application-card" inverse>
      <CardImg 
        src={fondo}
        style={{
          height: "100%"
        }}
        width={"100%"}
      />
      <CardImgOverlay className="text-container">
        <CardTitle className="title-card text-center" tag={"h3"}>
          <Row className="d-flex justify-content-center">
            <Image 
              src={logo}
              width={80}
              height={80}
            />
          </Row>
          {title}
        </CardTitle>
        <CardText className="subtitle-card text-justify">
          {content}
        </CardText>
        <CardFooter className="application-footer">
          <a href={href} className="btn-application">
            Conocer Mas
          </a>
        </CardFooter>
      </CardImgOverlay>
    </Card>
  )
}