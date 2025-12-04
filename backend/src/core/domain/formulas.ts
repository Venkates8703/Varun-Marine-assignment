export const ENERGY_MJ_PER_T = 41000;

export function computeCB(target: number, actual: number, fuelT: number) {
  // returns gCO2e
  return (target - actual) * fuelT * ENERGY_MJ_PER_T;
}

export const TARGET_INTENSITY = 89.3368;
