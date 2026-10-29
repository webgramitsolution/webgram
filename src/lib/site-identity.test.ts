import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { businessIdentity, publicPageSchema, SITE_URL } from "./site-identity";
import { servicePageSchema } from "./schema";
import { readFileSync } from "node:fs";

describe("public business identity", () => {
  it("uses only the canonical business domain in page identity", () => {
    assert.equal(SITE_URL, "https://webgramitsolution.com");
    const script = publicPageSchema("/about", "About", "Business information", "AboutPage")[0];
    if (!script) throw new Error("Expected page schema");
    const page = JSON.parse(script.children);
    assert.equal(page.url, "https://webgramitsolution.com/about");
    assert.equal(page.about["@id"], "https://webgramitsolution.com/#business");
  });
  it("does not assert fixed prices or ratings without evidence", () => {
    assert.equal("aggregateRating" in businessIdentity, false);
    assert.equal("priceRange" in businessIdentity, false);
    const service = servicePageSchema("services", "Services", "shopify", { title: "Shopify", description: "Shopify development", points: ["Store setup"] }).map(s => JSON.parse(s.children));
    assert.deepEqual(service.map(s => s["@type"]), ["Service", "BreadcrumbList"]);
    assert.equal(service[1].itemListElement.length, 2);
    assert.equal(service[0].provider["@id"], businessIdentity["@id"]);
  });
  it("preserves private-path exclusions for AI search crawlers", () => {
    const robots = readFileSync(new URL("../../public/robots.txt", import.meta.url), "utf8");
    for (const bot of ["OAI-SearchBot", "GPTBot", "ClaudeBot", "PerplexityBot"]) {
      const block = robots.split(/\n\s*\n/).find(b => b.includes(`User-agent: ${bot}\n`));
      assert.ok(block, bot);
      for (const path of ["/admin", "/guest", "/auth", "/api/", "/_serverFn/"]) {
        assert.ok(block.split("\n").includes(`Disallow: ${path}`), `${bot}: ${path}`);
      }
    }
  });
});