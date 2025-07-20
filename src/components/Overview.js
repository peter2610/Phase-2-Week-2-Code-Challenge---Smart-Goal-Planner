import React from "react";

export default function Overview({ goals }) {
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const completed = goals.filter(g => g.savedAmount >= g.targetAmount).length;
  const now = new Date();

  return (
    <section className="overview">
      <h2>Overview</h2>
      <p>Total goals: {goals.length}</p>
      <p>Total saved: ${totalSaved.toLocaleString()}</p>
      <p>Completed goals: {completed}</p>
      <h3>Deadlines & warnings:</h3>
      <ul>
        {goals.map(g => {
          const d = new Date(g.deadline);
          const daysLeft = Math.ceil((d - now)/86400000);
          if (g.savedAmount >= g.targetAmount) return null;
          return (
            <li key={g.id}>
              <strong>{g.name}</strong> - {daysLeft < 0 ? (
                <span className="warning">Overdue by {-daysLeft} days</span>
              ) : daysLeft < 30 ? (
                <span className="warning">{daysLeft} days left!</span>
              ) : ` ${daysLeft} days left.`}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
