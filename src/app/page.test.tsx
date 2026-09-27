import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home page", () => {
  it("shows the site name as the main heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: "The Wandering Library" }),
    ).toBeInTheDocument();
  });

  it("links to the About page", () => {
    render(<Home />);
    expect(
      screen.getByRole("link", { name: "How it works" }),
    ).toHaveAttribute("href", "/about");
  });
});
