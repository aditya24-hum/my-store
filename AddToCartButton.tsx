'use client'
import { useState } from 'react'
import { Product } from '@/lib/supabase'
import { addToCart } from '@/lib/cart'

export default function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const handleAdd = () => {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (product.stock === 0) {
    return (
      <button disabled className="w-full py-4 text-sm tracking-widest uppercase opacity-40"
        style={{ border: '1px solid var(--muted)', color: 'var(--muted)' }}>
        Out of Stock
      </button>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center border" style={{ borderColor: 'rgba(201,169,110,0.3)' }}>
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-12 flex items-center justify-center text-xl transition-colors hover:bg-stone-100"
            style={{ color: 'var(--charcoal)' }}>−</button>
          <span className="w-12 h-12 flex items-center justify-center text-sm" style={{ color: 'var(--charcoal)' }}>
            {quantity}
          </span>
          <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="w-10 h-12 flex items-center justify-center text-xl transition-colors hover:bg-stone-100"
            style={{ color: 'var(--charcoal)' }}>+</button>
        </div>
        <p className="text-xs" style={{ color: 'var(--muted)' }}>{product.stock} available</p>
      </div>

      <button onClick={handleAdd}
        className="w-full py-4 text-sm tracking-widest uppercase transition-all duration-300"
        style={{
          background: added ? 'var(--gold)' : 'var(--charcoal)',
          color: added ? 'var(--charcoal)' : 'var(--cream)',
        }}>
        {added ? '✓ Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  )
}
