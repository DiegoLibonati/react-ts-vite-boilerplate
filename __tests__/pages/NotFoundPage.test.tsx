import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";

const renderPage = (): RenderResult => {
  return render(<NotFoundPage />);
};

describe("NotFoundPage", () => {
  describe("rendering", () => {
    it("should render the page title", () => {
      renderPage();
      expect(screen.getByRole("heading", { name: "Page Not Found", level: 1 })).toBeInTheDocument();
    });

    it("should render the description message", () => {
      renderPage();
      expect(
        screen.getByText("The page you're looking for doesn't exist or has been moved.")
      ).toBeInTheDocument();
    });

    it("should render a main element", () => {
      renderPage();
      expect(screen.getByRole("main")).toBeInTheDocument();
    });
  });
});
