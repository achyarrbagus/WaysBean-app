import { Container, Row, Col } from "react-bootstrap";
// import data from "../assets/data.json";
import "../styles.css";
import { json, Link, useParams } from "react-router-dom";
import { ContextGlobal } from "../context/Context";
import { useContext, useEffect, useState } from "react";
import produk1 from "../assets/produk-3.png";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/UserContext";
import { Swal } from "sweetalert2";

import { Modal } from "react-bootstrap";
import AlertModalStock from "./../Components/AlertModalStock";

//

const DetailProduk = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = parseInt(params.id);
  const { kumpulanState } = useContext(ContextGlobal);
  const { stateQuantity, setStateQuantity } = kumpulanState;
  const [product, setProduct] = useState({});
  const [state, dispatch] = useContext(UserContext);
  const [show, setShow] = useState(false);

  //
  let { data: productdDetail } = useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);
    return response.data.data;
  });

  useEffect(() => {
    setProduct(productdDetail);
  }, [productdDetail]);
  //

  const setQuantity = () => {
    const chartData = JSON.parse(localStorage.getItem("CHARTDATA"));
    if (chartData.length != 0) {
      const quantity = chartData.map((item) => item.quantity);
      let result = quantity.reduce((sum, quantity) => {
        return sum + quantity;
      });

      setStateQuantity(result);
    }
  };

  //
  const stockAlert = () => {
    // setShow(true);
    setShow(true);
  };

  const addChart = () => {
    let newChart = {
      namaProduct: product.name,
      priceProduct: product.price,
      id: id,
      quantity: 0,
      descriptionProduct: product.description,
      Image: product.photo,
    };

    const chartData = JSON.parse(localStorage.getItem("CHARTDATA"));
    // console.log(chartData);
    if (chartData === null) {
      newChart.quantity = 1;
      const newChartJson = JSON.stringify([newChart]);
      localStorage.setItem("CHARTDATA", newChartJson);
    } else {
      const indexChart = chartData.findIndex((e) => e.id === id);

      if (indexChart === -1) {
        newChart.quantity = 1;
        chartData.push(newChart);
        const chartDataJson = JSON.stringify(chartData);
        localStorage.setItem("CHARTDATA", chartDataJson);
      } else {
        if (chartData[indexChart].quantity === product?.stock) {
          return setShow(true);
        } else {
          chartData[indexChart].quantity += 1;

          const chartDataJson = JSON.stringify(chartData);
          localStorage.setItem("CHARTDATA", chartDataJson);
        }
      }
      const chartDataJson = JSON.stringify(chartData);
      localStorage.setItem("CHARTDATA", chartDataJson);
    }
    window.dispatchEvent(new Event("storage"));
  };

  const handleClose = () => setShow(false);

  return (
    <Container>
      <AlertModalStock status={show} handleClose={handleClose} />
      <Row style={{ marginTop: "150px", height: "70vh" }} className="justify-content-center d-flex gap-2">
        <Col md={4}>
          <img className="img-fluid" width={"100%"} src={product?.photo} />
        </Col>
        <Col md={6} className="py-5">
          <p className="openSans fs-1">{product?.name}</p>
          <p className="fs-5">{product?.stock}</p>
          <p className="fs-5">{product?.description}</p>
          <h2 className="text-end mt-5" style={{ color: "#974A4A" }}>
            Rp.{product?.price}
          </h2>
          {state.isLogin &&
            (product?.stock > 0 ? (
              <button
                style={{ width: "100%", height: "40px", borderRadius: "5px", color: "white", background: "#613D2B" }}
                className=""
                onClick={addChart}
              >
                Add Chart
              </button>
            ) : (
              <button
                style={{ width: "100%", height: "40px", borderRadius: "5px", color: "white", background: "#613D2B" }}
                className=""
                onClick={stockAlert}
              >
                Out Of Stock !!!
              </button>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default DetailProduk;
