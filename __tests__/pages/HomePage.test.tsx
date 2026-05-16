import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import type { RenderResult } from "@testing-library/react";

import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";

import HomePage from "@/pages/HomePage/HomePage";

const renderPage = (): RenderResult => {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
};

describe("HomePage", () => {
  describe("rendering", () => {
    it("should render the page title", () => {
      renderPage();
      expect(screen.getByRole("heading", { name: "Home Page", level: 1 })).toBeInTheDocument();
    });

    it("should render the about page link", () => {
      renderPage();
      expect(screen.getByRole("link", { name: "Go to About Page" })).toBeInTheDocument();
    });

    it("should render the about page in another window link", () => {
      renderPage();
      expect(
        screen.getByRole("link", { name: "Go to About Page in a new window" })
      ).toBeInTheDocument();
    });

    it("should render the users page link", () => {
      renderPage();
      expect(screen.getByRole("link", { name: "Go to Users Page" })).toBeInTheDocument();
    });

    it("should render the page navigation", () => {
      renderPage();
      expect(screen.getByRole("navigation", { name: "Page navigation" })).toBeInTheDocument();
    });

    it("should render three navigation links", () => {
      renderPage();
      expect(screen.getAllByRole("link")).toHaveLength(3);
    });

    it("should render the about-in-another-window link with target _blank", () => {
      renderPage();
      const link = screen.getByRole("link", { name: "Go to About Page in a new window" });
      expect(link).toHaveAttribute("target", "_blank");
    });

    it("should render the about page link with target _self", () => {
      renderPage();
      const link = screen.getByRole("link", { name: "Go to About Page" });
      expect(link).toHaveAttribute("target", "_self");
    });

    it("should render the trigger error boundary button", () => {
      renderPage();
      expect(screen.getByRole("button", { name: "Trigger error boundary" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    beforeEach(() => {
      jest.spyOn(console, "error").mockImplementation(() => undefined);
    });

    it("should trigger the error boundary when the button is clicked", async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <ErrorBoundary>
            <HomePage />
          </ErrorBoundary>
        </MemoryRouter>
      );

      await user.click(screen.getByRole("button", { name: "Trigger error boundary" }));

      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });
  });
});
