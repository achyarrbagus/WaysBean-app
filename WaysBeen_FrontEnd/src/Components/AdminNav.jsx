import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Icon from "../assets/icon.png";
import Profil from "../assets/Killua.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import Logo from "../assets/icon-2.png";
import Sampah from "../assets/Sampah.png";
import Biji from "../assets/BijiCoffee.png";

function AdminNav(props) {
  return (
    <Navbar
      expand="lg"
      className="container-fluid fixed-top"
      style={{ backgroundColor: "#F5F5F5", boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.25)" }}
    >
      <Container>
        <Navbar.Brand>
          <Link to={"/admin"}>
            <img src={Logo} width={"150px"} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll></Nav>
          <Form className="d-flex ">
            <Button style={{ backgroundColor: "transparent", padding: "", border: "none" }}>
              <Dropdown>
                <Dropdown.Toggle style={{ backgroundColor: "transparent", border: "none" }} id="dropdown-basic">
                  <img src={Profil} width={"50px"} style={{ borderRadius: "50%" }} />
                </Dropdown.Toggle>

                <Dropdown.Menu className="">
                  <Dropdown.Item>
                    <Link to={"/add-product"} style={{ textDecoration: "none", color: "#000000" }}>
                      <div className="d-flex gap-2">
                        <img width={"30px"} src={Biji} className="p-1" />
                        <p>Add Product</p>
                      </div>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to={"/list-product"} style={{ textDecoration: "none", color: "#000000" }}>
                      <div className="d-flex gap-2 ">
                        <img width={"30px"} src={Biji} className="p-1" />
                        <p>List Product</p>
                      </div>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to={"/"}>
                      <button onClick={props.admin} style={{ backgroundColor: "white", border: "none" }}>
                        <div className="d-flex gap-2 ">
                          <img width={"30px"} src={Sampah} className="p-1" />
                          <p>Logout</p>
                        </div>
                      </button>
                    </Link>
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

export default AdminNav;
