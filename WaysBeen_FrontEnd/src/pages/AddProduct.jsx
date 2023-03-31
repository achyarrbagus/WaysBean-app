import { Form } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { useMutation } from "react-query";
import { API, setAuthToken } from "../config/api";
import { UserContext } from "../context/UserContext";

const AddProduct = () => {
  const navigate = useNavigate();
  //
  const [preview, setPreview] = useState(null);
  const [formProduct, setFormProduct] = useState({
    name: "name",
    price: "price",
    desc: "desc",
    stock: "stock",
    photo: "photo",
  });

  const handlerNewProductChange = (e) => {
    setFormProduct({
      ...formProduct,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handlerNewProduct = useMutation(async (e) => {
    try {
      e.preventDefault();
      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("name", formProduct.name);
      formData.set("price", formProduct.price);
      formData.set("desc", formProduct.desc);
      formData.set("stock", formProduct.stock);
      formData.set("photo", formProduct.photo[0]);
      const response = await API.post("/product", formData, config);
      setPreview(formProduct.photo);

      Swal.fire({
        icon: "success",
        title: "Your Product has been saved",
        showConfirmButton: false,
        timer: 2000,
      });
      console.log("Add Product Success", response);
      navigate("/list-product");
    } catch (error) {
      Swal.fire("AddProduct failed");
      console.log(error);
    }
  });

  return (
    <Container>
      <Container className="px-5" style={{ paddingTop: "100px", height: "80vh", backgroundColor: "" }}>
        <Row height={"50%"} className="p-1 justify-content-center">
          <Col md={8} className="">
            <Form onSubmit={(e) => handlerNewProduct.mutate(e)}>
              <h1 className="fs-3">Add Product</h1>
              <Form.Group className="my-3">
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handlerNewProductChange}
                  placeholder="Name"
                  style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                />
              </Form.Group>

              <Form.Group className="my-3" controlId="formBasicFullName">
                <Form.Control
                  type="number"
                  name="stock"
                  onChange={handlerNewProductChange}
                  placeholder="Stock"
                  style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                />
              </Form.Group>
              <Form.Group className="my-3" controlId="formBasicFullName">
                <Form.Control
                  type="number"
                  onChange={handlerNewProductChange}
                  name="price"
                  placeholder="Price"
                  style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                />
              </Form.Group>
              <Form.Group className="my-3" controlId="formBasicFullName">
                <Form.Control
                  as="textarea"
                  rows={5}
                  onChange={handlerNewProductChange}
                  name="desc"
                  placeholder="Description Product"
                  style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                />
              </Form.Group>
              <Form.Group controlId="formFile" className="mt-3 w-50 ">
                <Form.Control type="file" name="photo" onChange={handlerNewProductChange} />
              </Form.Group>
              <Container className=" d-flex justify-content-center mt-3">
                <button
                  className="d-flex justify-content-center align-items-center"
                  style={{ border: "none", width: "260px", height: "40px", backgroundColor: "#613D2B", color: "white" }}
                >
                  Add Product
                </button>
              </Container>
            </Form>
          </Col>
          <Col className="" md={4}>
            <img src={preview} width={"100%"} height={"auto"} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default AddProduct;
