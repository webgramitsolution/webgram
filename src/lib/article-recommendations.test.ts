import { describe, expect, test } from "bun:test";
import { selectArticleRecommendations } from "./article-recommendations";

describe("automatic article recommendations", () => {
  const current = { id: "self", category_id: "commerce", tags: ["seo"], content: "[Existing](/blog/already-linked)" };
  const post = (id: string, category_id: string | null = "commerce", published_at = "2026-10-01") => ({ id, slug: id, category_id, published_at, tags: [] });
  test("excludes self, existing links and duplicate slugs", () => {
    const result = selectArticleRecommendations([post("self"), post("already-linked"), post("unique"), post("unique"), post("second")], current);
    expect(result.map((item) => item.slug)).toEqual(["unique", "second"]);
  });
  test("prioritizes category then the latest update", () => {
    const result = selectArticleRecommendations([post("other", "other", "2026-10-15"), post("old"), post("new", "commerce", "2026-10-10")], current);
    expect(result.map((item) => item.slug)).toEqual(["new", "old"]);
  });
  test("does not invent recommendations when no other posts exist", () => {
    expect(selectArticleRecommendations([post("self")], current)).toEqual([]);
  });
});