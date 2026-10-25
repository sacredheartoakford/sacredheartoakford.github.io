import React, { useState } from 'react';

interface ResponsiveImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    loading?: 'lazy' | 'eager';
    quality?: number;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
    src,
    alt,
    className = '',
    width,
    height,
    loading = 'lazy',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
    };

    // Fallback for when image fails to load
    if (hasError) {
        return (
            <div className={`bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center ${className}`}>
                <span className="text-gray-500">Image not available</span>
            </div>
        );
    }

    // If we have width and height, use them for aspect ratio
    const style: React.CSSProperties = {};
    if (width && height) {
        style.aspectRatio = `${width}/${height}`;
    }

    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            loading={loading}
            style={style}
            onLoad={handleLoad}
            onError={handleError}
        />
    );
};

export default ResponsiveImage;
