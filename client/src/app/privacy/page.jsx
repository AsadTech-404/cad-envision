import React from "react";

export default function PrivacyPage() {
  const sections = [
    {
      title: "Data Collection",
      content:
        "We collect email addresses and name information solely for account management and delivery of digital CAD assets.",
    },
    {
      title: "Payment Security",
      content:
        "Credit card transactions are processed via encrypted gateways. We do not store raw card data on our servers.",
    },
    {
      title: "Digital Rights",
      content:
        "Purchased files are licensed to the individual or company for professional use. Redistribution of raw DWG/DXF files is prohibited.",
    },
    {
      title: "Intellectual Property",
      content:
        "All content, designs, CAD assets, branding, and documentation on this platform remain the intellectual property of their respective creators. Unauthorized copying, modification, or redistribution may result in legal action.",
    },
    {
      title: "Data Storage & Protection",
      content:
        "We implement reasonable technical and organizational security measures to protect your data from unauthorized access, alteration, or loss. While no system is 100% secure, we continuously improve our safeguards.",
    },
    {
      title: "Cookies & Analytics",
      content:
        "We may use cookies and analytics tools to understand user behavior, improve performance, and enhance usability. These tools do not collect personally identifiable information without consent.",
    },
    {
      title: "Account Termination",
      content:
        "We reserve the right to suspend or terminate accounts found violating our terms, including misuse of licensed files, fraudulent activity, or abuse of platform services.",
    },
    {
      title: "Third-Party Services",
      content:
        "Our platform may integrate third-party services such as cloud storage, payment processors, or analytics providers. These services operate under their own privacy policies.",
    },
    {
      title: "Policy Updates",
      content:
        "We may update this Privacy & Terms policy from time to time. Continued use of the platform after changes are posted constitutes acceptance of the revised terms.",
    },
    {
      title: "Contact & Support",
      content:
        "If you have any questions regarding privacy, licensing, or data usage, please contact our support team through the official channels provided on this website.",
    },
  ];

  return (
    <div className="min-h-screen bg-blueprint-900 pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
          Privacy & Terms
        </h1>
        <div className="space-y-12">
          {sections.map((section, index) => (
            <div key={index} className="border-l-2 border-blueprint-500 pl-6">
              <h3 className="text-white font-bold uppercase tracking-wider mb-3">
                {index + 1}. {section.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
