import '../styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Global meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* SEO meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="YouTube Transcript Generator" />
        
        {/* Open Graph meta tags for social sharing */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="YouTube Transcript Generator" />
        <meta property="og:title" content="Free YouTube Transcript Generator - Convert Video to Text" />
        <meta property="og:description" content="Free YouTube transcript generator. Convert any YouTube video to text instantly. Download transcripts as TXT or SRT files." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://your-domain.vercel.app" />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free YouTube Transcript Generator" />
        <meta name="twitter:description" content="Convert any YouTube video to text instantly. Free and easy to use." />
        <meta name="twitter:image" content="/og-image.png" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://your-domain.vercel.app" />
        
        {/* Google Analytics - Replace GA_MEASUREMENT_ID with your actual ID */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
        
        {/* Google AdSense - Replace with your AdSense publisher ID */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
          crossOrigin="anonymous"
        />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "YouTube Transcript Generator",
              "description": "Free tool to convert YouTube videos to text transcripts",
              "url": "https://your-domain.vercel.app",
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "YouTube Transcript Generator"
              }
            })
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

