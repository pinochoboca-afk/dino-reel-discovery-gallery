import { describe, expect, it } from "vitest";
import { safeRedirect } from "@/lib/social";

describe("safeRedirect after sign-in", () => {
  it("keeps a same-site page", () => {
    expect(safeRedirect("/dinosaurio/triceratops")).toBe("/dinosaurio/triceratops");
  });
  it("rejects other websites", () => {
    expect(safeRedirect("https://evil.example")).toBeUndefined();
    expect(safeRedirect("//evil.example")).toBeUndefined();
  });
});
