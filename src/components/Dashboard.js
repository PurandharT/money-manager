import React, { useEffect, useState } from "react";
import API from "../api";

function Dashboard({ refresh }) {
  const [summary, setSummary] = useState({
    given: 0,
    taken: 0
  });

  useEffect(() => {
    fetch(`${API}/transactions`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) return;

        let given = 0;
        let taken = 0;

        data.forEach(item => {
          if (item.type === "given") {
            given += item.remainingAmount;
          } else {
            taken += item.remainingAmount;
          }
        });

        setSummary({ given, taken });
      });

  }, [refresh]);

  return (
    <div className="card p-3 shadow">
      <h4 className="mb-3">📊 Dashboard</h4>

      <p className="text-danger">💸 To Receive: ₹{summary.given}</p>
      <p className="text-success">💰 To Pay: ₹{summary.taken}</p>

      <hr />

      <h5>Balance: ₹{summary.given - summary.taken}</h5>
    </div>
  );
}

export default Dashboard;