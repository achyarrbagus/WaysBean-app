import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ChartBucket from "../assets/ShoopingBucketN.png";
import Profil from "../assets/Killua.jpg";
import Icon from "../assets/icon.png";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Profile1 from "../assets/user2.png";
import Logout from "../assets/logout.png";
import { Badge } from "react-bootstrap";
import { ContextGlobal } from "../context/Context";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";

function IsLoginNav(props) {
  const { kumpulanState } = useContext(ContextGlobal);
  const [state] = useContext(UserContext);
  const { stateQuantity, setStateQuantity } = kumpulanState;

  // useEffect(() => {}, []);

  //   window.addEventListener("storage", handleStorageChange);
  // }, []);

  // const [qty, setqty] = useState(0);
  // const checkQty = () => {
  //   const chartData = JSON.parse(localStorage.getItem("CHARTDATA")) || [];
  //   let tmp = 0;
  //   chartData.map((item, index) => {
  //     tmp += item.quantity;
  //   });
  //   setqty(tmp);
  // };

  return (
    <Navbar bg="light" expand="lg">
      <Container
        fluid
        style={{
          backgroundColor: "#F5F5F5",
          height: "80px",
          boxShadow: " 0px 10px 30px rgba(0, 0, 0, 0.25)",
          padding: "0 5rem",
        }}
        className="fixed-top"
      >
        <Navbar.Brand>
          <Link to={"/"}>
            <img src={Icon} width={"150px"} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll></Nav>
          <Form className="d-flex gap-2">
            <Button variant="">
              <Link to={"/chart-product"}>
                <h1 className="position-relative d-inline-flex align-items-center">
                  <img src={ChartBucket} alt="..." style={{ width: "50px", height: "auto" }} />
                  <Badge pill className="fs-6" bg="danger" style={{ position: "absolute", top: 0, right: 0 }}>
                    {props.qty}
                  </Badge>
                </h1>
              </Link>
            </Button>
            <Button variant="">
              <Dropdown>
                <Dropdown.Toggle style={{ backgroundColor: "transparent", border: "none" }} id="dropdown-basic">
                  {state.user.profile.photo.length === 0 ? (
                    <img src={Profil} width={"50px"} style={{ borderRadius: "50%" }} />
                  ) : (
                    <img src={state.user.profile.photo} width={"50px"} style={{ borderRadius: "50%" }} />
                  )}
                </Dropdown.Toggle>

                <Dropdown.Menu className="p-2">
                  <Dropdown.Item>
                    <Link to={`/detail-transaction`} style={{ textDecoration: "none", color: "#000000" }}>
                      <div className="d-flex gap-2">
                        {state.user.profile.photo.length === 0 ? (
                          <img src={Profil} width={"30px"} />
                        ) : (
                          <img src={state.user.profile.photo} width={"30px"} />
                        )}

                        <p>Profil</p>
                      </div>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <button
                      className=""
                      onClick={props.login}
                      style={{ textDecoration: "none", color: "#000000", border: "none", backgroundColor: "transparent" }}
                    >
                      <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
                        <div className="d-flex gap-2">
                          <img src={Logout} width={"30px"} />
                          <p>Logout</p>
                        </div>
                      </Link>
                    </button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default IsLoginNav;
