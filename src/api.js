const BASE = "http://localhost:3000/goals";
export const getGoals = () => fetch(BASE).then(r => r.json());
export const createGoal = g => fetch(BASE, {method: "POST", headers:{'Content-Type':'application/json'}, body: JSON.stringify(g)}).then(r => r.json());
export const updateGoal = (id, updates) => fetch(`${BASE}/${id}`, {method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify(updates)}).then(r=>r.json());
export const deleteGoal = id => fetch(`${BASE}/${id}`, {method:'DELETE'});
