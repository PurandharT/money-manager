import React, { useState } from "react";
import AddTransaction from "../components/AddTransaction";
import TransactionList from "../components/TransactionList";
import Dashboard from "../components/Dashboard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
<button className="btn btn-danger mb-3" onClick={handleLogout}>
  Logout
</button>

function Home() {
  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem("token"); // ✅ ADD THIS

  if (!token) navigate("/");

}, [navigate]);

  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4"> Smart Money Manager</h1>

      <div className="container mt-4">
  <div className="row">

    <div className="col-md-4 mb-3">
      <Dashboard refresh={refresh} />
    </div>

    <div className="col-md-8 mb-3">
      <AddTransaction setRefresh={setRefresh} />
      <TransactionList refresh={refresh} />
    </div>

  </div>
</div>
    </div>
  );
}

export default Home;