import React, { useState } from "react";

export default function GoalItem({ goal, onDeposit, onUpdate, onDelete }) {
  const [amount, setAmount] = useState("");
  const pct = Math.min(100, ((goal.savedAmount / goal.targetAmount) * 100).toFixed(1));
  const today = new Date();
  const deadline = new Date(goal.deadline);
  const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
  const overdue = daysLeft < 0;
  const close = daysLeft <= 30 && daysLeft >= 0;

  const handleDeposit = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;
    onDeposit({ id: goal.id, new: goal.savedAmount + amt });
    setAmount("");
  };

  return (
    <li className={`goal-item ${goal.savedAmount >= goal.targetAmount ? "completed" : overdue ? "overdue" : ""}`}>
      <h4>{goal.name}</h4>
      <p>Category: {goal.category || "N/A"}</p>
      <p>${goal.savedAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}</p>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }}></div>
      </div>

      {overdue && <p className="warning">Overdue by {-daysLeft} days</p>}
      {close && !overdue && <p className="warning">{daysLeft} days left</p>}

      <div>
        <input
          type="number"
          placeholder="Deposit amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <button onClick={handleDeposit}>Deposit</button>
      </div>

      <button onClick={() => {
        const name = prompt("New name", goal.name) || goal.name;
        const target = parseFloat(prompt("New target", goal.targetAmount)) || goal.targetAmount;
        const category = prompt("New category", goal.category) || goal.category;
        const deadline = prompt("New deadline", goal.deadline) || goal.deadline;
        onUpdate(goal.id, { name, targetAmount: target, category, deadline });
      }}>Edit</button>

      <button onClick={() => window.confirm("Delete this goal?") && onDelete(goal.id)}>
        Delete
      </button>
    </li>
  );
}
