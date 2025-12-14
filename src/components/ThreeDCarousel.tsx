import React, { useState, useEffect, useRef, useMemo } from 'react';

interface ThreeDCarouselProps {
  images?: string[];
  altTexts?: string[];
  className?: string;
}

const ThreeDCarousel: React.FC<ThreeDCarouselProps> = ({
  images = [],
  altTexts = [],
  className = ''
}) => {
  // Constants for the infinite loop logic
  // We clone 3 images at the start and 3 at the end to create the buffer
  const BUFFER_ITEMS = 3;

  // State
  const [itemsPerView, setItemsPerView] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(BUFFER_ITEMS);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragTranslate, setDragTranslate] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Refs
  const carouselRef = useRef<HTMLDivElement>(null);
  // Track if a drag occurred during the interaction to prevent clicks
  const hasDraggedRef = useRef(false);

  // Create the extended array with clones for infinite looping
  const { extendedImages, extendedAltTexts } = useMemo(() => {
    if (!images || images.length === 0) return { extendedImages: [], extendedAltTexts: [] };

    // Create clones: last 3 items -> start, first 3 items -> end
    const startClones = images.slice(-BUFFER_ITEMS);
    const endClones = images.slice(0, BUFFER_ITEMS);

    const startAltClones = altTexts.slice(-BUFFER_ITEMS);
    const endAltClones = altTexts.slice(0, BUFFER_ITEMS);

    return {
      extendedImages: [...startClones, ...images, ...endClones],
      extendedAltTexts: [...startAltClones, ...altTexts, ...endAltClones]
    };
  }, [images, altTexts]);

  // Handle resize to update items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else {
        setItemsPerView(3);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset index when images change to avoid out of bounds
  useEffect(() => {
    if (images.length > 0) {
      setCurrentIndex(BUFFER_ITEMS);
      setIsTransitioning(false);
    }
  }, [images.length]);

  // Handle the seamless loop reset when transition ends
  const handleTransitionEnd = () => {
    if (!images.length) return;

    const totalReal = images.length;

    // If we've scrolled past the real items to the end clones
    if (currentIndex >= totalReal + BUFFER_ITEMS) {
      setIsTransitioning(false); // Disable transition for instant jump
      setCurrentIndex(currentIndex - totalReal); // Jump back to the real item
    }
    // If we've scrolled past the start to the start clones
    else if (currentIndex < BUFFER_ITEMS) {
      setIsTransitioning(false); // Disable transition for instant jump
      setCurrentIndex(currentIndex + totalReal); // Jump forward to the real item
    }
  };

  // Helper to move slides with transition enabled
  const moveSlide = (direction: 'next' | 'prev') => {
    setIsTransitioning(true);
    setCurrentIndex(prev => direction === 'next' ? prev + 1 : prev - 1);
  };

  // Mouse/touch event handlers for dragging
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsAutoPlaying(false);
    setIsDragging(true);
    hasDraggedRef.current = false; // Reset drag flag
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setIsTransitioning(false); // Disable transition while dragging for 1:1 movement
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX;
    setDragTranslate(diff);

    // If moved significantly, mark as dragged
    if (Math.abs(diff) > 5) {
      hasDraggedRef.current = true;
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsAutoPlaying(true);

    const containerWidth = carouselRef.current?.offsetWidth || window.innerWidth;
    const threshold = containerWidth * 0.1;

    if (Math.abs(dragTranslate) > threshold) {
      setIsTransitioning(true); // Re-enable transition for the snap
      if (dragTranslate > 0) {
        // Swiped Right -> Previous
        setCurrentIndex(prev => prev - 1);
      } else {
        // Swiped Left -> Next
        setCurrentIndex(prev => prev + 1);
      }
    }

    setDragTranslate(0);
  };

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying || images.length === 0 || previewImage) return;

    const interval = setInterval(() => {
      moveSlide('next');
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length, previewImage, currentIndex]); // currentIndex dependency ensures loop continues

  const handleImageClick = (image: string) => {
    // If we dragged during this interaction, don't open preview
    if (hasDraggedRef.current) return;
    setPreviewImage(image);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  // If no images, render placeholder
  if (!images || images.length === 0) {
    return (
      <div className={`w-full h-96 flex items-center justify-center bg-gray-100 text-gray-400 ${className}`}>
        No images to display
      </div>
    );
  }

  return (
    <>
      <div className={`relative w-full h-96 overflow-hidden bg-transparent ${className}`}>
        {/* Carousel Track Container */}
        <div
          ref={carouselRef}
          className="relative w-full h-full cursor-grab active:cursor-grabbing"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={() => {
            if (isDragging) handleDragEnd();
          }}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div
            className="flex h-full"
            onTransitionEnd={handleTransitionEnd}
            style={{
              // Use percentage based transform logic
              transform: `translateX(calc(-${currentIndex * (100 / itemsPerView)}% + ${dragTranslate}px))`,
              transition: isTransitioning ? 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            }}
          >
            {extendedImages.map((image, index) => (
              <div
                key={index}
                className={`flex-shrink-0 h-full flex items-center justify-center p-0 transition-all duration-300 ${itemsPerView === 1 ? 'w-full' : 'w-1/3'}`}
              >
                <div
                  className="w-[95%] h-80 transition-transform duration-300 hover:scale-105"
                  onClick={() => handleImageClick(image)}
                >
                  <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl border-4 border-[#4747d7]">
                    <img
                      src={image}
                      alt={extendedAltTexts[index] || `Event image`}
                      className="w-full h-full object-cover pointer-events-none select-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
          {images.map((_, index) => {
            // Calculate active dot based on real index
            // We map the extended currentIndex back to the 0...length range
            let realIndex = currentIndex - BUFFER_ITEMS;
            if (realIndex < 0) realIndex = images.length + realIndex;
            if (realIndex >= images.length) realIndex = realIndex - images.length;

            return (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(index + BUFFER_ITEMS);
                }}
                className={`h-3 rounded-full transition-all duration-300 shadow-sm ${realIndex === index ? 'bg-[#4747d7] w-6' : 'bg-gray-400 w-3 hover:bg-gray-500'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            moveSlide('prev');
            setIsAutoPlaying(true); // Keep playing
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#4747d7] bg-opacity-80 text-white p-3 rounded-full hover:bg-opacity-100 transition-all z-20 shadow-lg"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            moveSlide('next');
            setIsAutoPlaying(true);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#4747d7] bg-opacity-80 text-white p-3 rounded-full hover:bg-opacity-100 transition-all z-20 shadow-lg"
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closePreview}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              onClick={closePreview}
              aria-label="Close preview"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ThreeDCarousel;