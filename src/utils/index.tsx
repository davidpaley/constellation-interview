const urlPattern =
  /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(:[0-9]+)?(\/\S*)?$/;

export const isURL = (input: string) => {
  return urlPattern.test(input);
};
