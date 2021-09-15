export function generate4digitNum() {
  return String(Math.floor(Math.random() * 10000) + 1001).slice(0, 4);
}
