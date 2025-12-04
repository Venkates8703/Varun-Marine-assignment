import React, { useEffect, useState } from "react";
import api from "../../infrastructure/apiClient";

export default function PoolingTab(){
  const [year, setYear] = useState("2025");
  const [members, setMembers] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(()=>{ fetchAdjusted(); },[]);

  async function fetchAdjusted(){
    const res = await api.get(`/compliance/adjusted-cb?year=${year}`);
    setMembers(res.data);
  }

  async function createPool(){
    const res = await api.post("/pools", { year, members: selected });
    alert("Pool created, check response in console");
    console.log(res.data);
    fetchAdjusted();
  }

  return (
    <div>
      <div className="mb-3">
        <input value={year} onChange={(e)=>setYear(e.target.value)} className="border p-1 mr-2" />
        <button onClick={fetchAdjusted} className="px-3 py-1 bg-slate-700 text-white rounded">Fetch Adjusted</button>
      </div>

      <table className="w-full text-sm">
        <thead><tr><th></th><th>shipId</th><th>cb_before</th><th>cb_after</th></tr></thead>
        <tbody>
          {members.map(m=>(
            <tr key={m.shipId} className="border-t">
              <td><input type="checkbox" checked={selected.includes(m.shipId)} onChange={()=>{
                setSelected(s=> s.includes(m.shipId)? s.filter(x=>x!==m.shipId) : [...s,m.shipId]);
              }} /></td>
              <td>{m.shipId}</td><td>{m.cb_before}</td><td>{m.cb_after ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-3">
        <button onClick={createPool} className="px-3 py-1 bg-indigo-600 text-white rounded" disabled={selected.length===0}>Create Pool</button>
      </div>
    </div>
  );
}
