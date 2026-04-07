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
  <h2 className="text-center mb-4">Smart Money Manager</h2>

  <div className="row">
    
    {/* Dashboard */}
    <div className="col-md-4 col-12 mb-3">
      <Dashboard refresh={refresh} />
    </div>

    {/* Add Transaction */}
    <div className="col-md-8 col-12 mb-3">
      <AddTransaction setRefresh={setRefresh} />
    </div>

  </div>

  {/* Transactions */}
  <div className="mt-3">
    <TransactionList refresh={refresh} />
  </div>
</div>
  );
}

export default Home;