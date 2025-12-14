import React from 'react';

interface MetaTagsProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    keywords?: string[];
    author?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({
    title = 'Sacred Heart Secondary School',
    description = 'Sacred Heart Secondary School provides quality education with a focus on academic excellence, character development, and holistic growth for students.',
    image = '/images/homepage/sacred.jpg',
    url = '/',
    type = 'website',
    keywords = ['school', 'education', 'secondary school', 'south africa'],
    author = 'Sacred Heart Secondary School'
}) => {
    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords.join(', ')} />
            <meta name="author" content={author} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={`${window.location.origin}${url}`} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </>
    );
};

export default MetaTags;
