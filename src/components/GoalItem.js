import React, { useState } from "react";
import DepositForm from "./DepositForm";

export default function GoalItem({ goal, onDeposit, onUpdate, onDelete }) {
  const [editing, setEdit] = useState(false);
  const [amount, setAmount] = useState("");
  const pct = Math.min(100, (goal.savedAmount / goal.targetAmount * 100).toFixed(1));

  const handleDeposit = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;
    onDeposit({ id: goal.id, new: goal.savedAmount + amt });
    setAmount("");
  };

  const today = new Date(), dl = new Date(goal.deadline);
  const overdue = dl < today && goal.savedAmount < goal.targetAmount;
  const close = (dl - today)/86400000 < 30 && !overdue;

  return (
    <li className={`goal-item ${goal.savedAmount >= goal.targetAmount ? "completed" : overdue ? "overdue" : ""}`}>
      <h4>{goal.name}</h4>
      <p>${goal.savedAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}</p>
      <div className="progress-bar">
        <div className={`progress-fill ${overdue ? "overdue" : ""}`} style={{width:`${pct}%`}} />
      </div>
      {overdue && <p className="warning">Goal is overdue!</p>}
      {close && <p className="warning">Deadline within 30 days!</p>}

      <div style={{ marginBottom:"1rem" }}>
        <input type="number" placeholder="Deposit amount" value={amount} onChange={e => setAmount(e.target.value)} />
        <button onClick={handleDeposit}>Deposit</button>
      </div>

      <button onClick={() => {
        const name = prompt("New name", goal.name) || goal.name;
        const target = parseFloat(prompt("New target", goal.targetAmount)) || goal.targetAmount;
        const category = prompt("New category", goal.category) || goal.category;
        const deadline = prompt("New deadline", goal.deadline) || goal.deadline;
        onUpdate(goal.id, { name, targetAmount:target, category, deadline });
      }}>Edit</button>

      <button onClick={() => window.confirm("Delete this goal?") && onDelete(goal.id)} style={{marginLeft:".5rem", background:"#c0392b"}}>Delete</button>
    </li>
  );
}
