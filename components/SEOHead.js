import Head from 'next/head';

export default function SEOHead({ 
  title = "Appaloosa Dreams - Mystical Horse NFT Collection",
  description = "Enter the ethereal realm where 24 mystical Appaloosa horses await their chosen guardians. Each magnificent creature carries sacred runes and ancient wisdom in this exclusive NFT collection.",
  keywords = "NFT, Appaloosa, horses, mystical, blockchain, ethereum, digital art, collectibles, sacred runes",
  ogImage = "/images/logo.jpg",
  url = "https://appaloosadreams.com"
}) {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Appaloosa Dreams" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Appaloosa Dreams" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:site" content="@theunfoldingai" />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="theme-color" content="#daa520" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* PWA Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Appaloosa Dreams",
            "description": description,
            "url": url,
            "image": ogImage,
            "author": {
              "@type": "Organization",
              "name": "Appaloosa Dreams"
            },
            "mainEntity": {
              "@type": "NFT",
              "name": "Mystical Appaloosa Horses",
              "description": "24 unique mystical Appaloosa horse NFTs with sacred runes"
            }
          })
        }}
      />
    </Head>
  );
}