const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

export const isURL = (input: string) => {
  return urlPattern.test(input);
};

export const isStringANumber = (input: string) => {
  // Use parseFloat to attempt to convert the input to a number
  // isNaN returns true for values that cannot be converted to a number
  return !isNaN(parseFloat(input));
};
