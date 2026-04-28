import { Routes, Route, Navigate } from "react-router-dom";

import type { JSX } from "react";

import { PublicRoute } from "@/router/PublicRoute";

import HomePage from "@/pages/HomePage/HomePage";
import AboutPage from "@/pages/AboutPage/AboutPage";
import UsersPage from "@/pages/UsersPage/UsersPage";
import ProductPage from "@/pages/ProductPage/ProductPage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
import ContextPage from "@/pages/ContextPage/ContextPage";

import { CounterProvider } from "@/contexts/CounterContext/CounterProvider";

import envs from "@/constants/envs";

export const TemplateRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/about" element={<AboutPage></AboutPage>}></Route>
        <Route path="/users" element={<UsersPage></UsersPage>}></Route>
        <Route path="/products/:productId" element={<ProductPage></ProductPage>}></Route>
        <Route
          path="/context"
          element={
            <CounterProvider>
              <ContextPage></ContextPage>
            </CounterProvider>
          }
        ></Route>
        <Route path="/error" element={<NotFoundPage></NotFoundPage>}></Route>
      </Route>

      <Route
        path="/*"
        element={<Navigate to={envs.redirectIfRouteNotExists ? "/" : "/error"}></Navigate>}
      ></Route>
    </Routes>
  );
};
