-- Run this in your Supabase SQL editor

-- Create products table
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price decimal(10,2) not null,
  image_url text,
  category text,
  stock integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table products enable row level security;

-- Allow public read access
create policy "Products are publicly readable"
  on products for select
  using (true);

-- Insert sample products
insert into products (name, description, price, image_url, category, stock) values
  ('Linen Throw Blanket', 'Hand-loomed from premium stonewashed linen. Naturally textured with a soft, lived-in drape.', 148.00, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', 'Textiles', 12),
  ('Ceramic Pour-Over Set', 'Hand-thrown stoneware pour-over and vessel. Each piece unique with subtle glaze variations.', 89.00, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800', 'Kitchen', 8),
  ('Beeswax Taper Candles (Set of 6)', 'Pure beeswax tapers with a warm honey glow. Burns cleanly for 8+ hours.', 42.00, 'https://images.unsplash.com/photo-1602607863049-bc1b4e04aff8?w=800', 'Home', 25),
  ('Woven Market Basket', 'Hand-woven seagrass basket with leather handles. Functional and beautiful.', 76.00, 'https://images.unsplash.com/photo-1558171813-16c1f8bc3c39?w=800', 'Storage', 15),
  ('Marble Serving Board', 'Honed white Carrara marble board with natural veining. Perfect for entertaining.', 125.00, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', 'Kitchen', 6),
  ('Merino Wool Cushion', 'Undyed merino wool cover with feather-down insert. In natural oatmeal.', 95.00, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800', 'Textiles', 18),
  ('Terracotta Planter (Large)', 'Hand-formed terracotta with a matte bisque finish. Includes drainage hole.', 58.00, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800', 'Garden', 10),
  ('Walnut Serving Spoons (Set of 3)', 'Hand-carved black walnut with a smooth satin finish. Food-safe and heirloom-quality.', 68.00, 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800', 'Kitchen', 20);

