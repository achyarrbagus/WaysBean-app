import { Row, Col, Container, Form } from "react-bootstrap";
import Icon from "../assets/icon-2.png";
import IconTri from "../assets/icon-3.png";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import produk1 from "../assets/produk-3.png";
import { ContextGlobal } from "../context/Context";
import { useContext } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";

//
import waves from "../assets/Waves.png";

const jContainer = {
  width: "1100px",
  marginTop: "100px",
  position: "relative",
  height: "150vh",
};

const rowBg = {
  padding: "50px",
  backgroundColor: "#DBB699",
  height: "450px",
  margin: "auto",
};

const imgRight = {
  position: "absolute",
  top: "30px",
  right: "-100px",
  width: "470px",
};

const colContainer = {
  marginTop: "50px",
  position: "relative",
};

const produk = {
  marginTop: "100px",
};

const cardColor = {
  backgroundColor: "#F7E6DA",
};
const waveStyle = {
  marginRight: "60px",
  marginTop: "50px",
};

function Jumbotron() {
  const { kumpulanState } = useContext(ContextGlobal);
  const { state, setState, stateQuantity, setStateQuantity } = kumpulanState;

  const [productData, setProductData] = useState([]);

  let { data: products } = useQuery("productsChace", async () => {
    const response = await API.get("/product");
    return response.data.data;
  });

  useEffect(() => {
    setProductData(products);
  }, [products]);

  // fecth data from local Storage
  // const fecthData = () => {
  //   const data = JSON.parse(localStorage.getItem("NEWPRODUCT"));
  //   setProductData(data);
  // };
  return (
    <Container style={jContainer}>
      <Row>
        <Col style={colContainer}>
          <div style={rowBg} className={""}>
            <img src={Icon} width="450px" />
            <h5 className="openSans fs-3">BEST QUALITY COFFEE BEANS</h5>
            <p>Quality freshly roasted coffee made just for you. Pour, brew and enjoy</p>
            <div className="d-flex justify-content-end " style={waveStyle}>
              <img src={waves} />
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <img src={IconTri} width="400px" style={imgRight} />
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center gap-5 mt-5">
        {products?.length !== 0 &&
          productData?.map((item, index) => {
            return (
              <Col md={3}>
                <Link to={`/detail-product/${item.id}`} style={{ textDecoration: "none", color: "black" }}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={item.photo} />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>
                        <p>Rp.{item.price}</p>
                        <p>Stock:{item.stock}</p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}

export default Jumbotron;
