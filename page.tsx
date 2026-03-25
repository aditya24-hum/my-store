'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Cart, getCart, removeFromCart, updateQuantity, getCartTotal } from '@/lib/cart'

export default function CartPage() {
  const [cart, setCart] = useState<Cart>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setCart(getCart())
    setMounted(true)
  }, [])

  const handleRemove = (productId: string) => {
    setCart(removeFromCart(productId))
  }

  const handleQuantity = (productId: string, qty: number) => {
    setCart(updateQuantity(productId, qty))
  }

  const total = getCartTotal(cart)

  if (!mounted) return null

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <div className="py-16 text-center border-b" style={{ borderColor: 'rgba(201,169,110,0.2)', background: 'var(--warm-white)' }}>
        <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--gold)' }}>Your Selection</p>
        <h1 className="font-display text-5xl lg:text-6xl font-light" style={{ color: 'var(--charcoal)' }}>
          Shopping Cart
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
        {cart.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-4xl font-light mb-4" style={{ color: 'var(--muted)' }}>Your cart is empty</p>
            <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>Discover something beautiful</p>
            <Link href="/products" className="px-8 py-4 text-sm tracking-widest uppercase transition-all hover:opacity-80"
              style={{ background: 'var(--charcoal)', color: 'var(--cream)' }}>
              Browse Collection
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-6 pb-6 border-b animate-fade-up"
                  style={{ borderColor: 'rgba(201,169,110,0.15)' }}>
                  <Link href={`/products/${item.product.id}`}>
                    <div className="w-24 h-24 rounded-sm overflow-hidden flex-shrink-0 relative"
                      style={{ background: 'var(--warm-white)', border: '1px solid rgba(201,169,110,0.15)' }}>
                      {item.product.image_url ? (
                        <Image src={item.product.image_url} alt={item.product.name} fill className="object-cover" sizes="96px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="font-display text-2xl italic" style={{ color: 'rgba(201,169,110,0.4)' }}>
                            {item.product.name[0]}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <Link href={`/products/${item.product.id}`}>
                        <h3 className="font-display text-xl font-light hover:opacity-70 transition-opacity" style={{ color: 'var(--charcoal)' }}>
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="font-display text-xl font-light" style={{ color: 'var(--charcoal)' }}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    {item.product.category && (
                      <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--gold)' }}>{item.product.category}</p>
                    )}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border" style={{ borderColor: 'rgba(201,169,110,0.3)' }}>
                        <button onClick={() => handleQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-lg transition-colors hover:bg-stone-100"
                          style={{ color: 'var(--charcoal)' }}>−</button>
                        <span className="w-10 h-8 flex items-center justify-center text-sm" style={{ color: 'var(--charcoal)' }}>
                          {item.quantity}
                        </span>
                        <button onClick={() => handleQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-lg transition-colors hover:bg-stone-100"
                          style={{ color: 'var(--charcoal)' }}>+</button>
                      </div>
                      <button onClick={() => handleRemove(item.product.id)}
                        className="text-xs tracking-widest uppercase transition-opacity hover:opacity-40"
                        style={{ color: 'var(--muted)' }}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8 p-8 rounded-sm" style={{ background: 'var(--warm-white)', border: '1px solid rgba(201,169,110,0.2)' }}>
                <h2 className="font-display text-2xl font-light mb-6" style={{ color: 'var(--charcoal)' }}>Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm" style={{ color: 'var(--muted)' }}>
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm" style={{ color: 'var(--muted)' }}>
                    <span>Shipping</span>
                    <span>{total >= 150 ? 'Free' : '$12.00'}</span>
                  </div>
                  <div className="pt-3 border-t flex justify-between font-display text-xl font-light"
                    style={{ borderColor: 'rgba(201,169,110,0.2)', color: 'var(--charcoal)' }}>
                    <span>Total</span>
                    <span>${(total >= 150 ? total : total + 12).toFixed(2)}</span>
                  </div>
                </div>
                <Link href="/checkout"
                  className="block w-full py-4 text-sm tracking-widest uppercase text-center transition-all hover:opacity-80"
                  style={{ background: 'var(--charcoal)', color: 'var(--cream)' }}>
                  Proceed to Checkout
                </Link>
                <Link href="/products"
                  className="block w-full py-3 text-xs tracking-widest uppercase text-center mt-3 transition-opacity hover:opacity-60"
                  style={{ color: 'var(--muted)' }}>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
