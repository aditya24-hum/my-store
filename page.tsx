import Link from 'next/link'
import Image from 'next/image'
import { supabase, Product } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'

async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .limit(4)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  return data || []
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center" style={{ background: 'var(--charcoal)' }}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #c9a96e 0%, transparent 60%), radial-gradient(circle at 80% 20%, #8c8075 0%, transparent 50%)' }}
        />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #c9a96e 0, #c9a96e 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div style={{ animationDelay: '0ms' }} className="animate-fade-up">
            <p className="text-xs tracking-[0.4em] uppercase mb-6" style={{ color: 'var(--gold)' }}>
              New Collection 2024
            </p>
            <h1 className="font-display text-6xl lg:text-8xl font-light leading-none mb-8" style={{ color: 'var(--cream)' }}>
              Objects of
              <em className="block italic" style={{ color: 'var(--gold)' }}>Quiet Beauty</em>
            </h1>
            <p className="text-lg font-light leading-relaxed mb-10 max-w-md" style={{ color: 'var(--gold-light)', opacity: 0.7 }}>
              Thoughtfully curated pieces that bring intention and calm to everyday living.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/products"
                className="px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-80"
                style={{ background: 'var(--gold)', color: 'var(--charcoal)', fontWeight: 500 }}>
                Shop Collection
              </Link>
              <Link href="/products"
                className="px-8 py-4 text-sm tracking-widest uppercase border transition-all duration-300 hover:opacity-70"
                style={{ borderColor: 'rgba(201,169,110,0.4)', color: 'var(--gold-light)' }}>
                Explore More
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="aspect-[3/4] rounded-sm overflow-hidden"
              style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)' }}>
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.3)' }}>
                    <span className="font-display text-4xl italic" style={{ color: 'var(--gold)' }}>M</span>
                  </div>
                  <p className="text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(201,169,110,0.5)' }}>Maison</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-sm"
              style={{ background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.15)' }} />
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full"
              style={{ background: 'rgba(201,169,110,0.08)' }} />
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in"
          style={{ animationDelay: '600ms' }}>
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(201,169,110,0.5)' }}>Scroll</span>
          <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, rgba(201,169,110,0.5), transparent)' }} />
        </div>
      </section>

      {/* Values strip */}
      <section className="py-6 border-y" style={{ borderColor: 'rgba(201,169,110,0.2)', background: 'var(--warm-white)' }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 lg:gap-16">
          {['Free Shipping Over $150', 'Sustainably Sourced', '30-Day Returns', 'Handpicked Quality'].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full" style={{ background: 'var(--gold)' }} />
              <span className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: 'var(--muted)' }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--gold)' }}>Featured</p>
            <h2 className="font-display text-5xl lg:text-6xl font-light" style={{ color: 'var(--charcoal)' }}>
              New Arrivals
            </h2>
          </div>
          <Link href="/products"
            className="hidden md:flex items-center gap-3 text-sm tracking-wider uppercase pb-1 transition-opacity hover:opacity-60"
            style={{ color: 'var(--charcoal)', borderBottom: '1px solid var(--charcoal)' }}>
            View All
            <span>→</span>
          </Link>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-display text-3xl font-light mb-3" style={{ color: 'var(--muted)' }}>
              Setting up the collection...
            </p>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Add products to your Supabase database to see them here.
            </p>
            <Link href="/products" className="mt-6 inline-block text-sm tracking-wider underline" style={{ color: 'var(--gold)' }}>
              Browse All Products
            </Link>
          </div>
        )}
      </section>

      {/* Editorial Banner */}
      <section className="mx-6 lg:mx-12 mb-24 rounded-sm overflow-hidden relative"
        style={{ background: 'var(--charcoal)', minHeight: '400px' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #c9a96e 0%, transparent 60%)' }} />
        <div className="relative p-16 lg:p-24 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--gold)' }}>The Edit</p>
            <h3 className="font-display text-5xl lg:text-6xl font-light leading-tight mb-6" style={{ color: 'var(--cream)' }}>
              Craft &<br /><em className="italic" style={{ color: 'var(--gold)' }}>Intention</em>
            </h3>
            <p className="max-w-sm text-sm leading-relaxed" style={{ color: 'rgba(250,248,245,0.5)' }}>
              Every object in our collection is chosen for its material honesty, functional beauty, and the story behind its making.
            </p>
          </div>
          <Link href="/products"
            className="shrink-0 px-10 py-5 text-sm tracking-widest uppercase transition-all hover:opacity-80"
            style={{ border: '1px solid rgba(201,169,110,0.5)', color: 'var(--gold)' }}>
            Shop the Edit
          </Link>
        </div>
      </section>
    </div>
  )
}
