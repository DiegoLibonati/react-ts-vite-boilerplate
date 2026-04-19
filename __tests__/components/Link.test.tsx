import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import type { RenderResult } from "@testing-library/react";
import type { LinkProps } from "@/types/props";

import Link from "@/components/Link/Link";

const renderComponent = (props: Partial<LinkProps> = {}): RenderResult => {
  const defaultProps: LinkProps = {
    id: "test-link",
    href: "/test",
    ariaLabel: "Test link",
    children: "Click me",
    ...props,
  };
  return render(
    <MemoryRouter>
      <Link {...defaultProps} />
    </MemoryRouter>
  );
};

describe("Link", () => {
  describe("rendering", () => {
    it("should render with children text", () => {
      renderComponent({ children: "Go to page" });
      expect(screen.getByText("Go to page")).toBeInTheDocument();
    });

    it("should render with aria-label", () => {
      renderComponent({ ariaLabel: "Custom label" });
      expect(screen.getByRole("link", { name: "Custom label" })).toBeInTheDocument();
    });

    it("should render with the link class", () => {
      renderComponent();
      expect(screen.getByRole("link")).toHaveClass("link");
    });

    it("should render with additional className", () => {
      renderComponent({ className: "extra" });
      expect(screen.getByRole("link")).toHaveClass("link", "extra");
    });

    it("should render with the provided id", () => {
      renderComponent({ id: "my-link" });
      expect(screen.getByRole("link")).toHaveAttribute("id", "my-link");
    });
  });

  describe("external links", () => {
    it("should have target _blank by default", () => {
      renderComponent();
      expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
    });

    it("should have rel noopener noreferrer when target is _blank", () => {
      renderComponent({ target: "_blank" });
      expect(screen.getByRole("link")).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("internal links", () => {
    it("should not have rel attribute when target is _self", () => {
      renderComponent({ target: "_self" });
      expect(screen.getByRole("link")).not.toHaveAttribute("rel");
    });

    it("should have target _self when provided", () => {
      renderComponent({ target: "_self" });
      expect(screen.getByRole("link")).toHaveAttribute("target", "_self");
    });
  });
});
