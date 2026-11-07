import { describe, expect, it } from "vitest";
import { businessIdentity } from "./site-identity";

describe("business facts", () => {
  it("uses 2022 as the founding year", () => {
    expect(businessIdentity.foundingDate).toBe("2022");
  });
  it("publishes only the one real phone number", () => {
    const json = JSON.stringify(businessIdentity);
    expect(businessIdentity.telephone).toBe("+917551120242");
    expect(json).not.toContain("7942826612");
  });
});
