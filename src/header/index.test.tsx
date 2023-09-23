import { render, screen } from "@testing-library/react";
import { Header } from "./index";

test("renders Condition Builder solution text", () => {
  render(<Header />);
  const linkElement = screen.getByText(/Condition Builder solution/i);
  expect(linkElement).toBeInTheDocument();
});

test("Logo image is present in the component", () => {
  const { getByAltText } = render(<Header />);
  const image = getByAltText("constellation logo");
  expect(image).toBeInTheDocument();
});
