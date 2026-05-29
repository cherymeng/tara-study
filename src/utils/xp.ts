export function clampPercent(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function getProgressPercent(done: number, total: number) {
  if (total <= 0) return 0;
  return clampPercent((done / total) * 100);
}

export function getLevelProgressLabel(current: number, max = 100) {
  return `${current}/${max}`;
}
