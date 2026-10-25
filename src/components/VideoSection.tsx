import React, { useRef, useState, useEffect } from 'react';
import { Play } from 'lucide-react';

interface VideoSectionProps {
  videoSrc: string;
  posterSrc?: string;
  title?: string;
  className?: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoSrc,
  posterSrc,
  title,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700 ${className}`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900 aspect-video">
          {!isPlaying && posterSrc && (
            <img
              src={posterSrc}
              alt="Video thumbnail"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <button
                onClick={handlePlayClick}
                className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Play video"
              >
                <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
              </button>
            </div>
          )}
          <video
            ref={videoRef}
            src={videoSrc}
            controls={isPlaying}
            className="w-full h-full object-cover"
            aria-label={title || 'School promotional video'}
            onPlay={() => setIsPlaying(true)}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
