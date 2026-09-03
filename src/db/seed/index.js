import bcrypt from 'bcrypt';
import { pool } from '../../config/db.js';

async function seedAdmin() {
  const email = 'admin@libaseharam.com';
  const [existing] = await pool.query('SELECT id FROM admins WHERE email = ?', [email]);
  if (existing.length > 0) {
    console.log('Admin already exists, skipping.');
    return;
  }

  const passwordHash = await bcrypt.hash('ChangeMe123!', 12);
  await pool.query('INSERT INTO admins (name, email, password_hash) VALUES (?, ?, ?)', [
    'Store Admin',
    email,
    passwordHash,
  ]);
  console.log(`Admin created: ${email} / ChangeMe123! (change this after first login)`);
}

async function seedCategories() {
  const categories = [
    { name: 'Men', slug: 'men', sortOrder: 1 },
    { name: 'Women', slug: 'women', sortOrder: 2 },
    { name: 'Kids', slug: 'kids', sortOrder: 3 },
  ];

  for (const category of categories) {
    const [existing] = await pool.query('SELECT id FROM categories WHERE slug = ?', [category.slug]);
    if (existing.length > 0) continue;
    await pool.query(
      'INSERT INTO categories (parent_id, name, slug, sort_order, is_active) VALUES (NULL, ?, ?, ?, 1)',
      [category.name, category.slug, category.sortOrder],
    );
    console.log(`Category created: ${category.name}`);
  }
}

async function seedSampleProducts() {
  const [categories] = await pool.query('SELECT id, slug FROM categories WHERE parent_id IS NULL');
  const categoryIdBySlug = Object.fromEntries(categories.map((c) => [c.slug, c.id]));

  const products = [
    {
      categorySlug: 'men',
      name: 'Classic Cotton Jubbah',
      slug: 'classic-cotton-jubbah',
      description: 'A breathable, comfortable cotton jubbah suited for daily prayer wear and travel.',
      fabric: 'Cotton',
      basePrice: 3200,
      compareAtPrice: null,
      isFeatured: 1,
      variants: [
        { size: 'M', color: 'White', sku: 'JUB-M-WHT', stockQuantity: 20 },
        { size: 'L', color: 'White', sku: 'JUB-L-WHT', stockQuantity: 18 },
        { size: 'XL', color: 'White', sku: 'JUB-XL-WHT', stockQuantity: 10 },
      ],
    },
    {
      categorySlug: 'women',
      name: 'Elegant Umrah Abaya',
      slug: 'elegant-umrah-abaya',
      description: 'A flowing, modest abaya designed for comfort and elegance during Umrah.',
      fabric: 'Nida',
      basePrice: 4500,
      compareAtPrice: 5200,
      isFeatured: 1,
      variants: [
        { size: 'S', color: 'Black', sku: 'ABY-S-BLK', stockQuantity: 15 },
        { size: 'M', color: 'Black', sku: 'ABY-M-BLK', stockQuantity: 22 },
        { size: 'L', color: 'Beige', sku: 'ABY-L-BEG', stockQuantity: 12 },
      ],
    },
    {
      categorySlug: 'kids',
      name: "Boys Prayer Set",
      slug: 'boys-prayer-set',
      description: 'A comfortable two-piece prayer set for boys, perfect for Hajj and Umrah travel.',
      fabric: 'Cotton Blend',
      basePrice: 1800,
      compareAtPrice: null,
      isFeatured: 1,
      variants: [
        { size: '4-6y', color: 'White', sku: 'KID-46-WHT', stockQuantity: 14 },
        { size: '7-9y', color: 'White', sku: 'KID-79-WHT', stockQuantity: 11 },
      ],
    },
  ];

  for (const product of products) {
    const categoryId = categoryIdBySlug[product.categorySlug];
    if (!categoryId) continue;

    const [existing] = await pool.query('SELECT id FROM products WHERE slug = ?', [product.slug]);
    if (existing.length > 0) continue;

    const [result] = await pool.query(
      `INSERT INTO products (category_id, name, slug, description, fabric, base_price, compare_at_price, is_featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [categoryId, product.name, product.slug, product.description, product.fabric, product.basePrice, product.compareAtPrice, product.isFeatured],
    );
    const productId = result.insertId;

    for (const variant of product.variants) {
      await pool.query(
        `INSERT INTO product_variants (product_id, size, color, sku, stock_quantity) VALUES (?, ?, ?, ?, ?)`,
        [productId, variant.size, variant.color, variant.sku, variant.stockQuantity],
      );
    }
    console.log(`Product created: ${product.name}`);
  }
}

async function seedSettings() {
  const defaults = {
    store_name: 'Libas-e-Haram',
    store_email: 'info@libaseharam.com',
    store_phone: '+92 322 1527802',
    store_address: 'Gujranwala, Punjab, Pakistan',
    default_shipping_rate: '200',
    free_shipping_threshold: '5000',
    return_window_days: '7',
    return_policy_text: 'Items can be returned within 7 days of delivery if unused and in original packaging. Contact us to arrange a return.',
  };

  for (const [key, value] of Object.entries(defaults)) {
    await pool.query(
      'INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_key = setting_key',
      [key, value],
    );
  }
  console.log('Default settings ensured.');
}

async function run() {
  try {
    await seedAdmin();
    await seedCategories();
    await seedSampleProducts();
    await seedSettings();
    console.log('Seed complete.');
  } finally {
    await pool.end();
  }
}

run().catch((error) => {
  console.error('Seed failed:', error.message);
  process.exit(1);
});
