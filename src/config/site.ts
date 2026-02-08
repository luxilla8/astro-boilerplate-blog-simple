import { getCollection } from 'astro:content';

export async function getSiteConfig() {
  const [settings] = await getCollection('siteSettings');
  const [nav] = await getCollection('navigation');
  const s = settings?.data;
  const navLinks = nav?.data?.links || [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
  ];

  const socialObj = {
    twitter: s?.twitter || '',
    github: s?.github || '',
    linkedin: s?.linkedin || '',
    youtube: s?.youtube || '',
    instagram: s?.instagram || '',
  };

  const sameAs = Object.entries(socialObj)
    .filter(([, v]) => v)
    .map(([platform, value]) =>
      value.startsWith('http') ? value : `https://${platform}.com/${value.replace('@', '')}`
    );

  return {
    name: s?.name || 'Astro Blog',
    tagline: s?.tagline || '',
    description: s?.description || '',
    url: s?.url || 'https://example.com',
    logo: s?.logo || '/favicon.svg',
    ogImage: s?.ogImage || '/og-image.png',
    author: {
      name: s?.authorName || 'Your Name',
      email: s?.authorEmail || '',
      url: s?.authorUrl || '',
    },
    organization: {
      name: s?.name || 'Astro Blog',
      logo: s?.logo || '/favicon.svg',
      sameAs,
    },
    social: socialObj,
    seo: {
      titleTemplate: `%s | ${s?.name || 'Astro Blog'}`,
      defaultTitle: s?.name || 'Astro Blog',
      openGraph: { type: 'website' as const, locale: 'en_US' },
      twitter: { cardType: 'summary_large_image' as const },
    },
    features: {
      newsletter: {
        enabled: s?.newsletterEnabled || false,
        provider: s?.newsletterProvider || 'mailchimp',
        action: s?.newsletterAction || '',
      },
      comments: { enabled: false, provider: 'giscus' },
      analytics: {
        enabled: s?.analyticsEnabled || false,
        googleId: s?.analyticsGoogleId || '',
      },
    },
    nav: { links: navLinks },
  };
}

export type SiteConfig = Awaited<ReturnType<typeof getSiteConfig>>;
