import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'CyberScope AI — Cybersecurity Education Platform',
  description:
    'Learn ethical hacking, penetration testing, and network defense through interactive AI-powered simulations.',
  keywords: 'cybersecurity, ethical hacking, penetration testing, security training, CTF',
  openGraph: {
    title: 'CyberScope AI',
    description: 'Immersive cybersecurity education platform',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`} style={{ background: '#05080f' }}>
        {children}
      </body>
    </html>
  );
}
