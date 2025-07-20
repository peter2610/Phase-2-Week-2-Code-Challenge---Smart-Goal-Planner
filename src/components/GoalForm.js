import React, { useState } from "react";

const empty = { name:"", targetAmount:"", category:"", deadline:"" };

export default function GoalForm({ onSave }) {
  const [form, setForm] = useState(empty);
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = e => {
    e.preventDefault();
    if (!form.name || !form.targetAmount || !form.deadline) {
      return alert("Please fill all required fields.");
    }
    onSave({ ...form, targetAmount: parseFloat(form.targetAmount) });
    setForm(empty);
  };

  return (
    <form className="form-group" onSubmit={submit}>
      <h3>Add New Goal</h3>

      <label>Name*</label>
      <input name="name" value={form.name} onChange={handle} />

      <label>Target Amount*</label>
      <input name="targetAmount" type="number" value={form.targetAmount} onChange={handle} />

      <label>Category</label>
      <select name="category" value={form.category} onChange={handle}>
        <option value="">-- Select Category --</option>
        <option value="Education">Education</option>
        <option value="Business">Business</option>
        <option value="Travel">Travel</option>
        <option value="Health">Health</option>
      </select>

      <label>Deadline*</label>
      <input name="deadline" type="date" value={form.deadline} onChange={handle} />

      <button type="submit">Add Goal</button>
    </form>
  );
}
