import { createFileRoute, notFound } from "@tanstack/react-router";

import { SubpageTemplate } from "@/components/subpage";
import { PortfolioCard } from "@/components/portfolio-showcase";
import { SiteHeader } from "@/components/site-header";
import { getSubpage, menuSections } from "@/lib/menu-pages";
import { portfolio } from "@/lib/portfolio";

const section = menuSections.work;

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const page = getSubpage("work", params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData, params }) => ({
    links: [{ rel: "canonical", href: `https://webgramitsolution.com/work/${params.slug}` }],
    meta: [
      { title: `${loaderData?.title ?? "Work"} | Webgram IT Solution` },
      { name: "description", content: loaderData?.description ?? "" },
      { property: "og:title", content: `${loaderData?.title ?? "Work"} | Webgram IT Solution` },
      { property: "og:description", content: loaderData?.description ?? "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: params.slug === "case-studies" ? [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Web Development Case Studies | Webgram IT Solution",
        url: "https://webgramitsolution.com/work/case-studies",
        mainEntity: { "@type": "ItemList", itemListElement: portfolio.map((item, index) => ({ "@type": "ListItem", position: index + 1, url: item.url, name: item.name })) },
      }),
    }] : [],
  }),
  component: WorkPage,
});

function WorkPage() {
  const page = Route.useLoaderData();
  if (page.title === "Case Studies") {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <section className="bg-navy py-12 text-on-dark md:py-16">
          <div className="header-shell">
            <h1 className="page-title max-w-[720px]">Real Client Projects<br /><span className="text-gold">Built for Business Growth.</span></h1>
            <p className="page-lead mt-3 max-w-[680px] text-on-dark/85">Every case study below links to a published client website. Project details describe the visible business, audience and experience without invented performance claims or client quotes.</p>
          </div>
        </section>
        <section className="py-10 md:py-14"><div className="header-shell grid gap-7">{portfolio.map((item) => <PortfolioCard key={item.domain} item={item} />)}</div></section>
      </div>
    );
  }
  return <SubpageTemplate sectionLabel={section.label} page={page} />;
}
