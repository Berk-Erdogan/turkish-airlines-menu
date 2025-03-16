import './globals.css';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'THY Flight Menu App',
  description: 'Turkish Airlines Flight Menu Web Application for Digital Lab Assesment. Developed by Berk Erdoğan',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <NavBar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-white py-6 border-t">
            <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Turkish Airlines Digital Lab Assesment. Developped by Berk Erdoğan
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}