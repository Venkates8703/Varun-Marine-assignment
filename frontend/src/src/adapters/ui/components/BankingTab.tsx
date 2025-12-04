import React, { useEffect, useState } from "react";
import api from "../../infrastructure/apiClient";

export default function BankingTab(){
  const [year, setYear] = useState<string>("2025");
  const [cb, setCb] = useState<any>(null);
  const [amount, setAmount] = useState<number>(0);

  useEffect(()=>{ fetchCb(); },[]);

  async function fetchCb(){
    const res = await api.get(`/compliance/cb?year=${year}`);
    setCb(res.data);
  }

  async function bank(){
    if(!cb || cb.cb_before <= 0) return alert("No positive CB to bank");
    await api.post("/banking/bank", { year, amount: cb.cb_before });
    fetchCb();
  }

  async function apply(){
    await api.post("/banking/apply", { year, amount });
    fetchCb();
  }

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input value={year} onChange={e=>setYear(e.target.value)} className="border p-1"/>
        <button onClick={fetchCb} className="px-3 py-1 bg-slate-700 text-white rounded">Fetch</button>
      </div>

      {cb && <div>
        <div>cb_before: {cb.cb_before}</div>
        <div>applied: {cb.applied ?? 0}</div>
        <div>cb_after: {cb.cb_after}</div>
        <div className="mt-2">
          <button onClick={bank} disabled={cb.cb_before <= 0} className="px-3 py-1 bg-green-600 text-white rounded mr-2">Bank Positive CB</button>
          <input type="number" value={amount} onChange={(e)=>setAmount(Number(e.target.value))} className="border p-1 mr-2" />
          <button onClick={apply} className="px-3 py-1 bg-blue-600 text-white rounded">Apply Banked</button>
        </div>
      </div>}
    </div>
  );
}
