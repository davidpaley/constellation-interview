import { isURL, isStringANumber } from "./index";

describe("isURL", () => {
  it("should return true for a valid URL", () => {
    expect(isURL("https://www.example.com")).toBe(true);
    expect(isURL("http://example.com")).toBe(true);
    expect(isURL("ftp://ftp.example.com")).toBe(true);
  });

  it("should return false for an invalid URL", () => {
    expect(isURL("not a URL")).toBe(false);
    expect(isURL("www.example.com")).toBe(false);
  });
});

describe("isStringANumber", () => {
  it("should return true for a valid number string", () => {
    expect(isStringANumber("123")).toBe(true);
    expect(isStringANumber("0")).toBe(true);
    expect(isStringANumber("-1")).toBe(true);
  });

  it("should return false for an invalid number string", () => {
    expect(isStringANumber("abc")).toBe(false);
    expect(isStringANumber("")).toBe(false);
  });
});
