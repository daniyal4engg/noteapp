import { fireEvent, render, screen } from "@testing-library/react";
import NoteHome from "./components/NoteHome";

describe("NoteHome", () => {
  render(<NoteHome />);
  describe("form", () => {
    it("should render", () => {
      const form = screen.getByTestId("formContainer");
      expect(form).toBeInTheDocument();
    });
  });

  it("should give value", () => {
    render(<NoteHome />);
    const inp = screen.getByTestId("title");
    fireEvent.change(inp, { target: { value: "react" } });
    expect(inp).toHaveValue("react");
  });
});
