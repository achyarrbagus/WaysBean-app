import { Container, Row, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import produkOne from "../assets/produk-1.png";
import sampah from "../assets/Sampah.png";
import { useState } from "react";
import Order from "../assets/order.json";
import { ContextGlobal } from "../context/Context";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ShippingModal from "../Components/ShippingModal";
import Swal from "sweetalert2";
import { API } from "../config/api";
import { useQuery } from "react-query";
import AlertModalStock from "./../Components/AlertModalStock";

const ChartProduk = () => {
  const { kumpulanState } = useContext(ContextGlobal);
  const { setStateQuantity, setShowModal } = kumpulanState;
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  // fecthing data from database
  let { data: products } = useQuery("productsChace", async () => {
    const response = await API.get("/product");
    return response.data.data;
  });
  // fecthing data from local storage
  const dataChart = JSON.parse(localStorage.getItem("CHARTDATA"));
  useEffect(() => {
    setData(dataChart);
    //
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const totalPrice =
    dataChart.length > 0 &&
    dataChart.reduce((acc, item) => {
      return acc + item.priceProduct * item.quantity;
    }, 0);

  // alert(totalPrice);

  // const datalocal = JSON.parse(localStorage.getItem("CHARTDATA"));
  // setData(datalocal);
  // // setQuantity();
  // console.log(stateQuantity);

  // const totalPrice =
  //   data.length > 0 &&
  //   data.reduce((acc, item) => {
  //     const price = item.priceProduct || 0;
  //     const quantity = item.quantity || 0;
  //     return acc + price * quantity;
  //   }, 0);
  // const totalPrice = data.reduce((acc, { priceProduct = 0, quantity = 0 }) => acc + priceProduct * quantity, 0);

  const totalQuantity =
    data.length > 0 &&
    data.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);

  // let result = [];

  // let chartOrder = JSON.parse(localStorage.getItem("CHARTDATA"));
  // for (let x of chartOrder) {
  //   result.push(x.namaProduct);
  // }

  const handlerPay = () => {
    setShowModal(true);
  };

  // const incremeent = (index) => {
  //   const updateChart = [...data];
  //   const updateProduct = [...product];
  //   if (updateChart[index].quantity === updateProduct[index].stock) {
  //     return console.log(updateChart[index].quantity, updateProduct[index].stock);
  //     return Swal.fire({
  //       icon: "error",
  //       title: "Sorry, The Item You Want Is Out Of Stock",
  //       timer: 3000,
  //     });
  //   } else {
  //     updateChart[index].quantity += 1;
  //     setData(updateChart);
  //     localStorage.setItem("CHARTDATA", JSON.stringify(updateChart));
  //     window.dispatchEvent(new Event("storage"));
  //   }
  // };
  const incremeent = (index) => {
    const updateCart = [...dataChart];
    const foundProduct = products.find((item) => item.id === dataChart[index].id);

    if (updateCart[index].quantity === foundProduct.stock) {
      setShow(true);
    } else {
      updateCart[index].quantity += 1;
      setData(updateCart);
      localStorage.setItem("CHARTDATA", JSON.stringify(updateCart));
      window.dispatchEvent(new Event("storage"));
    }
  };

  const decremeent = (item, index) => {
    const updateChart = [...data];
    updateChart[index].quantity = Math.max(1, item.quantity - 1);
    setData(updateChart);
    localStorage.setItem("CHARTDATA", JSON.stringify(data));
    window.dispatchEvent(new Event("storage"));
  };

  const deleteItem = (index) => {
    setData(data.splice(index, 1));
    localStorage.setItem("CHARTDATA", JSON.stringify(data));
    window.location.reload();
    setStateQuantity();
    window.dispatchEvent(new Event("storage"));
    Swal.alert({
      icon: "success",
      title: "Delete Product Success",
      timer: 1500,
    });
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  return (
    <Container>
      <AlertModalStock status={show} handleClose={handleClose} />
      <ShippingModal price={totalPrice} setData={setData} />
      <Row className="justify-content-center" style={{ marginTop: "100px" }}>
        <Col className="fs-3">My Chart</Col>
      </Row>
      <br />
      <Row>
        <Col>
          <p className="fs-5">Review Your Order</p>
        </Col>
      </Row>
      <Row>
        {data.map((item, index) => (
          <Col md={7}>
            <div style={{ height: "1px", width: "100%", backgroundColor: "#613D2B" }}></div>
            <div className="p-3 d-flex justify-content-between gap-3">
              <div>
                <img width="70px" src={item.Image} />
              </div>
              <div>
                <div>
                  <h1 className="fs-4">{item.namaProduct}</h1>
                </div>
                <div className="d-flex gap-2">
                  <button className="fs-5" style={{ border: "none" }} onClick={() => decremeent(item, index)}>
                    -
                  </button>
                  <h3 className="fs-5 p-1 " style={{ backgroundColor: "#F6E6DA" }}>
                    {item.quantity}
                  </h3>
                  <button className="fs-5" style={{ border: "none" }} onClick={() => incremeent(index)}>
                    +
                  </button>
                </div>
              </div>
              <div className="">
                <div>
                  <h5>Rp.{item.priceProduct}</h5>
                </div>
                <div className="d-flex justify-content-end pt-3">
                  <button
                    className=""
                    onClick={() => deleteItem(index)}
                    style={{ border: "none", backgroundColor: "rgba(255,255,255,0.5)" }}
                  >
                    <img src={sampah} />
                  </button>
                </div>
              </div>
            </div>
            <div style={{ height: "1px", width: "100%", backgroundColor: "#613D2B" }}></div>
          </Col>
        ))}

        <Col md={5} className="p-3">
          <div style={{ height: "1px", width: "100%", backgroundColor: "#613D2B" }}></div>
          <div className="d-flex justify-content-between py-3">
            <div>
              <div>
                <p>SubTotal</p>
              </div>
              <div>
                <p>{totalQuantity}</p>
              </div>
            </div>
            <div>
              <div>
                <p>{totalPrice}</p>
              </div>
              <div>
                <p>{totalPrice}</p>
              </div>
            </div>
          </div>
          <div style={{ height: "1px", width: "100%", backgroundColor: "#613D2B" }}></div>
          <div className="d-flex justify-content-between mt-3">
            <div>
              <p>total</p>
            </div>
            <div>
              <p>{totalPrice}</p>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button
              onClick={handlerPay}
              style={{ backgroundColor: "#613D2B", width: "300px", color: "white", borderRadius: "5px" }}
            >
              Pay
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChartProduk;
