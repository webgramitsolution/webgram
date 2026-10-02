import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

const description = "Important information about Webgram IT Solution website content, professional advice, results, external links and advertising.";
export const Route = createFileRoute("/disclaimer")({ head: () => ({ links: [{ rel: "canonical", href: "https://webgramitsolution.com/disclaimer" }], meta: [{ title: "Disclaimer | Webgram IT Solution" }, { name: "description", content: description }, { property: "og:title", content: "Disclaimer | Webgram IT Solution" }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { property: "og:url", content: "https://webgramitsolution.com/disclaimer" }, { name: "twitter:card", content: "summary" }] }), component: DisclaimerPage });
function DisclaimerPage() { return <LegalPage eyebrow="Legal" title="Disclaimer" summary={description} updated="30 September 2026" sections={[
  { title: "General information", paragraphs: ["Website and blog content is provided for general educational purposes. It does not replace legal, financial, tax or other regulated professional advice."] },
  { title: "Results and accuracy", paragraphs: ["Examples, case studies and growth discussions illustrate possible approaches and are not guarantees of rankings, revenue or other results. Outcomes depend on each business, market, budget and implementation."] },
  { title: "External services and advertising", paragraphs: ["Blog pages may display third-party advertising. An advertisement does not mean Webgram endorses the advertiser. External websites and platforms control their own content, availability and privacy practices."] },
  { title: "Contact", paragraphs: ["For questions about this disclaimer, contact info@webgramitsolution.com."] },
]} />; }