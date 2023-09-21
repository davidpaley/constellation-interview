const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

export const isURL = (input: string) => {
  return urlPattern.test(input);
};
