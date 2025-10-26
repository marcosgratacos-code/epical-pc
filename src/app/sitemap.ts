import { MetadataRoute } from 'next'
import { PRODUCTS } from './lib/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://epical-pc.com'
  
  // Páginas estáticas
  const staticPages = [
    '',
    '/productos',
    '/pc-a-medida',
    '/comparador',
    '/ventajas',
    '/contacto',
    '/faq',
    '/favoritos',
    '/seguimiento',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' as const : 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Páginas de productos
  const productPages = PRODUCTS.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...productPages]
}

