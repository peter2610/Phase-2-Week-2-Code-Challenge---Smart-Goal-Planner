import React, {useEffect, useState} from "react";
import { getGoals, createGoal, updateGoal, deleteGoal } from "./api";
import Header from "./components/Header";
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";
import Overview from "./components/Overview";
import GoalItem from "./components/GoalItem";

import "./index.css";

function App(){
  const [goals, setGoals] = useState([]);
  useEffect(() => { getGoals().then(setGoals); }, []);

  const addGoal = newG => createGoal(newG).then(g => setGoals([...goals, g]));

  const changeGoal = (id, upd) => updateGoal(id, upd).then(g =>
    setGoals(goals.map(gg => gg.id === id ? g : gg))
  );

  const removeGoal = id => deleteGoal(id).then(() =>
    setGoals(goals.filter(gg => gg.id !== id))
  );

  return (
    <div className="container">
      <Header />
      <Overview goals={goals} />
      <GoalForm onSave={addGoal} />
      <GoalList
        goals={goals}
        onDeposit={amt => changeGoal(amt.id, { savedAmount: amt.new })}
        onUpdate={changeGoal}
        onDelete={removeGoal}
      />
    </div>
  );
}
export default App;
