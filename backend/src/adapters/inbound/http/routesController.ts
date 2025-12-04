import express from "express";
import { routeRepo } from "../../outbound/prisma/routeRepoPrisma";
import { computeComparison } from "../../../core/application/computeComparison";
import { computeCBForRoute } from "../../../core/application/computeCB";
import { getCBSnapshot, bankSurplus, applyBank } from "../../../core/application/banking";
import { createPool } from "../../../core/application/pooling";
import { prisma } from "../../outbound/prisma/prismaClient";

const router = express.Router();

router.get("/routes", async (req, res) => {
  const r = await routeRepo.getAll();
  res.json(r);
});

router.post("/routes/:id/baseline", async (req, res) => {
  const { id } = req.params;
  await routeRepo.setBaseline(id);
  res.json({ ok: true });
});

router.get("/routes/comparison", async (req, res) => {
  const all = await routeRepo.getAll();
  const baseline = all.find(a=>a.isBaseline) || all[0];
  const others = all.filter(a=>a.id !== baseline.id);
  res.json(computeComparison(baseline as any, others as any));
});

router.get("/compliance/cb", async (req, res) => {
  const year = Number(req.query.year || 2025);
  const snapshot = await getCBSnapshot(year);
  res.json(snapshot);
});

router.get("/compliance/adjusted-cb", async (req, res) => {
  const year = Number(req.query.year || 2025);
  // For demo return per-route cb_before
  const routes = await prisma.route.findMany({ where: { year }});
  const rows = routes.map(r=>({ shipId: r.routeId, cb_before: (89.3368 - r.ghgIntensity) * r.fuelConsumption * 41000, cb_after: null }));
  res.json(rows);
});

router.get("/banking/records", async (req, res) => {
  const year = Number(req.query.year || 2025);
  const records = await prisma.bankEntry.findMany({ where: { year }});
  res.json(records);
});

router.post("/banking/bank", async (req, res) => {
  const { year, amount } = req.body;
  if(!amount) return res.status(400).json({ error: "amount required" });
  const entry = await bankSurplus(Number(year), Number(amount));
  res.json(entry);
});

router.post("/banking/apply", async (req, res) => {
  const { year, amount } = req.body;
  try {
    const r = await applyBank(Number(year), Number(amount));
    res.json(r);
  } catch(e:any){
    res.status(400).json({ error: e.message });
  }
});

router.post("/pools", async (req, res) => {
  const { year, members } = req.body;
  // members: array of shipIds for demo
  const routes = await prisma.route.findMany({ where: { year: Number(year) }});
  const sel = routes.filter(r => members.includes(r.routeId)).map(r => ({ shipId: r.routeId, cb_before: (89.3368 - r.ghgIntensity) * r.fuelConsumption * 41000 }));
  const result = createPool(sel);
  // store pool and members
  const pool = await prisma.pool.create({ data: { year: Number(year) }});
  for(const m of result.members){
    await prisma.poolMember.create({ data: { poolId: pool.id, shipId: m.shipId, cb_before: m.cb_before, cb_after: m.cb_after }});
  }
  res.json({ poolId: pool.id, ...result });
});

export default router;
