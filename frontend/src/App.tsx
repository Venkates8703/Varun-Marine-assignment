import React from "react";
import Tabs from "./src/adapters/ui/components/Tabs";

export default function App() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">FuelEU Compliance Dashboard</h1>
      <Tabs />
    </div>
  );
}
