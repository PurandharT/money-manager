import React, { useState } from "react";

const API = "http://localhost:5000/api/transactions";

function AddTransaction({ setRefresh }) {

  const [form, setForm] = useState({
  person: "",
  amount: "",
  type: "given",
  purpose: "",
  date: ""
});

  const [message, setMessage] = useState(""); // ✅ NEW

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
  ...form,
  remainingAmount: form.amount,
  date: form.date ? new Date(form.date) : new Date()
})
    });

    // ✅ SHOW MESSAGE
    setMessage("Transaction Added ✅");

    // auto hide after 2 sec
    setTimeout(() => {
      setMessage("");
    }, 2000);

    setRefresh(prev => !prev);

   setForm({
  person: "",
  amount: "",
  type: "given",
  purpose: "",
  date: ""
});
  };

  return (
    <div>
      {/* ✅ MESSAGE UI */}
      {message && (
        <div className="alert alert-success">
          {message}
        </div>
      )}

      <form className="card p-3 shadow mb-3" onSubmit={handleSubmit}>
        <h4>Add Transaction</h4>

        <input
  className="form-control mb-2"
  placeholder="Person"
  value={form.person}
  onChange={(e) => setForm({ ...form, person: e.target.value })}
/>

        <input
  className="form-control mb-2"
  type="number"
  placeholder="Amount ₹"
  value={form.amount}
  onChange={(e) => setForm({ ...form, amount: e.target.value })}
/>

        <select
  className="form-control mb-2"
  value={form.type}
  onChange={(e) => setForm({ ...form, type: e.target.value })}
>
          <option value="given">You Gave</option>
          <option value="taken">You Took</option>
        </select>

        <input
  className="form-control mb-2"
  placeholder="Purpose"
  value={form.purpose}
  onChange={(e) => setForm({ ...form, purpose: e.target.value })}
/>

<input
  className="form-control mb-2"
  type="date"
  value={form.date}
  onChange={(e) => setForm({ ...form, date: e.target.value })}
/>

<input
  type="number"
  inputMode="numeric"
  />

        <button className="btn btn-primary">Add</button>
      </form>
    </div>
  );
}

export default AddTransaction;