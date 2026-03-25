'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/store'
import { loadStripe } from '@stripe/stripe-js'
import { ArrowRight, Loader2 } from 'lucide-react'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export function CheckoutButton() {
  const items = useCartStore((s) => s.items)
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })

      const { sessionId, error } = await res.json()
      if (error) throw new Error(error)

      const stripe = await stripePromise
      const result = await stripe!.redirectToCheckout({ sessionId })
      if (result?.error) throw new Error(result.error.message)
    } catch (err) {
      console.error(err)
      alert('Checkout failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading || items.length === 0}
      className="w-full py-4 px-8 bg-obsidian text-cream text-sm tracking-widest uppercase font-body hover:bg-rust transition-colors duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          Processing...
        </>
      ) : (
        <>
          Proceed to Checkout
          <ArrowRight size={16} />
        </>
      )}
    </button>
  )
}
