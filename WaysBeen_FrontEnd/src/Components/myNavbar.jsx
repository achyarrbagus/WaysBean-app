import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Icon from "../assets/icon.png";
import Modal from "react-bootstrap/Modal";
import React from "react";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { json, Link } from "react-router-dom";
import "../styles.css";
import IsLoginNav from "./IsLoginNav";
import AdminNav from "./AdminNav";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useMutation } from "react-query";

//
import { ContextGlobal } from "../context/Context";
import { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { API, setAuthToken } from "../config/api";
import { UserContext } from "../context/UserContext";

const containerNav = {
  backgroundColor: "#F5F5F5",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.25)",
  border: "2px solid #613D2B",
};

const loginButton = {
  backgroundColor: "white",
  color: "#613D2B",
  border: "2px solid #613D2B",
  width: "100px",
};

const registerButton = {
  backgroundColor: "#613D2B",
  color: "white",
  width: "100px",
  border: "2px solid #613D2B",
};

const MyNavbar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showL, setShowL] = useState(false);

  const { kumpulanState } = useContext(ContextGlobal);
  const { userData, setUserData, islogin, setLogin, adminlogin, setAdminLogin } = kumpulanState;
  const [state, dispatch] = useContext(UserContext);

  const handleDiretToAdmin = () => {
    navigate("/admin");
  };

  const date = new Date();

  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleRegisterChange = (e) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };

  const { name: fullname, email, password } = formRegister;

  const handleRegisterSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.set("name", formRegister.name);
      formData.set("email", formRegister.email);
      formData.set("password", formRegister.password);
      const response = await API.post("/register", formData);
      console.log(response.data.data);

      console.log("register succeess", response);
      Swal.fire("Good job!", "You clicked the button!", "success");
      setFormRegister({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      Swal.fire("register failed");
      console.log(error);
    }
  });

  const handleLoginChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setInputLogin({ ...inputLogin, [name]: value });
  };

  //
  const [inputLogin, setInputLogin] = useState({
    email: "",
    password: "",
    tokenJwt: "",
  });

  //
  useEffect(() => {
    checkQty();
    window.addEventListener("storage", checkQty);
  }, []);

  //
  const [qty, setqty] = useState();
  const checkQty = () => {
    const chartData = JSON.parse(localStorage.getItem("CHARTDATA")) || [];
    let tmp = 0;
    chartData.map((item, index) => {
      tmp += item.quantity;
    });
    setqty(tmp);
  };

  //

  const handleCloseRegister = () => setShow(false);
  const handleShowRegister = () => setShow(true);
  //
  const handleCloseLogin = () => setShowL(false);
  const handleShowLogin = () => setShowL(true);
  //
  const TriggerBtnL = () => {
    setShowL(true);
    setShow(false);
  };
  //
  const TriggerBtnR = () => {
    setShowL(false);
    setShow(true);
  };

  const emptyArray = [];

  function setLogoutUser() {
    setLogin(false);
    localStorage.removeItem("token");
    localStorage.setItem("CHARTDATA", JSON.stringify(emptyArray));
    window.location.reload();
  }

  function setLogoutAdmin() {
    setAdminLogin(false);
    localStorage.removeItem("token");
    localStorage.setItem("CHARTDATA", JSON.stringify(emptyArray));

    window.location.reload();
  }
  //
  const handleLoginSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.set("email", inputLogin.email);
      formData.set("password", inputLogin.password);
      // Insert data for login process, you can also make this without any configuration, because axios would automatically handling it.
      const response = await API.post("/login", formData);
      // Send data to useContext

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });

      setAuthToken(response.data.data.token);

      console.log(response);
      if (response.data.data.role === "admin") {
        setAdminLogin(true);
        window.location.reload();
        navigate("/admin");
      } else if (response.data.data.role === "user") {
        setLogin(true);
        window.location.reload();
        navigate("/");
      }
      console.log(state);
      localStorage.setItem("CHARTDATA", JSON.stringify(emptyArray));
    } catch (error) {
      console.log(error);
      alert("login faileed");
    }
  });

  if (state.user.role === "admin") {
    return (
      <>
        <AdminNav
          admin={() => {
            setLogoutAdmin();
          }}
        />
        ;
      </>
    );
  } else if (state.user.role === "user") {
    return (
      <>
        <IsLoginNav login={() => setLogoutUser()} qty={qty} />;
      </>
    );
  } else {
    return (
      <>
        <Navbar expand="lg" className="container-fluid" style={containerNav} fixed="top">
          <Container bg="light">
            <Link to={"/"}>
              <Navbar.Brand>
                <img src={Icon} className="img-fluid" width={"163.11px"} height={"height: 47.11px;"} />
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll></Nav>
              <Form className="d-flex gap-2">
                <Button style={loginButton} onClick={() => handleShowLogin(true)}>
                  Login
                </Button>
                <Button style={registerButton} onClick={() => handleShowRegister(true)}>
                  Register
                </Button>
              </Form>
            </Navbar.Collapse>
          </Container>
          {/* register modal */}
          <Modal centered show={show} onHide={handleCloseRegister} backdrop="static" keyboard={false} className="w-100 ">
            <Modal.Header closeButton>
              <Modal.Title className="fs-2 fw-bolder">Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={(e) => handleRegisterSubmit.mutate(e)}>
                <div className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    required
                    onChange={handleRegisterChange}
                    style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                  />
                </div>
                <div className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    required
                    onChange={handleRegisterChange}
                    style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                  />
                </div>
                <div className="mb-3" controlId="formBasicFullName">
                  <Form.Control
                    type="text"
                    id="fullname"
                    name="name"
                    value={fullname}
                    required
                    placeholder="Full Name"
                    onChange={handleRegisterChange}
                    style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                  />
                </div>
                <Button type="submit" style={{ backgroundColor: "#613D2B" }} className="w-100">
                  Register
                </Button>
              </Form>
            </Modal.Body>

            <footer className="p-3">
              <p style={{ height: "20px" }} className="text-center">
                Already have an account ? Klik{" "}
                <span className="fw-bolder">
                  {" "}
                  <button onClick={TriggerBtnL} style={{ background: "none" }}>
                    Here
                  </button>
                </span>{" "}
              </p>
            </footer>
          </Modal>
          {/* end */}
          {/* login modal */}
          <Modal centered show={showL} onHide={handleCloseLogin} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title className="fs-2 fw-bolder">Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={(e) => handleLoginSubmit.mutate(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    name="email"
                    type="email"
                    onChange={handleLoginChange}
                    placeholder="Email"
                    style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    name="password"
                    value={inputLogin.password}
                    onChange={handleLoginChange}
                    type="password"
                    placeholder="Password"
                    style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                  />
                </Form.Group>
                <Button type="submit" style={{ backgroundColor: "#613D2B" }} className="w-100">
                  Login
                </Button>
              </Form>
            </Modal.Body>

            <footer className="p-3">
              <p style={{ height: "20px" }} className="text-center">
                Already have an account ? Klik{" "}
                <span className="fw-bolder">
                  <button onClick={TriggerBtnR} style={{ background: "none" }}>
                    Here
                  </button>
                </span>{" "}
              </p>
            </footer>
          </Modal>
          {/* end */}
        </Navbar>
      </>
    );
  }
};

export default MyNavbar;

//
