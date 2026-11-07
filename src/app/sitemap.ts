import type { MetadataRoute } from 'next';
import { clinicConfig } from '@/config/clinic.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lumiere-dental.vercel.app';
  const lastModified = new Date();

  // Static Core Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/treatments`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/doctor`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ];

  // Dynamic Treatment Detail Routes
  const treatmentRoutes: MetadataRoute.Sitemap = clinicConfig.treatments.map((treatment) => ({
    url: `${baseUrl}/treatments/${treatment.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...treatmentRoutes];
}
