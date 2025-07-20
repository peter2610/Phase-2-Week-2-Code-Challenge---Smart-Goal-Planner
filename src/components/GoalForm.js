import React, { useState } from "react";

const empty = { name:"", targetAmount:"", category:"", deadline:"" };

export default function GoalForm({ onSave }) {
  const [form, setForm] = useState(empty);
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = e => {
    e.preventDefault();
    if (!form.name || !form.targetAmount || !form.deadline) return alert("Please fill required fields");
    onSave({ ...form, savedAmount:0, createdAt:(new Date()).toISOString().split("T")[0] });
    setForm(empty);
  };

  return (
    <form className="form-group" onSubmit={submit}>
      <h3>Add New Goal</h3>

      <div className="form-group">
        <label>Name*</label>
        <input name="name" value={form.name} onChange={handle}/>
      </div>

      <div className="form-group">
        <label>Target Amount*</label>
        <input name="targetAmount" value={form.targetAmount} type="number" onChange={handle}/>
      </div>

      <div className="form-group">
        <label>Category</label>
        <input name="category" value={form.category} onChange={handle}/>
      </div>

      <div className="form-group">
        <label>Deadline*</label>
        <input name="deadline" value={form.deadline} type="date" onChange={handle}/>
      </div>

      <button type="submit">Add Goal</button>
    </form>
  );
}
