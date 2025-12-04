import { computeCB, TARGET_INTENSITY } from "../domain/formulas";

export function computeCBForRoute(route: any) {
  const cb = computeCB(TARGET_INTENSITY, route.ghgIntensity, route.fuelConsumption);
  return { shipId: route.routeId, year: route.year, cb_gco2eq: cb };
}
