const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

export const isURL = (input: string) => urlPattern.test(input);

export const isStringANumber = (input: string) => !isNaN(Number(input));
