'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Product } from '@/lib/supabase'
import { addToCart } from '@/lib/cart'

export default function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative overflow-hidden rounded-sm mb-4 aspect-[4/5]"
        style={{ background: 'var(--warm-white)', border: '1px solid rgba(201,169,110,0.12)' }}>
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
            <span className="font-display text-6xl italic" style={{ color: 'rgba(201,169,110,0.25)' }}>
              {product.name[0]}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(26,24,22,0.6) 0%, transparent 60%)' }}>
          <button
            onClick={handleAddToCart}
            className="w-full py-3 text-xs tracking-widest uppercase transition-all"
            style={{
              background: added ? 'var(--gold)' : 'rgba(250,248,245,0.95)',
              color: added ? 'var(--charcoal)' : 'var(--charcoal)',
            }}>
            {added ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>

        {product.stock === 0 && (
          <div className="absolute top-3 left-3 px-3 py-1 text-xs tracking-wider uppercase"
            style={{ background: 'rgba(26,24,22,0.7)', color: 'rgba(250,248,245,0.7)' }}>
            Sold Out
          </div>
        )}
      </div>

      <div className="px-1">
        {product.category && (
          <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--gold)' }}>
            {product.category}
          </p>
        )}
        <h3 className="font-display text-xl font-light leading-snug group-hover:opacity-70 transition-opacity"
          style={{ color: 'var(--charcoal)' }}>
          {product.name}
        </h3>
        <p className="mt-1 text-sm font-light" style={{ color: 'var(--muted)' }}>
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  )
}
