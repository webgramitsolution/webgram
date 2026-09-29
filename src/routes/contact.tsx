import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  Clock3,
  Facebook,
  FileText,
  Headphones,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Rocket,
  Send,
  Users,
  Youtube,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { contactImages } from "@/lib/site-images";
import ctaImage from "@/assets/cta-mountain.jpg";
import { SiteHeader } from "@/components/site-header";
import { ProjectAdvisor } from "@/components/project-advisor";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Webgram IT Solution | Start Your Project" },
      {
        name: "description",
        content:
          "Contact Webgram IT Solution for website, ecommerce and digital growth services in Delhi NCR.",
      },
      { property: "og:title", content: "Contact Webgram IT Solution" },
      {
        property: "og:description",
        content: "Let's build something great together. Speak with the Webgram team today.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: contactImages.banner },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: contactImages.banner },
    ],
  }),
  component: ContactPage,
});

function ContactHero() {
  const promises = [
    [MessageCircle, "Discuss", "Your Idea"],
    [FileText, "Get a", "Free Quote"],
    [Users, "Expert", "Consultation"],
    [Rocket, "Start", "Your Project"],
  ] as const;
  return (
    <section id="top" className="contact-hero">
      <img
        src={contactImages.banner}
        alt="Webgram IT Solution reception"
        width={2170}
        height={725}
        className="absolute inset-0 h-full w-full object-cover object-right"
      />
      <div className="page-shell relative z-10 flex h-full items-center">
        <div className="max-w-[570px] py-6 text-on-dark">
          <nav className="sr-only" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="mx-2">›</span>Contact Us
          </nav>
          <p className="sr-only">Get in Touch</p>
          <h1 className="text-[34px] font-extrabold leading-[1.03] sm:text-[41px] lg:text-[48px]">
            Let’s Build Something
            <br />
            Great <span className="text-gold">Together.</span>
          </h1>
          <p className="mt-4 text-[13px] leading-[1.55] text-on-dark/90 sm:text-[14px]">
            Have a project in mind? We’re here to help you turn your ideas
            <br className="hidden sm:block" /> into a powerful digital commerce experience.
          </p>
          <div className="mt-6 grid max-w-[520px] grid-cols-4 divide-x divide-on-dark/20">
            {promises.map(([Icon, first, second]) => (
              <div key={second} className="px-3 first:pl-0">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-on-dark/40">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="mt-2 block text-[11px] leading-[1.3]">
                  {first}
                  <br />
                  {second}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const fieldClass = "h-9 bg-card text-[10.5px] shadow-none placeholder:text-muted-foreground/60";

function ContactForm() {
  const [message, setMessage] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  return (
    <form
      className="grid grid-cols-2 gap-x-3 gap-y-3"
      onSubmit={(event) => event.preventDefault()}
    >
      <label className="contact-field">
        Your Name *<Input required placeholder="Enter your name" className={fieldClass} />
      </label>
      <label className="contact-field">
        Email Address *
        <Input required type="email" placeholder="Enter your email" className={fieldClass} />
      </label>
      <label className="contact-field">
        Phone Number *
        <div className="flex items-stretch overflow-hidden rounded-md border border-input bg-card">
          <span
            className="flex shrink-0 items-center gap-1.5 border-r border-input px-2.5 text-[11px] font-semibold text-navy"
            aria-hidden="true"
          >
            <span
              className="h-3.5 w-5 rounded-[2px] shadow-[inset_0_0_0_1px_rgb(0_0_0/8%)]"
              style={{
                background:
                  "linear-gradient(180deg, #FF9933 0 33.4%, #FFFFFF 33.4% 66.7%, #138808 66.7% 100%)",
              }}
            />
            +91 <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </span>
          <Input
            required
            type="tel"
            placeholder="Enter your phone number"
            className="h-9 min-w-0 rounded-none border-0 bg-card text-[10.5px] shadow-none focus-visible:ring-0"
          />
        </div>
      </label>
      <label className="contact-field">
        Project Type
        <Select value={projectType} onValueChange={setProjectType}>
          <SelectTrigger className={fieldClass}>
            <SelectValue placeholder="Select project type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="website">Website</SelectItem>
            <SelectItem value="ecommerce">Ecommerce</SelectItem>
            <SelectItem value="marketing">Digital Marketing</SelectItem>
          </SelectContent>
        </Select>
      </label>
      <label className="contact-field">
        Business Name
        <Input placeholder="Enter your business name" className={fieldClass} />
      </label>
      <label className="contact-field">
        Project Budget
        <Select value={budget} onValueChange={setBudget}>
          <SelectTrigger className={fieldClass}>
            <SelectValue placeholder="Select budget range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">₹25k – ₹50k</SelectItem>
            <SelectItem value="medium">₹50k – ₹1L</SelectItem>
            <SelectItem value="large">₹1L+</SelectItem>
          </SelectContent>
        </Select>
      </label>
      <label className="contact-field col-span-2">
        Your Message *
        <Textarea
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Tell us about your project requirements..."
          className="min-h-[60px] bg-card text-[10.5px] shadow-none"
        />
      </label>
      <ProjectAdvisor needs={message} projectType={projectType} budget={budget} />
      <div className="col-span-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-1">
        <label className="flex min-w-0 items-center gap-2 text-[10.5px] text-navy">
          <input required type="checkbox" className="h-4 w-4 shrink-0 accent-primary" />
          <span className="min-w-0">
            I agree to the{" "}
            <a href="#faq" className="font-bold text-primary underline">
              Terms &amp; Privacy Policy
            </a>
          </span>
        </label>
        <Button className="h-10 shrink-0 bg-gold px-7 text-[12px] font-bold text-navy hover:bg-gold/90">
          Send Message <ArrowRight />
        </Button>
      </div>
    </form>
  );
}

function DirectContact() {
  const details = [
    [Phone, "Call Us", "+91 7551120242", "Mon - Sat, 9:00 AM - 7:00 PM", "text-primary"],
    [Mail, "Email Us", "info@webgramitsolution.com", "We’ll respond within 24 hours", "text-primary"],
    [
      MessageCircle,
      "Chat on WhatsApp",
      "+91 7551120242",
      "Quick support and project discussion",
      "text-success",
    ],
    [MapPin, "Our Location", "Delhi NCR, India", "Visit our office for a meeting", "text-primary"],
  ] as const;
  return (
    <div className="contact-direct overflow-hidden rounded-lg bg-navy text-on-dark shadow-card">
      <div className="min-w-0 p-5 sm:p-6">
        <h2 className="text-[21px] font-extrabold leading-tight lg:text-[22px]">
          Get in Touch Directly
        </h2>
        <p className="mt-1.5 text-[11px] text-on-dark/75">
          Prefer to speak with our team? Use the details below.
        </p>
        <div className="mt-6 space-y-6">
          {details.map(([Icon, title, value, note, color]) => (
            <div key={title} className="grid grid-cols-[46px_1fr] items-center gap-3.5">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-card shadow-card">
                <Icon className={`h-5 w-5 ${color}`} />
              </span>
              <div className="min-w-0">
                <strong className="block text-[11px] font-semibold text-on-dark/85">{title}</strong>
                <span className="mt-0.5 block break-words text-[14px] font-bold">{value}</span>
                <small className="mt-0.5 block text-[10px] text-on-dark/60">{note}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative min-h-[360px] md:min-h-0">
        <img
          src={contactImages.advisor}
          alt="Webgram customer support specialist"
          width={928}
          height={1695}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="absolute inset-x-3.5 bottom-3.5 rounded-lg bg-card p-4 text-navy shadow-card sm:inset-x-4 sm:bottom-4">
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary-soft">
              <Headphones className="h-5 w-5 text-primary" />
            </span>
            <div className="min-w-0">
              <strong className="text-[12.5px] font-extrabold">Talk to Our Experts</strong>
              <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
                Get free consultation for your project requirements.
              </p>
            </div>
          </div>
          <Button
            asChild
            className="mt-3.5 h-10 w-full bg-navy text-[11px] font-bold text-on-dark hover:bg-navy/90"
          >
            <a href="tel:+917551120242">
              Schedule a Call <ArrowRight />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ContactMain() {
  return (
    <section id="contact" className="bg-background py-6 md:py-8">
      <div className="page-shell grid items-stretch gap-4 md:grid-cols-[.94fr_1.06fr]">
        <div className="rounded-lg border border-border/80 bg-card p-5 shadow-card sm:p-6">
          <p className="eyebrow flex items-center gap-3 text-muted-foreground">
            <span className="h-px w-8 bg-gold" />
            Contact Us
          </p>
          <h2 className="mt-2 text-[24px] font-extrabold leading-tight text-navy sm:text-[26px]">
            Send Us a Message
          </h2>
          <p className="mb-4 mt-1.5 max-w-[360px] text-[11.5px] leading-5 text-muted-foreground">
            Tell us about your project, and our team will get back to you within 24 hours.
          </p>
          <ContactForm />
        </div>
        <DirectContact />
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="bg-card py-6 md:py-8">
      <div className="page-shell grid items-center gap-6 md:grid-cols-[.46fr_.54fr] md:gap-8">
        <div className="py-1">
          <p className="eyebrow flex items-center gap-3 text-primary">
            <span className="h-px w-8 bg-gold" />
            Our Office Location
          </p>
          <h2 className="mt-2 text-[27px] font-extrabold leading-tight text-navy sm:text-[31px]">
            Delhi NCR, India
          </h2>
          <p className="mt-2 max-w-[460px] text-[12px] leading-5 text-muted-foreground">
            We’re located in the heart of Delhi NCR, easily accessible for in-person meetings and
            project discussions.
          </p>
          <div className="mt-5 flex gap-4 rounded-lg bg-sky-soft p-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-card text-primary shadow-card">
              <MapPin className="h-6 w-6" />
            </span>
            <div>
              <strong className="text-[14px] text-navy">Head Office</strong>
              <p className="mt-1.5 text-[12px] leading-5 text-muted-foreground">
                Webgram IT Solution
                <br />
                A-123, Sector 63, Noida
                <br />
                Uttar Pradesh - 201301, India
              </p>
            </div>
          </div>
        </div>
        <div className="relative min-h-[240px] overflow-hidden rounded-lg border border-border/70">
          <iframe
            title="Webgram IT Solution location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.3773900406163!2d77.2399091!3d28.4982913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1d73c888e6f%3A0x679aac9b7129eb22!2sWebgram%20IT%20Solution%20%7C%20Website%20%26%20eCommerce%20Developer%20Delhi!5e0!3m2!1sen!2sin!4v1790644608245!5m2!1sen!2sin"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <Button
            asChild
            className="absolute bottom-4 left-4 z-10 h-10 bg-navy text-[11px] text-on-dark hover:bg-navy/90"
          >
            <a
              href="https://www.google.com/maps/search/?api=1&query=Webgram+IT+Solution+Delhi"
              target="_blank"
              rel="noreferrer"
            >
              Get Directions <ArrowRight />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ConnectHours() {
  const socials = [
    [Linkedin, "LinkedIn", "Follow Us", "bg-linkedin"],
    [Instagram, "Instagram", "Follow Us", "bg-instagram"],
    [Facebook, "Facebook", "Like Our Page", "bg-facebook"],
    [Youtube, "YouTube", "Subscribe", "bg-youtube"],
    [Mail, "Newsletter", "Get Updates", "bg-primary"],
  ] as const;
  return (
    <section className="bg-background py-5">
      <div className="page-shell grid gap-6 md:grid-cols-[1.25fr_.75fr] md:divide-x md:divide-border">
        <div>
          <h2 className="text-[23px] font-extrabold text-navy sm:text-[26px]">
            Other Ways to Connect
          </h2>
          <p className="mt-1 text-[12px] text-muted-foreground">
            Follow us on social media for latest updates, insights and project inspiration.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-5">
            {socials.map(([Icon, title, sub, tone]) => (
              <a
                href="#top"
                key={title}
                className="flex items-center gap-2.5 text-navy hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-md text-primary-foreground ${tone}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <strong className="block whitespace-nowrap text-[12px]">{title}</strong>
                  <small className="block whitespace-nowrap text-[10.5px] text-muted-foreground">{sub}</small>
                </span>
              </a>
            ))}
          </div>
        </div>
        <div className="md:pl-8">
          <h2 className="text-[23px] font-extrabold text-navy sm:text-[26px]">Business Hours</h2>
          <p className="mt-1 text-[12px] text-muted-foreground">
            We’re available to support your business.
          </p>
          <div className="mt-4 flex gap-4">
            <Clock3 className="h-11 w-11 shrink-0 text-primary" />
            <dl className="grid flex-1 grid-cols-2 gap-y-2 text-[12px] text-muted-foreground">
              <dt>Monday - Friday</dt>
              <dd className="text-right">9:00 AM - 7:00 PM</dd>
              <dt>Saturday</dt>
              <dd className="text-right">9:00 AM - 5:00 PM</dd>
              <dt>Sunday</dt>
              <dd className="text-right">
                Closed
                <small className="block text-[10px]">(Available on appointment)</small>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  "How quickly can you start my project?",
  "Do you provide free consultation?",
  "What information do you need for a quote?",
  "Can we meet at your office?",
  "Do you work with businesses outside Delhi NCR?",
  "What is your typical project timeline?",
  "Do you provide ongoing support?",
  "Which technologies do you work with?",
];

function Faq() {
  return (
    <section id="faq" className="border-t border-border bg-card py-5">
      <div className="page-shell">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow flex items-center gap-3 text-muted-foreground">
              <span className="h-px w-8 bg-gold" />
              Frequently Asked Questions
            </p>
            <h2 className="mt-2 text-[27px] font-extrabold text-navy sm:text-[29px]">Quick Answers</h2>
            <p className="text-[12px] text-muted-foreground">
              Find answers to common questions about working with Webgram.
            </p>
          </div>
          <Button
            variant="outline"
            className="hidden h-9 border-navy text-[10px] text-navy sm:flex"
          >
            View All FAQs <ArrowRight />
          </Button>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {[faqs.slice(0, 4), faqs.slice(4)].map((column, index) => (
            <Accordion
              key={index}
              type="multiple"
              className="rounded-lg border border-border bg-card px-4 shadow-card"
            >
              {column.map((question) => (
                <AccordionItem key={question} value={question} className="border-border last:border-b-0">
                  <AccordionTrigger className="py-3 text-[12.5px] font-semibold text-navy hover:no-underline">
                    {question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[11.5px] leading-5 text-muted-foreground">
                    Contact our team for a detailed answer tailored to your business and project.
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const steps = [
    [MessageCircle, "Free Consultation", "Discuss your idea"],
    [Users, "Tailored Solution", "As per your needs"],
    [Rocket, "On-Time Delivery", "With best practices"],
    [Headphones, "Long-Term Support", "We grow with you"],
  ] as const;
  return (
    <section className="relative min-h-[205px] overflow-hidden bg-navy text-on-dark">
      <img
        src={ctaImage}
        alt="Entrepreneur looking over mountain landscape at sunrise"
        loading="lazy"
        width={1536}
        height={512}
        className="absolute inset-0 h-full w-full object-cover object-[60%_center]"
      />
      <div className="absolute inset-0 bg-cta-overlay" />
      <div className="page-shell relative grid min-h-[205px] items-center gap-7 py-7 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-[8px] font-bold uppercase tracking-[.2em] text-gold">
            Let’s Get Started
          </p>
          <h2 className="mt-2 text-[26px] font-extrabold leading-none">
            Ready to Turn Your Idea
            <br />
            into Reality?
          </h2>
          <p className="mt-3 max-w-[470px] text-[9px] leading-4 text-on-dark/85">
            Whether it’s a website, ecommerce store, B2B portal or custom application — we’re here
            to make it happen.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              asChild
              className="h-10 bg-gold px-6 text-[9px] font-bold text-navy hover:bg-gold/90"
            >
              <a href="#contact">
                Start Your Project <ArrowRight />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-10 border-on-dark/60 bg-transparent px-6 text-[9px] font-bold text-on-dark shadow-none hover:bg-on-dark/10 hover:text-on-dark"
            >
              <a href="tel:+917551120242">Talk to an Expert</a>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {steps.map(([IconComponent, title, text]) => (
            <div key={title} className="text-center">
              <span className="mx-auto grid h-10 w-10 place-items-center rounded-full border border-on-dark/40">
                <IconComponent className="h-4 w-4" />
              </span>
              <strong className="mt-2 block text-[8px]">{title}</strong>
              <small className="mt-1 block text-[6px] text-on-dark/70">{text}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background font-sans">
      <SiteHeader />
      <ContactHero />
      <ContactMain />
      <Location />
      <ConnectHours />
      <Faq />
      <FinalCta />
    </main>
  );
}
