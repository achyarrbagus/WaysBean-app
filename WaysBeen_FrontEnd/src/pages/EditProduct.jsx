import { Form } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import Swal from "sweetalert2";
import { useMutation } from "react-query";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
  });

  async function getDataUpdate() {
    const responseProduct = await API.get("/product/" + id);
    setPreview(responseProduct.data.data.photo);

    setForm({
      ...form,
      name: responseProduct.data.data.name,
      description: responseProduct.data.data.description,
      price: responseProduct.data.data.price,
      stock: responseProduct.data.data.stock,
    });
    setIsLoading(false);
  }

  useEffect(() => {
    getDataUpdate();
  }, []);

  const [editData, setEditData] = useState();

  const handleEditChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmitEdit = useMutation(async (e) => {
    try {
      e.preventDefault();
      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("name", form.name);
      formData.set("description", form.description);
      formData.set("price", form.price);
      formData.set("stock", form.stock);
      formData.set("photo", form.photo[0]);
      setPreview(form.photo);

      const response = await API.patch("/product/" + id, formData, config);
      console.log(response.data.data);
      Swal.fire({
        icon: "success",
        title: "Your Product has been updated",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/list-product");
    } catch (error) {
      console.log(form);
      console.log(error);
    }
  });

  return (
    <Container>
      <Container className="px-5" style={{ paddingTop: "100px", height: "80vh", backgroundColor: "" }}>
        <Row height={"100%"} className="p-1 justify-content-center">
          <Col md={8} className="">
            <Form onSubmit={(e) => handleSubmitEdit.mutate(e)}>
              <h1 className="fs-3">Add Product</h1>
              <Form.Group className="my-3" controlId="name">
                <Form.Control
                  type="text"
                  onChange={handleEditChange}
                  value={form?.name}
                  placeholder="Name Product"
                  name="name"
                  style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                />
              </Form.Group>

              <Form.Group className="my-3" controlId="stock">
                <Form.Control
                  type="text"
                  onChange={handleEditChange}
                  name="stock"
                  value={form?.stock}
                  placeholder="Stock"
                  style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                />
              </Form.Group>
              <Form.Group className="my-3" controlId="price">
                <Form.Control
                  type="text"
                  onChange={handleEditChange}
                  value={form?.price}
                  name="price"
                  placeholder="Price"
                  style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                />
              </Form.Group>
              <Form.Group className="my-3" controlId="descriptiont">
                <Form.Control
                  type="text"
                  onChange={handleEditChange}
                  name="description"
                  value={form?.description}
                  placeholder="Description Product"
                  style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                />
              </Form.Group>
              <Form.Group controlId="formFile" className="mt-3 w-50 ">
                <Form.Control type="file" name="photo" onChange={handleEditChange} />
              </Form.Group>
              <Container className=" d-flex justify-content-center mt-3">
                <button
                  className="d-flex justify-content-center align-items-center"
                  style={{ border: "none", width: "260px", height: "40px", backgroundColor: "#613D2B", color: "white" }}
                >
                  Edit Product
                </button>
              </Container>
            </Form>
          </Col>
          <Col className="" md={4}>
            <div style={{ width: "100%", height: "100%" }}>
              <img src={preview} width={"100%"} height={"100%"} />
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default EditProduct;
