import React, { useEffect, useState } from "react";
import api from "../../infrastructure/apiClient";
const TARGET = 89.3368;

export default function CompareTab(){
  const [rows, setRows] = useState<any[]>([]);
  useEffect(()=>{ fetch(); },[]);
  async function fetch(){
    const res = await api.get("/routes/comparison");
    setRows(res.data);
  }

  return (
    <div>
      <div className="mb-4">Target intensity (2025): <strong>{TARGET}</strong> gCO₂e/MJ</div>
      <table className="w-full text-sm">
        <thead><tr><th>routeId</th><th>baseline_g</th><th>compare_g</th><th>% diff</th><th>compliant</th></tr></thead>
        <tbody>
          {rows.map((r:any) => (
            <tr key={r.routeId} className="border-t">
              <td>{r.routeId}</td>
              <td>{r.baseline}</td>
              <td>{r.comparison}</td>
              <td>{( (r.comparison / r.baseline - 1) * 100 ).toFixed(2)}%</td>
              <td>{r.compliant ? "✅":"❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-sm text-gray-600">Simple chart omitted (can integrate recharts). Table shows baseline vs comparison.</div>
    </div>
  );
}
