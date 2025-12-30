import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    canonicalUrl?: string;
    type?: string;
    name?: string;
    image?: string;
    structuredData?: Record<string, any>;
}

const SEO = ({
    title = 'Queska - AI-Powered Travel Companion',
    description = 'Transform your travel experience with Queska. Get personalized AI-powered recommendations, real-time local insights, and accessible travel support.',
    canonicalUrl = 'https://queska.com',
    type = 'website',
    name = 'Queska',
    image = '/og-image.png',
    structuredData
}: SEOProps) => {
    const siteUrl = 'https://queska.com';
    const fullCanonicalUrl = canonicalUrl.startsWith('http') ? canonicalUrl : `${siteUrl}${canonicalUrl}`;
    const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullCanonicalUrl} />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={name} />
            <meta property="og:url" content={fullCanonicalUrl} />
            <meta property="og:image" content={fullImageUrl} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImageUrl} />

            {/* Structured Data (JSON-LD) */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
