import React, { useState } from "react";
import RoutesTab from "./RoutesTab";
import CompareTab from "./CompareTab";
import BankingTab from "./BankingTab";
import PoolingTab from "./PoolingTab";

const tabs = ["Routes", "Compare", "Banking", "Pooling"] as const;

export default function Tabs() {
  const [tab, setTab] = useState<typeof tabs[number]>("Routes");
  return (
    <div>
      <div className="flex gap-2 mb-4">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-3 py-1 rounded ${tab===t? 'bg-slate-800 text-white':'bg-white border'}`}>{t}</button>
        ))}
      </div>
      <div className="bg-white p-4 rounded shadow">
        {tab === "Routes" && <RoutesTab />}
        {tab === "Compare" && <CompareTab />}
        {tab === "Banking" && <BankingTab />}
        {tab === "Pooling" && <PoolingTab />}
      </div>
    </div>
  );
}
