import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { ActionProps } from "@/types/props";

import Action from "@/components/Action/Action";

const renderComponent = (props: Partial<ActionProps> = {}): RenderResult => {
  const defaultProps: ActionProps = {
    id: "test-action",
    ariaLabel: "Test action",
    onClick: jest.fn(),
    ...props,
  };
  return render(<Action {...defaultProps} />);
};

describe("Action", () => {
  describe("rendering", () => {
    it("should render with the provided children", () => {
      renderComponent({ children: "Click me" });
      expect(screen.getByRole("button", { name: "Test action" })).toBeInTheDocument();
      expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    it("should render with the provided id", () => {
      renderComponent({ id: "my-button" });
      expect(screen.getByRole("button")).toHaveAttribute("id", "my-button");
    });

    it("should render with aria-label", () => {
      renderComponent({ ariaLabel: "My action label" });
      expect(screen.getByRole("button", { name: "My action label" })).toBeInTheDocument();
    });

    it("should render with the action class by default", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveClass("action");
    });

    it("should render with additional className", () => {
      renderComponent({ className: "extra-class" });
      expect(screen.getByRole("button")).toHaveClass("action", "extra-class");
    });

    it("should not have extra class when className is not provided", () => {
      renderComponent();
      expect(screen.getByRole("button").className).toBe("action");
    });

    it("should have type button", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });
  });

  describe("behavior", () => {
    it("should call onClick when clicked", async () => {
      const mockOnClick = jest.fn();
      renderComponent({ onClick: mockOnClick });
      const user = userEvent.setup();
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("should not call onClick when onClick is not triggered", () => {
      const mockOnClick = jest.fn();
      renderComponent({ onClick: mockOnClick });
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });
});
