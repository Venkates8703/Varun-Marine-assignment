// Simple bank: store and apply
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getCBSnapshot(year:number){
  // For demo: sum CB across routes
  const routes = await prisma.route.findMany({ where: { year }});
  // compute CBs inline
  const { computeCB } = require("../domain/formulas");
  let total = 0;
  for(const r of routes){
    total += ( (89.3368 - r.ghgIntensity) * r.fuelConsumption * 41000 );
  }
  return { cb_before: total, applied: 0, cb_after: total };
}

export async function bankSurplus(year:number, amount:number){
  // create a bank entry (global shipId 'fleet' for demo)
  return prisma.bankEntry.create({ data:{ shipId: "fleet", year, amount_gco2eq: amount }});
}

export async function applyBank(year:number, amount:number){
  // for demo: subtract from bank entry if exists
  const entry = await prisma.bankEntry.findFirst({ where:{ year }});
  if(!entry || entry.amount_gco2eq < amount) throw new Error("Insufficient banked");
  await prisma.bankEntry.update({ where:{ id: entry.id }, data:{ amount_gco2eq: entry.amount_gco2eq - amount }});
  return { applied: amount };
}
