import { Link as LinkRouter } from "react-router";

import type { JSX } from "react";
import type { LinkProps } from "@/types/props";

import "@/components/Link/Link.css";

const Link = ({
  id,
  href,
  target = "_blank",
  ariaLabel,
  children,
  className,
}: LinkProps): JSX.Element => {
  const isExternal = target === "_blank";

  return (
    <LinkRouter
      id={id}
      to={href}
      target={target}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={["link", className].filter(Boolean).join(" ")}
      aria-label={ariaLabel}
    >
      {children}
    </LinkRouter>
  );
};

export default Link;
