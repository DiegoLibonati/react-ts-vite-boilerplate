import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import UsersPage from "@/pages/UsersPage/UsersPage";

import { userService } from "@/services/userService";

import { mockUsers } from "@tests/__mocks__/users.mock";

type RenderPage = {
  container: HTMLElement;
};

const mockedUserService = userService as jest.Mocked<typeof userService>;

jest.mock("@/services/userService");

const renderPage = (): RenderPage => {
  const { container } = render(
    <MemoryRouter>
      <UsersPage />
    </MemoryRouter>
  );
  return { container };
};

describe("UsersPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the main element", () => {
    mockedUserService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    const { container } = renderPage();

    expect(container.querySelector<HTMLElement>("main.users-page")).toBeInTheDocument();
  });

  it("should render the Users Page title", () => {
    mockedUserService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    renderPage();

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Users Page");
  });

  it("should show loading state while fetching users", () => {
    mockedUserService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    renderPage();

    expect(screen.getByRole("status")).toHaveTextContent("Loading users...");
  });

  it("should render user cards after successful fetch", async () => {
    mockedUserService.getAll.mockResolvedValueOnce(mockUsers);

    renderPage();

    const cards = await screen.findAllByRole("article");
    expect(cards).toHaveLength(mockUsers.length);
  });

  it("should show error message when fetch fails", async () => {
    mockedUserService.getAll.mockRejectedValueOnce(new Error("Network error"));

    renderPage();

    await screen.findByRole("alert");
    expect(screen.getByRole("alert")).toHaveTextContent("Error loading users. Please try again.");
  });

  it("should not show loading state after fetch completes", async () => {
    mockedUserService.getAll.mockResolvedValueOnce(mockUsers);

    renderPage();

    await screen.findByRole("list", { name: "User list" });
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("should not show error state on successful fetch", async () => {
    mockedUserService.getAll.mockResolvedValueOnce(mockUsers);

    renderPage();

    await screen.findByRole("list", { name: "User list" });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("should render the navigation landmark", () => {
    mockedUserService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    renderPage();

    expect(screen.getByRole("navigation", { name: "Page navigation" })).toBeInTheDocument();
  });

  it("should render the link to Home Page", () => {
    mockedUserService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    renderPage();

    const link = screen.getByRole("link", { name: "Go to Home Page" });
    expect(link).toHaveAttribute("href", "/home");
    expect(link).toHaveAttribute("target", "_self");
  });

  it("should call userService.getAll exactly once on mount", async () => {
    mockedUserService.getAll.mockResolvedValueOnce(mockUsers);

    renderPage();

    await screen.findByRole("list", { name: "User list" });
    expect(mockedUserService.getAll).toHaveBeenCalledTimes(1);
  });

  it("should render an empty list when the service returns no users", async () => {
    mockedUserService.getAll.mockResolvedValueOnce([]);

    renderPage();

    await screen.findByRole("list", { name: "User list" });
    expect(screen.queryAllByRole("article")).toHaveLength(0);
  });
});
