import { it } from "node:test";
import assert from "node:assert/strict";
import { articlePreviewBlockCount } from "./article-disclosure";

it("initially reveals 20 percent of article blocks", () => {
  assert.equal(articlePreviewBlockCount(100), 20);
  assert.equal(articlePreviewBlockCount(10), 2);
});
it("keeps incomplete boundary blocks intact", () => {
  assert.equal(articlePreviewBlockCount(6), 2);
  assert.equal(articlePreviewBlockCount(0), 0);
});