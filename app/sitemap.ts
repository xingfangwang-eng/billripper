import { MetadataRoute } from 'next';
import { keywordsData } from '@/data/keywords';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://billripper.wangdadi.xyz';
  
  const keywordPages = keywordsData.map((keyword: any) => ({
    url: `${baseUrl}/rip/${keyword.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...keywordPages,
  ];
}
