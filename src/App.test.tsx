import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Condition Builder solution text", () => {
  render(<App />);
  const linkElement = screen.getByText(/Condition Builder solution/i);
  expect(linkElement).toBeInTheDocument();
});

test("Logo image is present in the component", () => {
  const { getByAltText } = render(<App />);
  const image = getByAltText("constellation logo");
  expect(image).toBeInTheDocument();
});
