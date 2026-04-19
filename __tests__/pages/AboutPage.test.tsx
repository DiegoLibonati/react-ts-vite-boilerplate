import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import type { RenderResult } from "@testing-library/react";

import AboutPage from "@/pages/AboutPage/AboutPage";

const renderPage = (): RenderResult => {
  return render(
    <MemoryRouter>
      <AboutPage />
    </MemoryRouter>
  );
};

describe("AboutPage", () => {
  describe("rendering", () => {
    it("should render the page title", () => {
      renderPage();
      expect(screen.getByRole("heading", { name: "About Page", level: 1 })).toBeInTheDocument();
    });

    it("should render the product page link", () => {
      renderPage();
      expect(screen.getByRole("link", { name: "Go to Product Page 12" })).toBeInTheDocument();
    });

    it("should render the context page link", () => {
      renderPage();
      expect(screen.getByRole("link", { name: "Go to Context Page" })).toBeInTheDocument();
    });

    it("should render the page navigation", () => {
      renderPage();
      expect(screen.getByRole("navigation", { name: "Page navigation" })).toBeInTheDocument();
    });

    it("should render two navigation links", () => {
      renderPage();
      expect(screen.getAllByRole("link")).toHaveLength(2);
    });
  });
});
