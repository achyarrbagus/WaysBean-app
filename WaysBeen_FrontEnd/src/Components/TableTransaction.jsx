import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { useState } from "react";
import { API } from "../config/api";

function TableTransaction() {
  let { data: transaction, refetch } = useQuery("transactionCache", async () => {
    const response = await API.get("/transaction");
    return response.data.data;
  });
  const [dataTransaction, setDataTransaction] = useState();

  useEffect(() => {
    setDataTransaction(transaction);
    refetch();
    // console.log(dataTransaction);
  }, []);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }

  return (
    <Container style={{ marginTop: "100px" }}>
      <Table>
        <thead>
          <tr style={{ backgroundColor: "#E5E5E5", color: "#000000" }}>
            <th>Id Transaction</th>
            <th>Name</th>
            <th>Address</th>
            <th>Order Date</th>
            <th>Product Order</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transaction?.map((item, index) => {
            console.log(item.cart);
            return (
              <tr>
                <td>{item?.id}</td>
                <td>{item?.name}</td>
                <td>{item?.address}</td>
                <td>{formatDate(item?.created_at)}</td>
                <td>
                  {item.cart.map((product, indexProduct) => (
                    <ul>
                      <li style={{ listStyleType: "none" }}>{`${product.order_quantity} | ${product.product.name}`}</li>
                    </ul>
                  ))}
                  {/* {JSON.stringify(item.cart)} */}
                </td>
                <td>{item.status}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default TableTransaction;
