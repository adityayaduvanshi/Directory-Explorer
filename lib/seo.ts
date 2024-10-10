import { Metadata } from 'next';
import { siteConfig } from './siteConfig';

export function generateSEO({
  title = siteConfig.name,
  description = siteConfig.description,
  keywords = siteConfig.keywords,
  ogImage = siteConfig.ogImage,
  path = '',
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  path?: string;
} = {}): Metadata {
  const fullUrl = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: siteConfig.creator }],
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: siteConfig.name,
      images: [{ url: ogImage }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: siteConfig.links.twitter.split('/').pop(),
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-icon.png',
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: fullUrl,
      languages: Object.fromEntries(
        siteConfig.locales.map((locale) => [
          locale,
          `${siteConfig.url}/${locale}${path}`,
        ])
      ),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
    },
    other: {
      'application-name': siteConfig.name,
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': siteConfig.name,
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
      'msapplication-config': '/browserconfig.xml',

      'msapplication-tap-highlight': 'no',
    },
  };
}
