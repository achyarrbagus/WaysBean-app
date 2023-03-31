import { Container, Table, Button } from "react-bootstrap";
import AdminNav from "../Components/AdminNav";
import { useState, useEffect } from "react";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Swal } from "sweetalert2";
import { useQuery } from "react-query";
import { API } from "./../config/api";
import { useMutation } from "react-query";

function ListProduk() {
  const [listProduct, setListProduct] = useState();
  const navigate = useNavigate();

  const handlerToEditProduct = (index) => {
    const convert = JSON.stringify(listProduct[index]);
    localStorage.setItem("EDITPRODUCT", convert);
    navigate(`/edit-product/${index}`);
  };

  let { data: dataProducts, refetch } = useQuery("productChace", async () => {
    const response = await API.get("/product");
    return response.data.data;
  });

  useEffect(() => {
    setListProduct(dataProducts);
  }, [dataProducts]);

  // Variabel for delete product data
  const handleDelete = useMutation(async (id) => {
    try {
      const response = await API.delete(`/product/${id}`);
      console.log(response);
      alert("Delete Data Success");
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Container style={{ marginTop: "200PX" }}>
      <Table className="mt-5">
        <thead>
          <tr style={{ backgroundColor: "#E5E5E5", color: "#000000" }}>
            <th>No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listProduct?.map((item, index) => {
            // console.log(item);
            return (
              <tr>
                <td>{item.id}</td>
                <td width={"20%"}>
                  <img src={item.photo} alt="ini gambar" width={"100%"} />
                </td>
                <td>{item.name}</td>
                <td>{item.stock}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td className="d-flex gap-1">
                  <Button className="btn-success" onClick={() => navigate(`/edit-product/${item.id}`)}>
                    Update
                  </Button>
                  <Button
                    className="btn-danger"
                    onClick={() => {
                      handleDelete.mutate(item.id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListProduk;
