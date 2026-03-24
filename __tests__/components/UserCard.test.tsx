import { render, screen } from "@testing-library/react";

import type { UserCardProps } from "@/types/props";

import UserCard from "@/components/UserCard/UserCard";

import { mockUser } from "@tests/__mocks__/users.mock";

type RenderComponent = {
  container: HTMLElement;
  props: UserCardProps;
};

const renderComponent = (overrides?: Partial<UserCardProps>): RenderComponent => {
  const props: UserCardProps = {
    name: mockUser.name,
    username: mockUser.username,
    email: mockUser.email,
    phone: mockUser.phone,
    website: mockUser.website,
    company: mockUser.company,
    ...overrides,
  };

  const { container } = render(<UserCard {...props} />);

  return { container, props };
};

describe("UserCard", () => {
  it("should render an article element", () => {
    const { container } = renderComponent();
    expect(container.querySelector<HTMLElement>("article.user-card")).toBeInTheDocument();
  });

  it("should have an accessible label with the user name", () => {
    renderComponent();
    expect(screen.getByRole("article")).toHaveAccessibleName(`Perfil de ${mockUser.name}`);
  });

  it("should render the user name in a heading", () => {
    renderComponent();
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(mockUser.name);
  });

  it("should render the username with @ prefix", () => {
    renderComponent();
    expect(screen.getByText(`@${mockUser.username}`)).toBeInTheDocument();
  });

  it("should render the email as a mailto link", () => {
    renderComponent();
    const emailLink = screen.getByRole("link", { name: mockUser.email });
    expect(emailLink).toHaveAttribute("href", `mailto:${mockUser.email}`);
  });

  it("should render the phone as a tel link", () => {
    renderComponent();
    const phoneLink = screen.getByRole("link", { name: mockUser.phone });
    expect(phoneLink).toHaveAttribute("href", `tel:${mockUser.phone}`);
  });

  it("should render the website as an external link", () => {
    renderComponent();
    const websiteLink = screen.getByRole("link", { name: mockUser.website });
    expect(websiteLink).toHaveAttribute("href", `https://${mockUser.website}`);
    expect(websiteLink).toHaveAttribute("target", "_blank");
    expect(websiteLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should render the company name", () => {
    renderComponent();
    expect(screen.getByText(mockUser.company.name)).toBeInTheDocument();
  });

  it("should render contact info inside an address element", () => {
    const { container } = renderComponent();
    expect(container.querySelector<HTMLElement>("address.user-card__contact")).toBeInTheDocument();
  });

  it("should render name and username inside a header element", () => {
    const { container } = renderComponent();
    expect(container.querySelector<HTMLElement>("header.user-card__header")).toBeInTheDocument();
  });

  it("should render company inside a footer element", () => {
    const { container } = renderComponent();
    expect(container.querySelector<HTMLElement>("footer.user-card__footer")).toBeInTheDocument();
  });

  it("should render with a custom name", () => {
    renderComponent({ name: "Jane Smith" });
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Jane Smith");
  });
});
