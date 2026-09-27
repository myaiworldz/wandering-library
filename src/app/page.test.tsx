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

  it("shows a sample book journey with the book title and author", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: "A book's journey" }),
    ).toBeInTheDocument();
    expect(screen.getByText("The Little Prince by Antoine de Saint-Exupéry")).toBeInTheDocument();
  });

  it("shows the readers' notes in order, oldest first", () => {
    render(<Home />);
    const notes = screen.getAllByRole("listitem");
    expect(notes).toHaveLength(3);
    expect(notes[0]).toHaveTextContent("Priya, Norwich");
    expect(notes[1]).toHaveTextContent("Tom, Cambridge");
    expect(notes[2]).toHaveTextContent("Aisha, Ipswich");
  });
});
