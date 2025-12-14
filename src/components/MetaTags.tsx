import React, { useEffect } from 'react';

interface MetaTagsProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    keywords?: string[];
    author?: string;
    canonical?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({
    title = 'Sacred Heart Secondary School - Quality Education in South Africa',
    description = 'Sacred Heart Secondary School provides quality education with a focus on academic excellence, character development, and holistic growth for students.',
    image = '/images/homepage/sacred.jpg',
    url = window.location.pathname,
    type = 'website',
    keywords = ['school', 'education', 'secondary school', 'south africa', 'boarding school', 'sacred heart'],
    author = 'Sacred Heart Secondary School'
}) => {
    useEffect(() => {
        // Update canonical URL
        const canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink) {
            canonicalLink.setAttribute('href', `https://sacredheartoakford.github.io${url}`);
        } else {
            const link = document.createElement('link');
            link.rel = 'canonical';
            link.href = `https://sacredheartoakford.github.io${url}`;
            document.head.appendChild(link);
        }

        // Update title
        document.title = title;

        // Update description
        const descriptionMeta = document.querySelector('meta[name="description"]');
        if (descriptionMeta) {
            descriptionMeta.setAttribute('content', description);
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = description;
            document.head.appendChild(meta);
        }

        // Update keywords
        const keywordsMeta = document.querySelector('meta[name="keywords"]');
        if (keywordsMeta) {
            keywordsMeta.setAttribute('content', keywords.join(', '));
        } else {
            const meta = document.createElement('meta');
            meta.name = 'keywords';
            meta.content = keywords.join(', ');
            document.head.appendChild(meta);
        }

        // Update author
        const authorMeta = document.querySelector('meta[name="author"]');
        if (authorMeta) {
            authorMeta.setAttribute('content', author);
        } else {
            const meta = document.createElement('meta');
            meta.name = 'author';
            meta.content = author;
            document.head.appendChild(meta);
        }

        // Update Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', title);
        } else {
            const meta = document.createElement('meta');
            meta.setAttribute('property', 'og:title');
            meta.setAttribute('content', title);
            document.head.appendChild(meta);
        }

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.setAttribute('content', description);
        } else {
            const meta = document.createElement('meta');
            meta.setAttribute('property', 'og:description');
            meta.setAttribute('content', description);
            document.head.appendChild(meta);
        }

        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) {
            ogImage.setAttribute('content', image);
        } else {
            const meta = document.createElement('meta');
            meta.setAttribute('property', 'og:image');
            meta.setAttribute('content', image);
            document.head.appendChild(meta);
        }

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) {
            ogUrl.setAttribute('content', `https://sacredheartoakford.github.io${url}`);
        } else {
            const meta = document.createElement('meta');
            meta.setAttribute('property', 'og:url');
            meta.setAttribute('content', `https://sacredheartoakford.github.io${url}`);
            document.head.appendChild(meta);
        }

        // Update Twitter tags
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) {
            twitterTitle.setAttribute('content', title);
        } else {
            const meta = document.createElement('meta');
            meta.setAttribute('name', 'twitter:title');
            meta.setAttribute('content', title);
            document.head.appendChild(meta);
        }

        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        if (twitterDescription) {
            twitterDescription.setAttribute('content', description);
        } else {
            const meta = document.createElement('meta');
            meta.setAttribute('name', 'twitter:description');
            meta.setAttribute('content', description);
            document.head.appendChild(meta);
        }

        const twitterImage = document.querySelector('meta[name="twitter:image"]');
        if (twitterImage) {
            twitterImage.setAttribute('content', image);
        } else {
            const meta = document.createElement('meta');
            meta.setAttribute('name', 'twitter:image');
            meta.setAttribute('content', image);
            document.head.appendChild(meta);
        }
    }, [title, description, image, url, keywords, author, canonical]);

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
            <meta property="og:url" content={`https://sacredheartoakford.github.io${url}`} />
            <meta property="og:site_name" content="Sacred Heart Secondary School" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Canonical URL */}
            <link rel="canonical" href={canonical} />
        </>
    );
};

export default MetaTags;
