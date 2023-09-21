const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

export const isURL = (input: string) => {
  return urlPattern.test(input);
};

// Create an array of null values with a length equal to numberOfTimes
export const createArrayOfLength = (length: number) =>
  Array.from({ length }, (_, index) => index);

export const isStringANumber = (input: string) => {
  // Use parseFloat to attempt to convert the input to a number
  // isNaN returns true for values that cannot be converted to a number
  return !isNaN(parseFloat(input));
};
