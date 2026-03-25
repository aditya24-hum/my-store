'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getCart, getCartCount } from '@/lib/cart'

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const updateCart = () => setCartCount(getCartCount(getCart()))
    updateCart()
    window.addEventListener('storage', updateCart)
    const interval = setInterval(updateCart, 500)

    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('storage', updateCart)
      window.removeEventListener('scroll', handleScroll)
      clearInterval(interval)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(250,248,245,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,169,110,0.15)' : '1px solid transparent',
      }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="font-display text-2xl font-light tracking-widest" style={{ color: 'var(--charcoal)' }}>
            Maison
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              { href: '/', label: 'Home' },
              { href: '/products', label: 'Shop' },
            ].map(link => (
              <Link key={link.href} href={link.href}
                className="text-xs tracking-[0.2em] uppercase transition-opacity hover:opacity-50"
                style={{ color: 'var(--charcoal)' }}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-6">
            <Link href="/cart" className="relative flex items-center gap-2 transition-opacity hover:opacity-60"
              style={{ color: 'var(--charcoal)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-xs font-medium"
                  style={{ background: 'var(--gold)', color: 'var(--charcoal)', fontSize: '10px' }}>
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: 'var(--charcoal)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {menuOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></>
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t animate-slide-in" style={{ borderColor: 'rgba(201,169,110,0.2)', background: 'var(--cream)' }}>
          <div className="px-6 py-6 space-y-4">
            {[
              { href: '/', label: 'Home' },
              { href: '/products', label: 'Shop All' },
              { href: '/cart', label: 'Cart' },
            ].map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className="block text-sm tracking-[0.2em] uppercase py-2 transition-opacity hover:opacity-50"
                style={{ color: 'var(--charcoal)', borderBottom: '1px solid rgba(201,169,110,0.1)' }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
