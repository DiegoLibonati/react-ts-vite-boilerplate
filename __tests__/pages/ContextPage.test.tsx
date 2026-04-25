import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import type { RenderResult } from "@testing-library/react";

import ContextPage from "@/pages/ContextPage/ContextPage";

import { CounterProvider } from "@/contexts/CounterContext/CounterProvider";

const renderPage = (): RenderResult => {
  return render(
    <MemoryRouter>
      <CounterProvider>
        <ContextPage />
      </CounterProvider>
    </MemoryRouter>
  );
};

describe("ContextPage", () => {
  describe("rendering", () => {
    it("should render the page title", () => {
      renderPage();
      expect(screen.getByRole("heading", { name: "Context Page", level: 1 })).toBeInTheDocument();
    });

    it("should render the counter starting at 0", () => {
      renderPage();
      expect(screen.getByRole("status", { name: "Counter value: 0" })).toBeInTheDocument();
    });

    it("should render the subtract button", () => {
      renderPage();
      expect(screen.getByRole("button", { name: "Subtract 1 from counter" })).toBeInTheDocument();
    });

    it("should render the add button", () => {
      renderPage();
      expect(screen.getByRole("button", { name: "Add 1 to counter" })).toBeInTheDocument();
    });

    it("should render the navigation link", () => {
      renderPage();
      expect(screen.getByRole("link", { name: "Go to unknown page" })).toBeInTheDocument();
    });

    it("should render the counter section", () => {
      renderPage();
      expect(screen.getByRole("region", { name: "Counter" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should increment counter when add button is clicked", async () => {
      renderPage();
      const user = userEvent.setup();
      await user.click(screen.getByRole("button", { name: "Add 1 to counter" }));
      expect(screen.getByRole("status", { name: "Counter value: 1" })).toBeInTheDocument();
    });

    it("should decrement counter when subtract button is clicked", async () => {
      renderPage();
      const user = userEvent.setup();
      await user.click(screen.getByRole("button", { name: "Subtract 1 from counter" }));
      expect(screen.getByRole("status", { name: "Counter value: -1" })).toBeInTheDocument();
    });

    it("should reflect multiple add and subtract operations correctly", async () => {
      renderPage();
      const user = userEvent.setup();
      const addButton = screen.getByRole("button", { name: "Add 1 to counter" });
      const subtractButton = screen.getByRole("button", { name: "Subtract 1 from counter" });

      await user.click(addButton);
      await user.click(addButton);
      await user.click(subtractButton);

      expect(screen.getByRole("status", { name: "Counter value: 1" })).toBeInTheDocument();
    });

    it("should allow counter to go negative", async () => {
      renderPage();
      const user = userEvent.setup();
      await user.click(screen.getByRole("button", { name: "Subtract 1 from counter" }));
      await user.click(screen.getByRole("button", { name: "Subtract 1 from counter" }));
      expect(screen.getByRole("status", { name: "Counter value: -2" })).toBeInTheDocument();
    });
  });
});
