import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-10 w-10">
            <Image
              src="/logos/turkish-airlines.svg"
              alt="Turkish Airlines Logo"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <span className="font-bold text-lg text-red-600">Turkish Airlines</span>
            <span className="block text-xs text-gray-500">Digital Lab</span>
          </div>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link 
            href="/" 
            className="text-gray-700 hover:text-red-600 transition-colors"
          >
            Main Menu
          </Link>
          <Link 
            href="./about-our-technology" 
            className="text-gray-700 hover:text-red-600 transition-colors"
          >
            About Our Technology
          </Link>
          <Link 
            href="https://www.turkishairlines.com" 
            target="_blank"
            className="text-gray-700 hover:text-red-600 transition-colors"
          >
            Turkish Airlines Web Site
          </Link>
        </div>
      </div>
    </nav>
  );
}