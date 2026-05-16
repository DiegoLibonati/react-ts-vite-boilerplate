import { useState } from "react";

import type { JSX } from "react";

import Action from "@/components/Action/Action";
import Link from "@/components/Link/Link";

import "@/pages/HomePage/HomePage.css";

const HomePage = (): JSX.Element => {
  const [shouldThrow, setShouldThrow] = useState(false);

  const ThrowError = (): never => {
    throw new Error("Error boundary triggered manually.");
  };

  return (
    <main className="home-page">
      <h1 className="title">Home Page</h1>

      <nav aria-label="Page navigation">
        <ul className="links">
          <li>
            <Link id="link-about" ariaLabel="Go to About Page" href="/about" target="_self">
              Go to About Page
            </Link>
          </li>
          <li>
            <Link
              id="link-about-new-window"
              ariaLabel="Go to About Page in a new window"
              href="/about"
            >
              Go to About Page in Another Window
            </Link>
          </li>
          <li>
            <Link id="link-users" ariaLabel="Go to Users Page" href="/users" target="_self">
              Go to Users Page
            </Link>
          </li>
        </ul>
      </nav>

      <section className="home-page__demo" aria-label="Error boundary demo">
        <Action
          id="action-trigger-error"
          ariaLabel="Trigger error boundary"
          className="home-page__demo-action"
          onClick={() => {
            setShouldThrow(true);
          }}
        >
          Trigger Error Boundary
        </Action>

        {shouldThrow ? <ThrowError /> : null}
      </section>
    </main>
  );
};

export default HomePage;
