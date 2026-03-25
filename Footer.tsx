import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-auto border-t" style={{ borderColor: 'rgba(201,169,110,0.2)', background: 'var(--charcoal)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <Link href="/" className="font-display text-3xl font-light tracking-widest" style={{ color: 'var(--cream)' }}>
              Maison
            </Link>
            <p className="mt-4 text-xs leading-relaxed max-w-xs" style={{ color: 'rgba(250,248,245,0.4)' }}>
              Thoughtfully curated objects for the modern home. Every piece chosen with intention.
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-5" style={{ color: 'var(--gold)' }}>Shop</p>
            <div className="space-y-3">
              {[
                { href: '/products', label: 'All Products' },
                { href: '/cart', label: 'Cart' },
                { href: '/checkout', label: 'Checkout' },
              ].map(link => (
                <Link key={link.href} href={link.href}
                  className="block text-xs tracking-wider transition-opacity hover:opacity-50"
                  style={{ color: 'rgba(250,248,245,0.5)' }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-5" style={{ color: 'var(--gold)' }}>Support</p>
            <div className="space-y-3">
              {['Shipping & Returns', 'Size Guide', 'Contact Us', 'FAQ'].map(item => (
                <p key={item} className="text-xs tracking-wider" style={{ color: 'rgba(250,248,245,0.5)' }}>{item}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: 'rgba(201,169,110,0.1)' }}>
          <p className="text-xs" style={{ color: 'rgba(250,248,245,0.3)' }}>
            © {new Date().getFullYear()} Maison. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'rgba(250,248,245,0.2)' }}>
            Secure payments by Stripe
          </p>
        </div>
      </div>
    </footer>
  )
}
