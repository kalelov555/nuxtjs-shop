export const containsObjectKeysAndValues = (container: any, contained: any) => {
  for (let key in contained) {
    // Check if key exists in the container object and values are the same
    if (!container.hasOwnProperty(key) || container[key] !== contained[key]) {
      return false;
    }
  }
  return true;
};
