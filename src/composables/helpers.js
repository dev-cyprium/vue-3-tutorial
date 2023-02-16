export const findInSet = (set, callback) => {
  for (let item of set) {
    if (callback(item)) {
      return item;
    }
  }
};
