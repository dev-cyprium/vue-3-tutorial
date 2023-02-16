export const findInSet = (set, callback) => {
  for (let item of set) {
    if (callback(item)) {
      return item;
    }
  }
};

export const findById = (arr, id) => {
  return arr.find((item) => item.id === id) ?? null;
};
