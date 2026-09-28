import './globals.css';
import Navbar from '@/components/layout/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Navbar সব পেজে উপরে দেখাবে */}
        <Navbar />

        {/* প্রতিটা পেজের কনটেন্ট এখানে আসবে */}
        {children}
      </body>
    </html>
  );
}
