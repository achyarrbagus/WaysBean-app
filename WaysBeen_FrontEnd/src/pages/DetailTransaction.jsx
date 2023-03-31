import { Container, Row, Col } from "react-bootstrap";
import Profil from "../assets/Killua.jpg";
import Icon from "../assets/icon.png";
import ProductOne from "../assets/produk-1.png";
import Qr from "../assets/qr.png";
import { json } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import UpdatedProfilModal from "../Components/UpdatedProfilModal";
import { ContextGlobal } from "../context/Context";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/UserContext";
import AlertModalTransaction from "../Components/AlertModalTransaction";

const DetailTransaction = () => {
  const { kumpulanState } = useContext(ContextGlobal);
  const { showAlertTransaction, setShowAlertTransaction } = kumpulanState;
  const [chart, setChart] = useState([]);
  const [show, setShow] = useState(false);
  const [state] = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);

  const fecthData = () => {
    const chart = JSON.parse(localStorage.getItem("CHARTDATA"));
    setChart(chart);
  };

  const id = state.user.id;

  let { data: data, refetch } = useQuery("profileCache", async () => {
    const response = await API.get("/profile/" + id);
    setIsLoading(false);
    return response.data.data;
  });

  useEffect(() => {
    setShowAlertTransaction(JSON.parse(localStorage.getItem("isSuccess")));
  }, []);

  let { data: transaction } = useQuery("transactionCache", async () => {
    try {
      const response = await API.get("/transaction-user");
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  });

  const updatedProfile = () => {
    setShow(true);
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  return (
    <Container style={{ marginTop: "100px" }}>
      <AlertModalTransaction
        status={showAlertTransaction}
        handleClose={() => {
          setShowAlertTransaction(false);
          localStorage.removeItem("isSuccess");
        }}
      />
      <UpdatedProfilModal show={show} closeModal={() => setShow(false)} id={id} refetch={refetch} />
      <Row style={{ padding: "50px", height: "60vh" }}>
        <Col className="">
          <div>
            <h3 className="fs-3">My Profil</h3>
          </div>
          <div className="d-flex gap-5">
            {data?.photo.length === 0 ? (
              <div className="mt-2">
                <img src={Profil} alt={"ini photo"} width={"100%"} />
              </div>
            ) : (
              <div className="mt-2">{!isLoading && <img src={data?.photo} alt={"ini photo"} width={"100%"} />}</div>
            )}
            <div>
              <div className="my-3">
                <h5>Full Name</h5>
                <h5>{state?.user.fullname}</h5>
              </div>
              <div className="my-3">
                <h5>Email</h5>
                <h5>{state?.user.email}</h5>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <button onClick={updatedProfile}>Update Profile</button>
          </div>
        </Col>
        <Col className="">
          <div>
            <h3 className="fs-3">My Transaction</h3>
          </div>
          <div className="d-flex">
            <div className="mt-2">
              {transaction?.map((item, index) => {
                const total = item?.cart.reduce((a, c) => {
                  const totalQty = a + c.order_quantity;
                  return totalQty;
                }, 0);
                console.log(transaction);

                if (item?.status === "waiting") {
                  return (
                    <Row className="p-4 mt-2" style={{ backgroundColor: "#F6E6DA" }}>
                      <Container className="d-flex gap-5 justify-content-betwen">
                        <div className="d-flex gap-2">
                          <div>
                            <img
                              className="img-fluid"
                              style={{ height: "180px", width: "170px" }}
                              src={item.cart[0].product.photo}
                              alt="ini photo"
                            />
                          </div>
                          <div className="d-flex flex-column gap-1">
                            <div>
                              <p className="fs-5 m-0">Order Date</p>
                              <p className="m-0">{formatDate(item?.created_at)}</p>
                            </div>
                            <div>
                              <p className="mt-2 mb-0">Price : Rp.{item?.price}</p>
                              <p className="m-0">Qty :{total}</p>
                              <p>Sub Total :{item?.price} </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div>
                            <img src={Icon} style={{ width: "120px" }} />
                          </div>
                          <div className="mt-3 d-flex justify-content-center">
                            <img src={Qr} />
                          </div>
                          <div className="mt-3" style={{ backgroundColor: "#613D2B" }}>
                            <p className="p-2" style={{ color: "white", textAlign: "center" }}>
                              Waiting Approve
                            </p>
                          </div>
                        </div>
                      </Container>
                    </Row>
                  );
                }
                if (item?.status === "success") {
                  return (
                    <Row className="p-4 mt-2" style={{ backgroundColor: "#F6E6DA" }}>
                      <Container className="d-flex gap-5 justify-content-betwen">
                        <div className="d-flex gap-2">
                          <div>
                            <img
                              className="img-fluid"
                              style={{ height: "180px", width: "170px" }}
                              src={item.cart[0].product.photo}
                              alt="ini photo"
                            />
                          </div>
                          <div className="d-flex flex-column gap-1">
                            <div>
                              <p className="fs-5 m-0">Order Date</p>
                              <p className="m-0">{formatDate(item?.created_at)}</p>
                            </div>
                            <div>
                              <p className="mt-2 mb-0">Price : Rp.{item?.price}</p>
                              <p className="m-0">Qty :{total}</p>
                              <p>Sub Total : {item?.price}</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div>
                            <img src={Icon} style={{ width: "120px" }} />
                          </div>
                          <div className="mt-3 d-flex justify-content-center">
                            <img src={Qr} />
                          </div>
                          <div className="mt-3" style={{ backgroundColor: "green" }}>
                            <p className="p-2" style={{ color: "white", textAlign: "center" }}>
                              Success
                            </p>
                          </div>
                        </div>
                      </Container>
                    </Row>
                  );
                }
                if (item?.status === "failed") {
                  <Row className="p-4 mt-2" style={{ backgroundColor: "#F6E6DA" }}>
                    <Container className="d-flex gap-5 justify-content-betwen">
                      <div className="d-flex gap-2">
                        <div>
                          <img
                            className="img-fluid"
                            src={item.cart[0].product.photo}
                            style={{ height: "180px", width: "170px" }}
                          />
                        </div>
                        <div className="d-flex flex-column gap-1">
                          <div>
                            <p className="fs-5 m-0">Order Date</p>
                            <p className="m-0">{formatDate(item?.created_at)}</p>
                          </div>
                          <div>
                            <p className="mt-2 mb-0">Price : Rp.{item?.price}</p>
                            <p className="m-0">Qty :{total}</p>
                            <p>Sub Total :{item?.price} </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <img src={Icon} style={{ width: "120px" }} />
                        </div>
                        <div className="mt-3 d-flex justify-content-center">
                          <img src={Qr} />
                        </div>
                        <div className="mt-3" style={{ backgroundColor: "#613D2B" }}>
                          <p className="p-2" style={{ color: "white", textAlign: "center" }}>
                            failed
                          </p>
                        </div>
                      </div>
                    </Container>
                  </Row>;
                }
              })}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailTransaction;
