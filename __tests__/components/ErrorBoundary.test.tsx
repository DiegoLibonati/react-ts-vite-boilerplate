import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";

import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";

const ThrowingChild = (): never => {
  throw new Error("Test error message");
};

const renderWithError = (): RenderResult => {
  return render(
    <ErrorBoundary>
      <ThrowingChild />
    </ErrorBoundary>
  );
};

const renderWithChildren = (children: React.ReactNode = <p>Safe content</p>): RenderResult => {
  return render(<ErrorBoundary>{children}</ErrorBoundary>);
};

describe("ErrorBoundary", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => undefined);
  });

  describe("rendering", () => {
    it("should render children when there is no error", () => {
      renderWithChildren();

      expect(screen.getByText("Safe content")).toBeInTheDocument();
    });

    it("should render the error UI when a child throws", () => {
      renderWithError();

      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("should render the error title when a child throws", () => {
      renderWithError();

      expect(screen.getByRole("heading", { name: "Something went wrong" })).toBeInTheDocument();
    });

    it("should render the error message when a child throws", () => {
      renderWithError();

      expect(screen.getByText("Test error message")).toBeInTheDocument();
    });

    it("should render the retry button when a child throws", () => {
      renderWithError();

      expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
    });

    it("should not render children when there is an error", () => {
      renderWithError();

      expect(screen.queryByText("Safe content")).not.toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should recover and render children after clicking retry", async () => {
      let shouldThrow = true;
      const user = userEvent.setup();

      const ConditionalChild = (): React.JSX.Element => {
        if (shouldThrow) throw new Error("Test error message");
        return <p>Recovered content</p>;
      };

      render(
        <ErrorBoundary>
          <ConditionalChild />
        </ErrorBoundary>
      );

      expect(screen.getByRole("alert")).toBeInTheDocument();

      shouldThrow = false;
      await user.click(screen.getByRole("button", { name: "Try again" }));

      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      expect(screen.getByText("Recovered content")).toBeInTheDocument();
    });
  });
});
