import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { clinicConfig } from '@/config/clinic.config';
import { Navbar, MobileBottomBar, FloatingWhatsApp, Footer } from '@/components';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#17324D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://lumiere-dental.vercel.app'),
  title: {
    default: `${clinicConfig.identity.name} | Bespoke Aesthetic & Restorative Dentistry | Bandra West, Mumbai`,
    template: `%s | ${clinicConfig.identity.name} Bandra West Mumbai`,
  },
  description:
    'Lumière Dental Studio is a premier boutique dental clinic on Turner Road, Bandra West, Mumbai. Specializing in master porcelain veneers, computer-guided dental implants, Invisalign clear aligners, and painless biomimetic dental care by Dr. Aanya Mehta.',
  keywords: [
    'Dental Clinic Bandra West',
    'Dentist Bandra Mumbai',
    'Porcelain Veneers Mumbai',
    'Dental Implants Bandra West',
    'Invisalign Mumbai',
    'Dr Aanya Mehta Dentist',
    'Cosmetic Dentistry Mumbai',
    'Painless Root Canal Bandra',
    'Teeth Whitening Bandra West',
    'Lumière Dental Studio'
  ],
  authors: [{ name: clinicConfig.doctor.name }],
  creator: clinicConfig.identity.name,
  publisher: clinicConfig.identity.name,
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://lumiere-dental.vercel.app',
    siteName: clinicConfig.identity.name,
    title: `${clinicConfig.identity.name} | Bespoke Dentistry in Bandra West, Mumbai`,
    description:
      'Calm, unhurried, biomimetic dentistry on Turner Road, Bandra West. Master porcelain veneers, 3D implants, and laser aesthetics.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Lumière Dental Studio Interior Suite Bandra West Mumbai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${clinicConfig.identity.name} | Bandra West Mumbai`,
    description:
      'Experience calm, precision dental architecture in a boutique setting on Turner Road, Bandra West.',
    images: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#F7F5F0] text-[#243244] font-sans antialiased selection:bg-[#C49A59]/30 selection:text-[#17324D]">
        {/*
          CRITICAL MOBILE COLLISION SAFEGUARD:
          pb-24 md:pb-0 ensures the persistent fixed mobile bottom action bar
          never obscures any footer content, copyright text, or disclaimers.
        */}
        <div className="flex min-h-screen flex-col pb-24 md:pb-0">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <MobileBottomBar />
        </div>
      </body>
    </html>
  );
}
