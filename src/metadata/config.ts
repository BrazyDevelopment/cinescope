// metadata/config.ts
import { Metadata } from 'next';

const Keywords = "nano node hosting, nano nodes, crypto node hosting, cryptocurrency nodes uk, validator nodes, testnet nodes, game servers, web hosting, cloud hosting, bare metal server, dedicated server, dedicated server midlands, dedicated server hosting, virtual server, vps hosting, vps hosting midlands, dedicated servers uk, vps servers uk, leamington web hosting, rugby web hosting, warwickshire website hosting, connectivity, colo, co-location, colocation, networking, security, secure hosting, business hosting, coventry, midlands, UK, GB, Hosting, ArmourHosting, CineScope, servers, service, fyfeweb, rugby web design, rugby website design, warwickshire website design";

// Base metadata configuration that will be shared across all pages
const baseMetadata: Partial<Metadata> = {
  metadataBase: new URL('https://cinescope-pi.vercel.app'),
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Common OpenGraph settings
  openGraph: {
    siteName: 'CineScope',
    locale: 'en_GB',
    type: 'website',
  },
  // Common Twitter settings
  twitter: {
    card: 'summary_large_image',
    creator: '@Armour_Hosting',
    site: '@Armour_Hosting',
  },
};

// Homepage metadata
export const homeMetadata: Metadata = {
  ...baseMetadata,
  title: 'CineScope | The TV & Movie Search Engine',
  description: "Search and find details about movies and TV shows",
  keywords: Keywords,
  openGraph: {
    ...baseMetadata.openGraph,
    title: "CineScope | The TV & Movie Search Engine",
    description: "Search and find details about movies and TV shows",
    images: [{
      url: '/cinescope.png',
      width: 1642,
      height: 894,
      alt: 'CineScope - Home'
    }],
  },
  twitter: {
    ...baseMetadata.twitter,
    title: 'CineScope | The TV & Movie Search Engine',
    description: "Search and find details about movies and TV shows",
    images: ['/cinescope.png'],
  },
};

// search page metadata
export const searchMetadata: Metadata = {
  ...baseMetadata,
  title: 'CineScope | Search',
  description: 'Begin your search!',
  keywords: Keywords,
  openGraph: {
    ...baseMetadata.openGraph,
    title: 'CineScope | Search',
    description: 'Begin your search!',
    images: [{
      url: '/cinescope.png',
      width: 1642,
      height: 894,
      alt: 'CineScope - Search'
    }],
  },
  twitter: {
    ...baseMetadata.twitter,
    title: 'CineScope | Search',
    description: 'Begin your search!',
    images: ['/cinescope.png'],
  },
};
