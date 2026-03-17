import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pradeep's Science — Physics, Biology & Chemistry | Class 9",
  description:
    "Concept flowcharts and bird's-eye views for Pradeep's Science textbooks. Physics, Biology, and Chemistry for Class 9.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
