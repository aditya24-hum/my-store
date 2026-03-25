'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { clearCart } from '@/lib/cart'

export default function SuccessPage() {
  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--cream)' }}>
      <div className="text-center max-w-lg animate-fade-up">
        {/* Checkmark */}
        <div className="w-24 h-24 mx-auto mb-10 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.3)' }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M10 20L17 27L30 13" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--gold)' }}>Order Confirmed</p>
        <h1 className="font-display text-5xl lg:text-6xl font-light leading-tight mb-6" style={{ color: 'var(--charcoal)' }}>
          Thank you for<br /><em className="italic" style={{ color: 'var(--gold)' }}>your order</em>
        </h1>

        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
          Your payment was successful. We've received your order and will begin preparing it with care.
        </p>
        <p className="text-sm leading-relaxed mb-12" style={{ color: 'var(--muted)' }}>
          A confirmation email will be sent to you shortly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products"
            className="px-8 py-4 text-sm tracking-widest uppercase transition-all hover:opacity-80"
            style={{ background: 'var(--charcoal)', color: 'var(--cream)' }}>
            Continue Shopping
          </Link>
          <Link href="/"
            className="px-8 py-4 text-sm tracking-widest uppercase border transition-all hover:opacity-70"
            style={{ borderColor: 'rgba(201,169,110,0.4)', color: 'var(--charcoal)' }}>
            Return Home
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t" style={{ borderColor: 'rgba(201,169,110,0.2)' }}>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            Questions about your order?{' '}
            <a href="mailto:hello@maison.com" className="underline hover:opacity-60 transition-opacity">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
