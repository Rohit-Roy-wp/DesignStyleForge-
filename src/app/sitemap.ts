import { MetadataRoute } from 'next';
import { TOOLS_DATA } from '@/data/toolsData';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://designstyleforge.com';

  const toolUrls: MetadataRoute.Sitemap = TOOLS_DATA.map((tool) => ({
    url: `${baseUrl}${tool.route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: tool.popular ? 0.9 : 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/privacy-policy/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...toolUrls,
  ];
}
