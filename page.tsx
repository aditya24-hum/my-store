import { supabase, Product } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'

async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return []
  return data || []
}

export default async function ProductsPage() {
  const products = await getProducts()
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))]

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <div className="py-20 text-center border-b" style={{ borderColor: 'rgba(201,169,110,0.2)', background: 'var(--warm-white)' }}>
        <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--gold)' }}>The Collection</p>
        <h1 className="font-display text-6xl lg:text-7xl font-light" style={{ color: 'var(--charcoal)' }}>
          All Products
        </h1>
        <p className="mt-4 text-sm" style={{ color: 'var(--muted)' }}>
          {products.length} {products.length === 1 ? 'piece' : 'pieces'} available
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {categories.length > 1 && (
          <div className="flex gap-3 flex-wrap mb-12">
            {categories.map((cat) => (
              <button key={cat} className="px-5 py-2 text-xs tracking-[0.2em] uppercase border transition-all duration-200 hover:opacity-70"
                style={{ borderColor: 'rgba(201,169,110,0.4)', color: 'var(--charcoal)', background: cat === 'All' ? 'rgba(201,169,110,0.1)' : 'transparent' }}>
                {cat}
              </button>
            ))}
          </div>
        )}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${(i % 8) * 60}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <p className="font-display text-4xl font-light mb-4" style={{ color: 'var(--muted)' }}>No products yet</p>
            <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
              Add products to your Supabase <code className="text-xs bg-stone-100 px-1 py-0.5 rounded">products</code> table to populate this page.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
