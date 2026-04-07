import React, { useEffect, useState } from "react";

const API = "https://money-manager.onrender.com/api/transactions";

function TransactionList({ refresh }) {
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState(""); // ✅ NEW

useEffect(() => {
  loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [refresh]);

  useEffect(() => {
  if (selectedPerson && !groupedData[selectedPerson]) {
    setSelectedPerson(null);
  }
}, [data]);

  const loadData = async () => {
    try {
      const res = await fetch(API, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });

      const result = await res.json();

      if (Array.isArray(result)) {
        setData(result);
      } else {
        console.error("Error:", result);
        setData([]);
      }

    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // 💸 Payment
  const handlePayment = async (id) => {
    const amount = prompt("Enter amount to pay:");
    if (!amount) return;

    await fetch(`${API}/pay/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({ amount: Number(amount) })
    });

    setMsg("Payment Updated ✅");
    setTimeout(() => setMsg(""), 2000);

    loadData();
  };

  // ✏️ Edit
  const handleEdit = async (item) => {
    const newAmount = prompt("Enter new amount:", item.amount);
    const newPurpose = prompt("Enter new purpose:", item.purpose);

    await fetch(`${API}/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        amount: Number(newAmount),
        purpose: newPurpose
      })
    });

    setMsg("Updated Successfully ✅");
    setTimeout(() => setMsg(""), 2000);

    loadData();
  };

  // 🗑 Delete
  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });

    setMsg("Deleted Successfully 🗑️");
    setTimeout(() => setMsg(""), 2000);

    loadData();
  };

  const groupByPerson = () => {
  const grouped = {};

  data.forEach(item => {
    if (!grouped[item.person]) {
      grouped[item.person] = [];
    }
    grouped[item.person].push(item);
  });

  return grouped;
};

const groupedData = groupByPerson();

const [selectedPerson, setSelectedPerson] = useState(null);

  return (
  <div>
    <h2>Transactions</h2>

    {msg && (
      <div className="alert alert-info">{msg}</div>
    )}

    {/* ✅ IF NO PERSON SELECTED */}
    {!selectedPerson ? (
      Object.keys(groupedData).map(person => {
        const transactions = groupedData[person];

        // calculate total
        let total = 0;
        transactions.forEach(t => {
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
        {/* 🔙 BACK BUTTON */}
        <button
          className="btn btn-secondary mb-3"
          onClick={() => setSelectedPerson(null)}
        >
          ← Back
        </button>

        <h4>Transactions with {selectedPerson}</h4>

        {!groupedData[selectedPerson] || groupedData[selectedPerson].length === 0 ? (
  <p>No transactions left for this person</p>
) : (
  groupedData[selectedPerson].map(item => (
    <div key={item._id} className="card p-3 mb-2 shadow-sm">
      <p>
        💰 ₹{item.amount} ({item.type}) <br />
        📌 {item.purpose} <br />
        🔄 Remaining: ₹{item.remainingAmount} <br />
        📊 {item.status} <br />
        📅 {item.date
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