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

export const ratingDescriptions = {
  1: 'Appalling',
  2: 'Horrible',
  3: 'Very Bad',
  4: 'Bad',
  5: 'Average',
  6: 'Fine',
  7: 'Good',
  8: 'Very Good',
  9: 'Great',
  10: 'Masterpiece',
};

// When we implement styling for other types like radio, checkbox etc, we would allow it here
const acceptedInputTypes = [
  'text',
  'number',
  'password',
  'email',
  'search',
  'tel',
  'url',
];

export const isAcceptedInputType = (type) => {
  return acceptedInputTypes.includes(type);
};

export const isStringInputType = (type) => {
  return acceptedInputTypes.filter((it) => it !== 'number').includes(type);
};

export const isNumberInputType = (type) => {
  return acceptedInputTypes.filter((it) => it === 'number').includes(type);
};
