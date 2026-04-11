import React, { useState, useEffect } from "react";
import AddTransaction from "../components/AddTransaction";
import TransactionList from "../components/TransactionList";
import Dashboard from "../components/Dashboard";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container mt-4">
      <button className="btn btn-danger mb-3" onClick={handleLogout}>
        Logout
      </button>

      <h2 className="text-center mb-4">Smart Money Manager</h2>

      <div className="row">
        <div className="col-md-4 col-12 mb-3">
          <Dashboard refresh={refresh} />
        </div>

        <div className="col-md-8 col-12 mb-3">
          <AddTransaction setRefresh={setRefresh} />
        </div>
      </div>

      <div className="mt-3">
        <TransactionList refresh={refresh} />
      </div>
    </div>
  );
}

export default Home;