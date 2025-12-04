// Greedy allocation: sort desc by cb, allocate surplus to deficits
export function createPool(members: { shipId:string, cb_before:number }[]) {
  const sorted = [...members].sort((a,b)=>b.cb_before - a.cb_before);
  let i = 0, j = sorted.length - 1;
  const cb_after = sorted.map(m=>({ shipId: m.shipId, cb_before: m.cb_before, cb_after: m.cb_before }));

  while(i < j){
    const donor = cb_after[i];
    const receiver = cb_after[j];
    if(donor.cb_after <= 0){ i++; continue; }
    if(receiver.cb_after >= 0){ j--; continue; }
    const transfer = Math.min(donor.cb_after, Math.abs(receiver.cb_after));
    donor.cb_after -= transfer;
    receiver.cb_after += transfer;
    if(donor.cb_after <= 0) i++;
    if(receiver.cb_after >= 0) j--;
  }
  const poolSum = cb_after.reduce((s, m)=> s + m.cb_after, 0);
  return { members: cb_after, poolSum };
}
