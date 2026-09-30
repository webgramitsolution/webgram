import * as React from "react";
import { Body, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";
import type { TemplateEntry } from "./registry";

function EnquiryAcknowledgement({ name, service }: { name?: string; service?: string }) {
  return <Html lang="en" dir="ltr"><Head /><Preview>We received your enquiry</Preview><Body style={main}><Container style={container}><Heading style={heading}>Thank you for contacting Webgram</Heading><Text style={text}>Hi {name ?? "there"},</Text><Text style={text}>We have received your {service ? `${service} ` : ""}enquiry. Our team will review the details and contact you soon.</Text><Section style={box}><Text style={boxText}>If you need to add anything, reply to this email and it will reach our team.</Text></Section><Text style={footer}>Webgram IT Solution · Delhi NCR, India · info@webgramitsolution.com</Text></Container></Body></Html>;
}
export const template = { component: EnquiryAcknowledgement, subject: "We received your enquiry | Webgram IT Solution", displayName: "Enquiry acknowledgement", previewData: { name: "Rahul", service: "Ecommerce Development" } } satisfies TemplateEntry;
const main = { backgroundColor: "#f5f8fc", fontFamily: "Manrope, Arial, sans-serif" };
const container = { backgroundColor: "#ffffff", margin: "28px auto", maxWidth: "560px", padding: "28px" };
const heading = { color: "#0b1f3a", fontSize: "24px", margin: "0 0 18px" };
const text = { color: "#334155", fontSize: "14px", lineHeight: "1.7" };
const box = { backgroundColor: "#eef6ff", borderRadius: "6px", marginTop: "20px", padding: "12px 16px" };
const boxText = { color: "#0b1f3a", fontSize: "13px", margin: 0 };
const footer = { color: "#64748b", fontSize: "11px", marginTop: "26px" };