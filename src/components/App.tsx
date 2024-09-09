import React from "react";
import "../index.css";
import PersonalBudgetTracker from "../pages/PersonalBudgetTracker";

function App() {
  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-green-600">
          Personal Budget Tracker
        </h1>
      </div>
      <PersonalBudgetTracker />
    </div>
  );
}

export default App;
