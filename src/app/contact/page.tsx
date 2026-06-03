import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
    title: "Contact Us - Sarvam Real Estate",
    description: "Get in touch with Sarvam Real Estate for any inquiries regarding plots, villas, and properties in Hosur.",
    alternates: {
        canonical: "/contact",
    },
};

export default function ContactPage() {
    return <ContactPageClient />;
}
