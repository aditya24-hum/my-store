import { supabase, Product } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import AddToCartButton from '@/components/AddToCartButton'
import Link from 'next/link'

async function getProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return data
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  if (!product) notFound()

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <nav className="flex items-center gap-2 text-xs tracking-wider uppercase mb-12" style={{ color: 'var(--muted)' }}>
          <Link href="/" className="hover:opacity-60 transition-opacity">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:opacity-60 transition-opacity">Products</Link>
          <span>/</span>
          <span style={{ color: 'var(--charcoal)' }}>{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Image */}
          <div className="animate-fade-in">
            <div className="aspect-square rounded-sm overflow-hidden relative"
              style={{ background: 'var(--warm-white)', border: '1px solid rgba(201,169,110,0.15)' }}>
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-display text-6xl italic" style={{ color: 'rgba(201,169,110,0.3)' }}>
                    {product.name[0]}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="animate-fade-up py-4">
            {product.category && (
              <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--gold)' }}>{product.category}</p>
            )}
            <h1 className="font-display text-5xl lg:text-6xl font-light leading-tight mb-6" style={{ color: 'var(--charcoal)' }}>
              {product.name}
            </h1>
            <p className="font-display text-4xl font-light mb-8" style={{ color: 'var(--charcoal)' }}>
              ${product.price.toFixed(2)}
            </p>

            <div className="w-12 h-px mb-8" style={{ background: 'rgba(201,169,110,0.4)' }} />

            <p className="text-sm leading-relaxed mb-10" style={{ color: 'var(--muted)', lineHeight: '1.8' }}>
              {product.description}
            </p>

            <div className="mb-8">
              <p className="text-xs tracking-wider uppercase mb-2" style={{ color: product.stock > 0 ? 'var(--gold)' : '#ef4444' }}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
            </div>

            <AddToCartButton product={product} />

            <div className="mt-12 pt-8 border-t space-y-3" style={{ borderColor: 'rgba(201,169,110,0.2)' }}>
              {['Free shipping on orders over $150', '30-day returns, no questions asked', 'Sustainably packaged'].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
