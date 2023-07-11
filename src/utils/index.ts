export const getKeysAsString = (obj: Record<string, any>): string => {
  return Object.keys(obj).join(", ");
};
