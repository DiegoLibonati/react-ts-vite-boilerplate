import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { UserCardProps } from "@/types/props";

import UserCard from "@/components/UserCard/UserCard";

const defaultProps: UserCardProps = {
  name: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  phone: "123-456-7890",
  website: "johndoe.com",
  company: { name: "Doe Inc" },
};

const renderComponent = (props: Partial<UserCardProps> = {}): RenderResult => {
  return render(<UserCard {...defaultProps} {...props} />);
};

describe("UserCard", () => {
  describe("rendering", () => {
    it("should render the user name", () => {
      renderComponent();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("should render the username with @ prefix", () => {
      renderComponent();
      expect(screen.getByText("@johndoe")).toBeInTheDocument();
    });

    it("should render the email as a mailto link", () => {
      renderComponent();
      const emailLink = screen.getByRole("link", { name: "john@example.com" });
      expect(emailLink).toHaveAttribute("href", "mailto:john@example.com");
    });

    it("should render the phone as a tel link", () => {
      renderComponent();
      const phoneLink = screen.getByRole("link", { name: "123-456-7890" });
      expect(phoneLink).toHaveAttribute("href", "tel:123-456-7890");
    });

    it("should render the website as a link with https prefix", () => {
      renderComponent();
      const websiteLink = screen.getByRole("link", { name: "johndoe.com" });
      expect(websiteLink).toHaveAttribute("href", "https://johndoe.com");
    });

    it("should render the website link with target _blank and rel noopener noreferrer", () => {
      renderComponent();
      const websiteLink = screen.getByRole("link", { name: "johndoe.com" });
      expect(websiteLink).toHaveAttribute("target", "_blank");
      expect(websiteLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("should render the company name", () => {
      renderComponent();
      expect(screen.getByText("Doe Inc")).toBeInTheDocument();
    });

    it("should render the article with aria-label for the profile", () => {
      renderComponent();
      expect(screen.getByRole("article", { name: "Profile of John Doe" })).toBeInTheDocument();
    });

    it("should render with a different user's data", () => {
      renderComponent({
        name: "Jane Smith",
        username: "janesmith",
        email: "jane@example.com",
        phone: "098-765-4321",
        website: "janesmith.com",
        company: { name: "Smith Corp" },
      });
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      expect(screen.getByText("@janesmith")).toBeInTheDocument();
      expect(screen.getByText("Smith Corp")).toBeInTheDocument();
    });
  });
});
