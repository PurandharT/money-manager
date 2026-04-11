import React, { useEffect, useState } from "react";
import API from "../api";

function TransactionList({ refresh }) {
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);

  const loadData = async () => {
    try {
      const res = await fetch(`${API}/transactions`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await res.json();
      console.log("FETCHED DATA:", result); // ✅ DEBUG

      if (Array.isArray(result)) {
        setData(result);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, [refresh]);

  useEffect(() => {
    if (selectedPerson && !data.find(d => d.person === selectedPerson)) {
      setSelectedPerson(null);
    }
  }, [data, selectedPerson]);

  const handlePayment = async (id) => {
    const amount = prompt("Enter amount to pay:");
    if (!amount) return;

    await fetch(`${API}/transactions/pay/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ amount: Number(amount) }),
    });

    setMsg("Payment Updated ✅");
    setTimeout(() => setMsg(""), 2000);
    loadData();
  };

  const handleEdit = async (item) => {
    const newAmount = prompt("Enter new amount:", item.amount);
    const newPurpose = prompt("Enter new purpose:", item.purpose);

    await fetch(`${API}/transactions/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        amount: Number(newAmount),
        purpose: newPurpose,
      }),
    });

    setMsg("Updated Successfully ✅");
    setTimeout(() => setMsg(""), 2000);
    loadData();
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/transactions/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setMsg("Deleted Successfully 🗑️");
    setTimeout(() => setMsg(""), 2000);
    loadData();
  };

  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.person]) acc[item.person] = [];
    acc[item.person].push(item);
    return acc;
  }, {});

  return (
    <div>
      <h2>Transactions</h2>

      {msg && <div className="alert alert-info">{msg}</div>}

      {!selectedPerson ? (
        Object.keys(groupedData).map((person) => {
          const transactions = groupedData[person];

          let total = 0;
          transactions.forEach((t) => {
            if (t.type === "given") total += t.remainingAmount;
            else total -= t.remainingAmount;
          });

          return (
            <div
              key={person}
              className="card p-3 mb-3 shadow-sm"
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedPerson(person)}
            >
              <h5>👤 {person}</h5>
              <p>Net Balance: ₹{total}</p>
            </div>
          );
        })
      ) : (
        <div>
          <button
            className="btn btn-secondary mb-3"
            onClick={() => setSelectedPerson(null)}
          >
            ← Back
          </button>

          <h4>Transactions with {selectedPerson}</h4>

          {!groupedData[selectedPerson] ? (
            <p>No transactions left</p>
          ) : (
            groupedData[selectedPerson].map((item) => (
              <div key={item._id} className="card p-3 mb-2 shadow-sm">
                <p>
                  💰 ₹{item.amount} ({item.type}) <br />
                  📌 {item.purpose} <br />
                  🔄 Remaining: ₹{item.remainingAmount} <br />
                  📊 {item.status} <br />
                  📅{" "}
                  {item.date
                    ? new Date(item.date).toLocaleDateString("en-GB")
                    : "No Date"}
                </p>

                <div className="d-flex gap-2">
                  {item.status !== "completed" && (
                    <button
                      className="btn btn-warning"
                      onClick={() => handlePayment(item._id)}
                    >
                      Pay
                    </button>
                  )}

                  <button
                    className="btn btn-info"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default TransactionList;