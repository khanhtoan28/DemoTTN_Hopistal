'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Sổ vàng', path: '/golden-book' },
    { name: 'Hiện vật', path: '/artifact' },
    { name: 'Lịch sử', path: '/history' },
    { name: 'Giới thiệu', path: '/introduction' },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-primary-dark text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <Image 
                src="/img/logo.webp" 
                alt="Logo Bệnh viện Trung ương Thái Nguyên"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-semibold">BỆNH VIỆN TRUNG ƯƠNG THÁI NGUYÊN</div>
              <div className="text-xs">THAI NGUYEN NATIONAL HOSPITAL</div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  pathname === item.path
                    ? 'bg-white text-primary-dark font-semibold'
                    : 'hover:bg-white hover:bg-opacity-20'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-white border-opacity-20">
            <div className="flex flex-col space-y-2 pt-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={closeMenu}
                  className={`px-4 py-3 rounded-lg transition-all duration-300 ${
                    pathname === item.path
                      ? 'bg-white text-primary-dark font-semibold'
                      : 'hover:bg-white hover:bg-opacity-20'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

