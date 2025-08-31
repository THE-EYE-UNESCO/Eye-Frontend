import { Eye } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <Eye className="w-12 h-12 text-primary" />
            </div>
            <span className="text-xl font-bold text-secondary">The Eye</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-primary transition-colors">
              About
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Sign In
            </Link>
            <Link href="/signup" className="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium">
             Get Started
            </Link>
            
          </div>
        </div>
      </div>
    </header>
  )
}
