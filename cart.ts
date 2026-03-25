import { Product } from './supabase'

export type CartItem = {
  product: Product
  quantity: number
}

export type Cart = CartItem[]

export function getCart(): Cart {
  if (typeof window === 'undefined') return []
  try {
    const cart = localStorage.getItem('cart')
    return cart ? JSON.parse(cart) : []
  } catch {
    return []
  }
}

export function saveCart(cart: Cart): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(product: Product, quantity = 1): Cart {
  const cart = getCart()
  const existing = cart.find(item => item.product.id === product.id)
  if (existing) {
    existing.quantity += quantity
  } else {
    cart.push({ product, quantity })
  }
  saveCart(cart)
  return cart
}

export function removeFromCart(productId: string): Cart {
  const cart = getCart().filter(item => item.product.id !== productId)
  saveCart(cart)
  return cart
}

export function updateQuantity(productId: string, quantity: number): Cart {
  const cart = getCart()
  const item = cart.find(i => i.product.id === productId)
  if (item) {
    if (quantity <= 0) return removeFromCart(productId)
    item.quantity = quantity
    saveCart(cart)
  }
  return cart
}

export function clearCart(): void {
  saveCart([])
}

export function getCartTotal(cart: Cart): number {
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
}

export function getCartCount(cart: Cart): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0)
}
