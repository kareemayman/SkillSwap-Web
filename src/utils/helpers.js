export function hasNullValue(obj) {
  if (obj == null) return true;
  if (typeof obj !== "object") return false;
  return Object.values(obj).some((value) => value === null || (typeof value === "object" && hasNullValue(value)));
}
