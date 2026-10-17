import { it } from "node:test";
import assert from "node:assert/strict";
import { guestPostIssues } from "./guest-post-validation";
const valid = { title: "Guest article title", excerpt: "A helpful short summary.", content: Array(800).fill("business").join(" "), category: "category", subcategory: "child", tags: "commerce", image: "", author: "Guest", seoTitle: "A helpful meta title", seoDescription: "A helpful description about ecommerce for growing businesses.", faqs: Array.from({ length: 5 }, () => ({ question: "What is ecommerce?", answer: "Selling products online." })) };
it("accepts 800 words and five complete FAQs", () => assert.deepEqual(guestPostIssues(valid), []));
it("reports a 799-word article instead of silently disabling submission", () => assert.ok(guestPostIssues({ ...valid, content: Array(799).fill("business").join(" ") }).some((message) => message.includes("800 words"))));
it("allows HTTPS images but rejects external links", () => {
  assert.deepEqual(guestPostIssues({ ...valid, content: valid.content + "\n![Image](https://example.com/image.jpg)" }), []);
  assert.ok(guestPostIssues({ ...valid, content: valid.content + "\n[Link](https://example.com)" }).some((message) => message.includes("external links")));
});
it("reports incomplete FAQs", () => assert.ok(guestPostIssues({ ...valid, faqs: [] }).some((message) => message.includes("five FAQ"))));