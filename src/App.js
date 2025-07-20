import React, { useState } from "react";
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";
import Overview from "./components/Overview";
import "./App.css";

export default function App() {
  const [goals, setGoals] = useState([]);

  const addGoal = (goal) => {
    const id = Date.now().toString();
    setGoals([...goals, { ...goal, id, savedAmount: 0 }]);
  };

  const updateGoal = (id, updatedData) => {
    setGoals(goals.map(g => g.id === id ? { ...g, ...updatedData } : g));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const depositToGoal = ({ id, new: newAmount }) => {
    setGoals(goals.map(g => g.id === id ? { ...g, savedAmount: newAmount } : g));
  };

  return (
    <div className="container">
      <h1>💰 Smart Goal Tracker</h1>
      <Overview goals={goals} />
      <GoalForm onSave={addGoal} />
      <GoalList goals={goals} onDeposit={depositToGoal} onUpdate={updateGoal} onDelete={deleteGoal} />
    </div>
  );
}
