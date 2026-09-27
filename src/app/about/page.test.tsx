import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import About from "./page";

describe("About page", () => {
  it("shows the 'How it works' heading", () => {
    render(<About />);
    expect(
      screen.getByRole("heading", { level: 1, name: "How it works" }),
    ).toBeInTheDocument();
  });

  it("explains the three steps", () => {
    render(<About />);
    expect(screen.getByText("Bring a book")).toBeInTheDocument();
    expect(screen.getByText("Swap it")).toBeInTheDocument();
    expect(screen.getByText("Leave a note")).toBeInTheDocument();
  });
});
