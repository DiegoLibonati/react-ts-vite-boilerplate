import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import type { RenderResult } from "@testing-library/react";

import UsersPage from "@/pages/UsersPage/UsersPage";

import userService from "@/services/userService";

import { mockUsers } from "@tests/__mocks__/users.mock";

const mockUserService = userService as jest.Mocked<typeof userService>;

jest.mock("@/services/userService");

const renderPage = (): RenderResult => {
  return render(
    <MemoryRouter>
      <UsersPage />
    </MemoryRouter>
  );
};

describe("UsersPage", () => {
  describe("rendering", () => {
    it("should render the page title", () => {
      mockUserService.getAll.mockReturnValue(new Promise(() => undefined));
      renderPage();
      expect(screen.getByRole("heading", { name: "Users Page", level: 1 })).toBeInTheDocument();
    });

    it("should render loading state while fetching", () => {
      mockUserService.getAll.mockReturnValue(new Promise(() => undefined));
      renderPage();
      expect(screen.getByRole("status")).toBeInTheDocument();
      expect(screen.getByText("Loading users...")).toBeInTheDocument();
    });

    it("should render users after loading completes", async () => {
      mockUserService.getAll.mockResolvedValue(mockUsers);
      renderPage();
      expect(await screen.findByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });

    it("should render a user card for each user", async () => {
      mockUserService.getAll.mockResolvedValue(mockUsers);
      renderPage();
      await screen.findByText("John Doe");
      expect(screen.getAllByRole("article")).toHaveLength(mockUsers.length);
    });

    it("should render the user list with correct aria-label", async () => {
      mockUserService.getAll.mockResolvedValue(mockUsers);
      renderPage();
      await screen.findByText("John Doe");
      expect(screen.getByRole("list", { name: "User list" })).toBeInTheDocument();
    });

    it("should render the home page link", async () => {
      mockUserService.getAll.mockResolvedValue(mockUsers);
      renderPage();
      await screen.findByText("John Doe");
      expect(screen.getByRole("link", { name: "Go to Home Page" })).toBeInTheDocument();
    });

    it("should hide loading indicator after fetch completes", async () => {
      mockUserService.getAll.mockResolvedValue(mockUsers);
      renderPage();
      await screen.findByText("John Doe");
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
  });

  describe("error handling", () => {
    it("should render error message when fetch fails", async () => {
      mockUserService.getAll.mockRejectedValue(new Error("Network error"));
      renderPage();
      expect(await screen.findByRole("alert")).toBeInTheDocument();
      expect(screen.getByText("Error loading users. Please try again.")).toBeInTheDocument();
    });

    it("should hide loading indicator when fetch fails", async () => {
      mockUserService.getAll.mockRejectedValue(new Error("Network error"));
      renderPage();
      await screen.findByRole("alert");
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    it("should not render the user list when there is an error", async () => {
      mockUserService.getAll.mockRejectedValue(new Error("Network error"));
      renderPage();
      await screen.findByRole("alert");
      expect(screen.queryByRole("list", { name: "User list" })).not.toBeInTheDocument();
    });
  });

  describe("edge cases", () => {
    it("should render an empty list when no users are returned", async () => {
      mockUserService.getAll.mockResolvedValue([]);
      renderPage();
      await waitFor(() => {
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
      });
      expect(screen.getByRole("list", { name: "User list" })).toBeInTheDocument();
      expect(screen.queryAllByRole("article")).toHaveLength(0);
    });
  });
});
