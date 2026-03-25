'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Cart, getCart, getCartTotal, getCartCount } from '@/lib/cart'
import { loadStripe } from '@stripe/stripe-js'
import Link from 'next/link'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState<Cart>([])
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const c = getCart()
    setCart(c)
    setMounted(true)
    if (c.length === 0) router.push('/cart')
  }, [router])

  const handleCheckout = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to create checkout session')

      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe failed to load')

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: data.sessionId })
      if (stripeError) throw new Error(stripeError.message)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (!mounted) return null

  const total = getCartTotal(cart)
  const shipping = total >= 150 ? 0 : 12
  const grandTotal = total + shipping

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <div className="py-16 text-center border-b" style={{ borderColor: 'rgba(201,169,110,0.2)', background: 'var(--warm-white)' }}>
        <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--gold)' }}>Almost There</p>
        <h1 className="font-display text-5xl lg:text-6xl font-light" style={{ color: 'var(--charcoal)' }}>Checkout</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div>
            <h2 className="font-display text-2xl font-light mb-6" style={{ color: 'var(--charcoal)' }}>Your Order</h2>
            <div className="space-y-4 mb-8">
              {cart.map(item => (
                <div key={item.product.id} className="flex justify-between items-center py-3 border-b"
                  style={{ borderColor: 'rgba(201,169,110,0.15)' }}>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--charcoal)' }}>{item.product.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--charcoal)' }}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t" style={{ borderColor: 'rgba(201,169,110,0.2)' }}>
              <div className="flex justify-between text-sm" style={{ color: 'var(--muted)' }}>
                <span>Subtotal ({getCartCount(cart)} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ color: 'var(--muted)' }}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-display text-2xl font-light pt-3 border-t"
                style={{ borderColor: 'rgba(201,169,110,0.2)', color: 'var(--charcoal)' }}>
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Panel */}
          <div className="p-8 rounded-sm" style={{ background: 'var(--warm-white)', border: '1px solid rgba(201,169,110,0.2)' }}>
            <h2 className="font-display text-2xl font-light mb-6" style={{ color: 'var(--charcoal)' }}>
              Secure Payment
            </h2>

            <div className="space-y-4 mb-8">
              {[
                { icon: '🔒', text: 'SSL encrypted checkout' },
                { icon: '💳', text: 'Powered by Stripe — accepts all major cards' },
                { icon: '↩️', text: '30-day hassle-free returns' },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{item.text}</span>
                </div>
              ))}
            </div>

            {error && (
              <div className="mb-6 p-4 text-sm rounded-sm" style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca' }}>
                {error}
              </div>
            )}

            <button onClick={handleCheckout} disabled={loading}
              className="w-full py-4 text-sm tracking-widest uppercase transition-all disabled:opacity-50"
              style={{ background: 'var(--charcoal)', color: 'var(--cream)' }}>
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Redirecting to Stripe...
                </span>
              ) : `Pay $${grandTotal.toFixed(2)}`}
            </button>

            <Link href="/cart" className="block text-center mt-4 text-xs tracking-wider uppercase transition-opacity hover:opacity-60"
              style={{ color: 'var(--muted)' }}>
              ← Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
