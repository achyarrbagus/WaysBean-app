import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Modal, Button, Form } from "react-bootstrap";
import { useMutation } from "react-query";
import { json, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ContextGlobal } from "../context/Context";
import { API } from "../config/api";
import Swal from "sweetalert2";

// id undifiend
function UpdatedProfilModal({ show, closeModal, id, refetch }) {
  const [formData, setFormData] = useState({
    phone: "",
    gender: "",
    address: "",
    photo: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
    console.log(formData);
    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
    }
  };

  useEffect(() => {}, []);

  const navigate = useNavigate();
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // store data with FormData as Object
      const formProfil = new FormData();
      formProfil.set("phone", formData.phone);
      formProfil.set("gender", formData.gender);
      formProfil.set("address", formData.address);
      formProfil.set("photo", formData.photo[0]);

      const response = await API.patch("/profile/" + id, formProfil, config);
      Swal.fire("updated profil succes");
      window.location.href = "/";
      refetch();
    } catch (error) {
      console.log(error);
      console.log("updated profil failed");
    }
  });

  return (
    <>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                name="phone"
                value={FormData?.phone}
                placeholder="your number"
                autoFocus
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                placeholder="your gender"
                name="gender"
                value={formData?.gender}
                autoFocus
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>address</Form.Label>
              <Form.Control
                type="text"
                placeholder="your Address"
                name="address"
                value={formData?.address}
                autoFocus
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>foto</Form.Label>
              <Form.Control type="file" name="photo" autoFocus onChange={handleInputChange} />
            </Form.Group>
            <button variant="primary">Save Changes</button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdatedProfilModal;
