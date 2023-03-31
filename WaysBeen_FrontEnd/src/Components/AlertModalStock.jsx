import { Alert } from "react-bootstrap";

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { warning } from "@remix-run/router";

export default function AlertModalStock(props) {
  return (
    <>
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={props.status} onHide={props.handleClose}>
        <Alert className="mb-0" variant="danger" show={props.status} onClose={props.handleClose} dismissible>
          <Alert.Heading className="text-center fs-1">Ohh Sorry </Alert.Heading>
          <p className="text-center fs-5"> Your order is out of stock</p>
        </Alert>
      </Modal>
    </>
  );
}
