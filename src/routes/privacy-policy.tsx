import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

const description = "Learn how Webgram IT Solution collects, uses, protects and manages personal information submitted through its website and services.";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }, { title: "Privacy Policy | Webgram IT Solution" }, { name: "description", content: description }, { property: "og:title", content: "Privacy Policy | Webgram IT Solution" }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { property: "og:url", content: "https://webgramitsolution.com/privacy-policy" }, { name: "twitter:card", content: "summary" }] }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() { return <LegalPage eyebrow="Legal" title="Privacy Policy" summary={description} updated="30 September 2026" sections={[
  { title: "Information we collect", paragraphs: ["We collect information you choose to provide through enquiry, guest posting, account and support forms. This may include your name, email address, phone number, business details and project requirements."], bullets: ["Contact and account details", "Messages, article submissions and support requests", "Technical information such as device, browser and approximate location", "Consent choices for analytics and advertising"] },
  { title: "How we use information", paragraphs: ["We use information to respond to enquiries, deliver requested services, operate secure accounts, publish approved content, prevent abuse and improve website performance."], bullets: ["Provide quotations and customer support", "Send login, enquiry and publication notifications", "Maintain security and prevent fraudulent activity", "Measure website and advertising performance where permitted"] },
  { title: "Sharing and retention", paragraphs: ["We share information only with service providers needed to operate this website, deliver email, host data, measure performance or meet legal obligations. We do not sell personal information."], bullets: ["Access is limited to authorised team members and essential service providers", "Records are retained only for business, security and legal needs", "You may request access, correction or deletion where applicable"] },
  { title: "Your choices", paragraphs: ["You can reject advertising cookies, reopen Cookie settings from the footer, unsubscribe from non-essential messages, or contact us about your information at info@webgramitsolution.com."] },
]} />; }