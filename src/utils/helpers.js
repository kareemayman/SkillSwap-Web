export function hasNullValue(obj, parentKey = "") {
  if (obj == null) return true;

  if (typeof obj !== "object") return false;

  return Object.entries(obj).some(([key, value]) => {
    // ✅ Skip null check inside subscription
    if (parentKey === "subscription") return false;

    if (value === null) return true;

    if (typeof value === "object") {
      return hasNullValue(value, key);
    }

    return false;
  });
}
