import { http, HttpResponse } from "msw";

import { mockUsers, mockUser } from "@tests/__mocks__/users.mock";

export const mockMswHandlers = [
  http.get("/users", () => {
    return HttpResponse.json(mockUsers);
  }),
  http.get("/users/:id", () => {
    return HttpResponse.json(mockUser);
  }),
];
