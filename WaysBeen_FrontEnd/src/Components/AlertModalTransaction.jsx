import { Alert } from "react-bootstrap";

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { warning } from "@remix-run/router";

export default function AlertModalTransaction(props) {
  return (
    <>
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={props.status} onHide={props.handleClose}>
        <Alert className="mb-0" variant="success" show={props.status} onClose={props.handleClose} dismissible>
          <Alert.Heading className="text-center fs-3">Transaction Success</Alert.Heading>
          <p className="fs-5 text-center">Thank you for ordering in us, please wait 1 x 24 hours to verify you order</p>
        </Alert>
      </Modal>
    </>
  );
}
