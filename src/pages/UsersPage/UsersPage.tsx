import { useEffect, useState } from "react";

import type { JSX } from "react";
import type { User } from "@/types/app";

import Link from "@/components/Link/Link";
import UserCard from "@/components/UserCard/UserCard";

import userService from "@/services/userService";

import "@/pages/UsersPage/UsersPage.css";

const UsersPage = (): JSX.Element => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const loadUsers = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await userService.getAll();
      setUsers(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  return (
    <main className="users-page">
      <h1 className="title">Users Page</h1>

      {loading && (
        <p className="loading" role="status" aria-live="polite">
          Loading users...
        </p>
      )}

      {error && (
        <p className="error" role="alert">
          Error loading users. Please try again.
        </p>
      )}

      {!loading && !error && (
        <ul className="users-list" aria-label="User list">
          {users.map((user) => (
            <li key={user.id}>
              <UserCard
                name={user.name}
                company={user.company}
                email={user.email}
                phone={user.phone}
                username={user.username}
                website={user.website}
              />
            </li>
          ))}
        </ul>
      )}

      <nav aria-label="Page navigation">
        <ul className="links">
          <li>
            <Link id="link-home" ariaLabel="Go to Home Page" href="/" target="_self">
              Go to Home Page
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
};

export default UsersPage;
