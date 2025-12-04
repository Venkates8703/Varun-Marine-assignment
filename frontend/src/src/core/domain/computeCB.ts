export function computeCB(target: number, actual: number, fuelT: number) {
  // (target - actual) * fuelT * 41000  => result in gCO2e (since target and actual are gCO2e/MJ, energy MJ)
  return (target - actual) * fuelT * 41000;
}
