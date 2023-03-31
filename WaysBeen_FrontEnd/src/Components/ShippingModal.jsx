import React, { useState } from "react";
import { ContextGlobal } from "../context/Context";
import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Modal, Button, Form } from "react-bootstrap";
import { json, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API } from "./../config/api";
import { useMutation } from "react-query";
import { Swal } from "sweetalert2";

const ShippingModal = (props) => {
  // console.log(props);
  const { kumpulanState } = useContext(ContextGlobal);
  const date = new Date();
  const navigate = useNavigate();
  const { showModal, setShowModal, setStateQuantity, showAlertTransaction, setShowAlertTransaction } = kumpulanState;
  const chartData = JSON.parse(localStorage.getItem("CHARTDATA"));
  const [price, setPrice] = useState(props.price);

  let result = [];

  for (let i = 0; i < chartData.length; i++) {
    let newObject = {
      id: chartData[i].id,
      orderQuantity: chartData[i].quantity,
    };
    result.push(newObject);
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    id: date.getTime(),
    products: result,
    price: props.price,
  });
  // const convertJson = JSON.stringify(formData);
  const emptyArray = [];

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const response = await API.post("/transaction", formData);

      const token = response.data.data.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          window.location.href = "/detail-transaction";
          localStorage.setItem("CHARTDATA", JSON.stringify([]));
          localStorage.setItem("isSuccess", JSON.stringify(true));
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/detail-transaction");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/detail-transaction");
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
      alert("transaction failed");
    }
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    console.log(formData);
  };
  return (
    <Container>
      {/* {setFormData({ ...formData, ["price"]: props.price })} */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="fs-2 fw-bolder">Payment Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              handleSubmit.mutate(e);
            }}
          >
            <Form.Group controlId="formBasicName" className="p-1">
              <Form.Label></Form.Label>
              <Form.Control
                style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nama"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="p-1">
              <Form.Label></Form.Label>
              <Form.Control
                style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Alamat Email"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicMessage" className="p-1">
              <Form.Label></Form.Label>
              <Form.Control
                style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Your Number"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicMessage" className="p-1">
              <Form.Label></Form.Label>
              <Form.Control
                style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Shipping Address"
                required
              />
            </Form.Group>

            <Button type="submit" style={{ backgroundColor: "#613D2B" }} className="w-100 mt-2">
              Pay
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
export default ShippingModal;
