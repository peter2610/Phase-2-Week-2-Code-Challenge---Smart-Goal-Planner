import React, { useState } from "react";

function DepositForm({ goal, onDeposit }) {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const numeric = parseFloat(amount);
    if (isNaN(numeric) || numeric <= 0) return;
    
    const newTotal = goal.savedAmount + numeric;

    onDeposit({ id: goal.id, new: newTotal });
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="deposit-form">
      <input
        type="number"
        placeholder="Deposit amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;
