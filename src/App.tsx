import type { JSX } from "react";

import { HashRouter } from "react-router-dom";

import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";

import { TemplateRouter } from "@/router/TemplateRouter";

function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <HashRouter>
        <TemplateRouter></TemplateRouter>
      </HashRouter>
    </ErrorBoundary>
  );
}

export default App;
