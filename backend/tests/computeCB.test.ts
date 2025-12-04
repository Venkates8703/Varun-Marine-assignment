import { computeCB } from "../src/core/domain/formulas";

test("computeCB positive surplus", () => {
  const cb = computeCB(89.3368, 88.0, 1000);
  // target - actual = 1.3368 -> positive times 41000 * 1000
  expect(cb).toBeCloseTo(1.3368 * 41000 * 1000);
});

test("computeCB deficit negative", () => {
  const cb = computeCB(89.3368, 91.0, 500);
  expect(cb).toBeCloseTo((89.3368 - 91.0) * 41000 * 500);
});
