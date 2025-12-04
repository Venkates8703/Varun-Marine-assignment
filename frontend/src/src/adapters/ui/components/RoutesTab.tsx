import React, { useEffect, useState } from "react";
import api from "../../infrastructure/apiClient";
import { Route } from "../../core/domain/types";

export default function RoutesTab(){
  const [routes, setRoutes] = useState<Route[]>([]);
  const [filters, setFilters] = useState({ vesselType: "", fuelType: "", year: "" });

  useEffect(() => { fetchAll(); }, []);

  async function fetchAll(){
    const res = await api.get("/routes");
    setRoutes(res.data);
  }

  async function setBaseline(id:string){
    await api.post(`/routes/${id}/baseline`);
    fetchAll();
  }

  const filtered = routes.filter(r => {
    if(filters.vesselType && r.vesselType !== filters.vesselType) return false;
    if(filters.fuelType && r.fuelType !== filters.fuelType) return false;
    if(filters.year && String(r.year) !== filters.year) return false;
    return true;
  });

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input placeholder="vesselType" onChange={e=>setFilters(f=>({...f,vesselType:e.target.value}))} className="border p-1"/>
        <input placeholder="fuelType" onChange={e=>setFilters(f=>({...f,fuelType:e.target.value}))} className="border p-1"/>
        <input placeholder="year" onChange={e=>setFilters(f=>({...f,year:e.target.value}))} className="border p-1"/>
        <button onClick={fetchAll} className="px-3 py-1 bg-slate-700 text-white rounded">Refresh</button>
      </div>

      <table className="w-full text-sm">
        <thead><tr className="text-left"><th>routeId</th><th>vesselType</th><th>fuelType</th><th>year</th><th>ghgIntensity</th><th>fuel(t)</th><th>distance(km)</th><th>totalEmissions(t)</th><th></th></tr></thead>
        <tbody>
          {filtered.map(r=>(
            <tr key={r.id} className="border-t">
              <td>{r.routeId}</td><td>{r.vesselType}</td><td>{r.fuelType}</td><td>{r.year}</td>
              <td>{r.ghgIntensity}</td><td>{r.fuelConsumption}</td><td>{r.distance}</td><td>{r.totalEmissions}</td>
              <td><button onClick={()=>setBaseline(r.id)} className="px-2 py-1 bg-blue-600 text-white rounded">Set Baseline</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
