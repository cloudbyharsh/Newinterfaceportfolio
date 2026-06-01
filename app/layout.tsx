import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Harsh Shah — Product Manager',
  description: 'Customer Success → Product · Building What Users Need. 6 years on the front lines of enterprise SaaS. Now building AI-powered products.',
  keywords: ['Harsh Shah', 'Product Manager', 'Toronto', 'AI PM', 'Customer Success'],
  openGraph: {
    title: 'Harsh Shah — Product Manager',
    description: 'From the front lines of CS to the heart of product.',
    locale: 'en_CA',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
