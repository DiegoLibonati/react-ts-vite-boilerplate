import { useParams } from "react-router";

import type { JSX } from "react";

import Link from "@/components/Link/Link";
import Action from "@/components/Action/Action";

import "@/pages/ProductPage/ProductPage.css";

const ProductPage = (): JSX.Element => {
  const { productId } = useParams();

  const alertProductId = (): void => {
    if (!productId) return;
    alert(`Product ID: ${productId}`);
  };

  return (
    <main className="product-page">
      <h1 className="title">Product Page: {productId ?? "Unknown"}</h1>

      <nav aria-label="Page navigation">
        <ul className="links">
          <li>
            <Link
              id="product-link-not-found"
              ariaLabel="Go to an unknown page"
              href="/pasdasdasdasd"
              target="_self"
            >
              Go to Not Exists Page
            </Link>
          </li>
        </ul>
      </nav>

      <section className="actions" aria-label="Product actions">
        <Action
          id="action-show-product-id"
          ariaLabel={`Show product ID ${productId ?? "unknown"}`}
          onClick={alertProductId}
        >
          Click Product Id
        </Action>
      </section>
    </main>
  );
};

export default ProductPage;
