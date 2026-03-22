import type { User } from "@/types/app";

export const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    phone: "123-456-7890",
    website: "johndoe.com",
    company: { name: "Doe Inc" },
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    email: "jane@example.com",
    phone: "098-765-4321",
    website: "janesmith.com",
    company: { name: "Smith Corp" },
  },
];

export const mockUser: User = mockUsers[0]!;