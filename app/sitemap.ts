import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'
import { projects } from '@/lib/projects'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes = ['', '/projects', '/services', '/about', '/contact', '/privacy']
  const statics: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${site.url}${site.basePath}${r}`,
    lastModified: now,
    changeFrequency: r === '' ? 'weekly' : 'monthly',
    priority: r === '' ? 1 : 0.7,
  }))

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${site.url}${site.basePath}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...statics, ...projectPages]
}