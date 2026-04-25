import { getLocalStorage } from "@/helpers/getLocalStorage";

describe("getLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return null when key does not exist", () => {
    expect(getLocalStorage("nonExistentKey")).toBeNull();
  });

  it("should return null when stored value is empty string", () => {
    localStorage.setItem("emptyKey", "");
    expect(getLocalStorage("emptyKey")).toBeNull();
  });

  it("should return a parsed object when key exists", () => {
    localStorage.setItem("myKey", JSON.stringify({ name: "test" }));
    expect(getLocalStorage("myKey")).toEqual({ name: "test" });
  });

  it("should return a parsed number", () => {
    localStorage.setItem("numKey", JSON.stringify(42));
    expect(getLocalStorage("numKey")).toBe(42);
  });

  it("should return a parsed boolean", () => {
    localStorage.setItem("boolKey", JSON.stringify(true));
    expect(getLocalStorage("boolKey")).toBe(true);
  });

  it("should return a parsed array", () => {
    localStorage.setItem("arrKey", JSON.stringify([1, 2, 3]));
    expect(getLocalStorage("arrKey")).toEqual([1, 2, 3]);
  });
});
