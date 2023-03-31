import { createContext, useContext, useState } from "react";

export const ContextGlobal = createContext();

export const ContextProvider = (props) => {
  const [state, setState] = useState(1);
  const [userState, setUserState] = useState([
    {
      email: "",
      password: "",
      fullname: "",
    },
  ]);
  const [userData, setUserData] = useState([
    {
      id: 0,
      email: "tahubulat@gmail.com",
      role: "admin",
      password: "12",
    },
    {
      id: 1,
      email: "tahukotak@gmail.com",
      password: "123",
    },
    {
      id: 2,
      email: "admin@gmail.com",
      role: "admin",
      password: "admin",
    },
    {
      id: 3,
      email: "tahubseg@gmail.com",
      password: "123",
    },
  ]);
  let [chartData, setChartData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [islogin, setLogin] = useState(false);

  const [adminlogin, setAdminLogin] = useState(false);

  let [stateQuantity, setStateQuantity] = useState();

  const [stateUpdProfile, setStateUpdProfile] = useState();
  const [showAlertTransaction, setShowAlertTransaction] = useState(false);

  let kumpulanState = {
    showAlertTransaction,
    setShowAlertTransaction,
    stateUpdProfile,
    setStateUpdProfile,
    adminlogin,
    setAdminLogin,
    islogin,
    setLogin,
    showModal,
    setShowModal,
    state,
    setState,
    userState,
    setUserState,
    userData,
    setUserData,
    userState,
    setUserState,
    chartData,
    setChartData,
    stateQuantity,
    setStateQuantity,
  };

  return <ContextGlobal.Provider value={{ kumpulanState }}>{props.children}</ContextGlobal.Provider>;
};
