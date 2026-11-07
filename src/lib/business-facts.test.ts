import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { businessIdentity } from "./site-identity";

describe("business facts", () => {
  it("uses 2022 as the founding year", () => {
    assert.equal(businessIdentity.foundingDate, "2022");
  });
  it("publishes only the one real phone number", () => {
    assert.equal(businessIdentity.telephone, "+917551120242");
    assert.ok(!JSON.stringify(businessIdentity).includes("7942826612"));
  });
});
