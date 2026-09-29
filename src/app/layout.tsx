import './globals.css';
import type { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { FitlogProvider } from '@/context/FitlogContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="bg-[#0C0D10]">
        <FitlogProvider>
          <Navbar />
          {children}
          <Footer />

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#15171D',
                color: '#ffffff',
                border: '1px solid #222630',
              },
            }}
          />
        </FitlogProvider>
      </body>
    </html>
  );
}
