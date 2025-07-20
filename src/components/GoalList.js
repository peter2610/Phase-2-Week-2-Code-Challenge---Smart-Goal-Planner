import React from "react";
import GoalItem from "./GoalItem";

export default function GoalList({ goals, onDeposit, onUpdate, onDelete }) {
  if (goals.length === 0) {
    return <p className="no-goals">No goals added yet.</p>;
  }

  return (
    <ul className="goal-list">
      {goals.map(g => (
        <GoalItem
          key={g.id}
          goal={g}
          onDeposit={onDeposit}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
