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

export const readingStateLabels = {
  currently: 'Currently reading',
  completed: 'Completed',
  todo: 'Plan to read',
  onhold: 'On hold',
  dropped: 'Dropped',
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

export const readingStateColorMapping = {
  todo: 'bg-sky-50 text-sky-600',
  currently: 'bg-violet-50 text-violet-600',
  completed: 'bg-teal-50 text-teal-600',
  onhold: 'bg-amber-50 text-amber-600',
  dropped: 'bg-rose-50 text-rose-600',
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

export const isNumberInputType = (type) => {
  return acceptedInputTypes.filter((it) => it === 'number').includes(type);
};

export const isStringInputType = (type) => {
  return !isNumberInputType(type);
};

export const getAppropriateReadingState = ({
  read,
  maxToRead,
  previousState,
  currentState,
}) => {
  if (read === 0) return 'todo';

  if (read < maxToRead) {
    if (currentState === 'onhold' || currentState === 'dropped')
      return currentState;

    if (previousState === 'onhold' || previousState === 'dropped')
      return previousState;

    return 'currently';
  }

  return 'completed';
};

export const getRatingOptions = () => {
  return Object.entries(ratingDescriptions)
    .reduce((acc, current) => {
      const rating = +current[0];
      const ratingDescription = current[1];
      let value = ratingDescription.toLowerCase().split(' ');

      if (value.length > 1) {
        value = value.join('_');
      } else {
        value = value[0];
      }

      return [
        ...acc,
        {
          name: `(${rating}) ${ratingDescription}`,
          value: value,
          rating,
        },
      ];
    }, [])
    .reverse();
};

export const getRatingValueForKey = (ratingKey) => {
  if (!ratingKey) return 'No rating';

  return (
    getRatingOptions().find((ratingOption) => ratingOption.value === ratingKey)
      ?.name ?? 'No rating'
  );
};
