import LandingPage from "./pages/LandingPage";
import DetailProduk from "./pages/DetailProduk";
import ChartProduk from "./pages/ChartProduk";
import AdminDhsbord from "./pages/AdminDhsbord";
import AddProduct from "./pages/AddProduct";
import ListProduk from "./pages/ListProduk";
import DetailTransaction from "./pages/DetailTransaction";
import EditProduct from "./pages/EditProduct";
import { ContextProvider } from "./context/Context";
import { ContextGlobal } from "./context/Context";
import { useContext, useEffect, useState } from "react";
import SharedLayout from "./Components/SharedLayout";
import PrivateRoute from "./Components/PrivateRoutes";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/UserContext";
import { useNavigate } from "react-router-dom";

import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

//

function App() {
  const client = new QueryClient();
  const navigate = useNavigate();
  //
  const [state, dispacth] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  //
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      // console.log("check user success", response);
      //get userData
      let payload = response.data.data;
      //get token from localStorage
      payload.token = localStorage.token;
      // send data to useContext
      dispacth({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      // console.log("check user failed : ", error);
      dispacth({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      // console.log(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === false) {
        console.log("state", state);
        navigate("/");
      }
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? null : (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/admin" element={<AdminDhsbord />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/list-product" element={<ListProduk />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
            </Route>

            <Route index element={<LandingPage />} />
            <Route path="/detail-product/:id" element={<DetailProduk />} />
            <Route path="/chart-product" element={<ChartProduk />} />
            <Route path="/detail-transaction" element={<DetailTransaction />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
