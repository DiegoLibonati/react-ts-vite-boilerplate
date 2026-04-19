import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import type { RenderResult } from "@testing-library/react";

import ProductPage from "@/pages/ProductPage/ProductPage";

const renderPage = (productId = "42"): RenderResult => {
  return render(
    <MemoryRouter initialEntries={[`/products/${productId}`]}>
      <Routes>
        <Route path="/products/:productId" element={<ProductPage />} />
      </Routes>
    </MemoryRouter>
  );
};

const renderPageWithoutParam = (): RenderResult => {
  return render(
    <MemoryRouter initialEntries={["/products"]}>
      <Routes>
        <Route path="/products" element={<ProductPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("ProductPage", () => {
  describe("rendering", () => {
    it("should render the product ID in the title", () => {
      renderPage("42");
      expect(
        screen.getByRole("heading", { name: "Product Page: 42", level: 1 })
      ).toBeInTheDocument();
    });

    it("should render Unknown in the title when no product ID is in the route", () => {
      renderPageWithoutParam();
      expect(
        screen.getByRole("heading", { name: "Product Page: Unknown", level: 1 })
      ).toBeInTheDocument();
    });

    it("should render the navigation link", () => {
      renderPage();
      expect(screen.getByRole("link", { name: "Go to an unknown page" })).toBeInTheDocument();
    });

    it("should render the show product id button with the correct aria-label", () => {
      renderPage("42");
      expect(screen.getByRole("button", { name: "Show product ID 42" })).toBeInTheDocument();
    });

    it("should render the button with unknown aria-label when no productId", () => {
      renderPageWithoutParam();
      expect(screen.getByRole("button", { name: "Show product ID unknown" })).toBeInTheDocument();
    });

    it("should render the product actions section", () => {
      renderPage();
      expect(screen.getByRole("region", { name: "Product actions" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should call alert with product ID when button is clicked", async () => {
      const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => undefined);
      renderPage("42");
      const user = userEvent.setup();
      await user.click(screen.getByRole("button", { name: "Show product ID 42" }));
      expect(mockAlert).toHaveBeenCalledWith("Product ID: 42");
    });

    it("should not call alert when productId is undefined", async () => {
      const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => undefined);
      renderPageWithoutParam();
      const user = userEvent.setup();
      await user.click(screen.getByRole("button", { name: "Show product ID unknown" }));
      expect(mockAlert).not.toHaveBeenCalled();
    });

    it("should call alert with correct product ID for different IDs", async () => {
      const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => undefined);
      renderPage("99");
      const user = userEvent.setup();
      await user.click(screen.getByRole("button", { name: "Show product ID 99" }));
      expect(mockAlert).toHaveBeenCalledWith("Product ID: 99");
    });
  });
});
