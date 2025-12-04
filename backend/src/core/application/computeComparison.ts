import { Route } from "../domain/Route";

export function computeComparison(baseline: Route, others: Route[]) {
  return others.map(r => {
    const percentDiff = ((r.ghgIntensity / baseline.ghgIntensity) - 1) * 100;
    const compliant = r.ghgIntensity <= baseline.ghgIntensity;
    return { routeId: r.routeId, baseline: baseline.ghgIntensity, comparison: r.ghgIntensity, percentDiff, compliant };
  });
}
