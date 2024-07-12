export function range(start, stop) {
  return Array.from({ length: stop - (start - 1) }, (_, i) => i + 1);
}
