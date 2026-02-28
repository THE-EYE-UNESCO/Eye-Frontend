"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselSlide {
  id: string;
  image: string;
  title: string;
  description: string;
  alertType: string;
  alertColor: string;
}

interface ImageCarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  interval?: number;
  onSlideChange?: (slide: CarouselSlide) => void;
}

export default function ImageCarousel({ slides, autoPlay = true, interval = 5000, onSlideChange }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
    if (onSlideChange) {
      onSlideChange(slides[newIndex]);
    }
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
    if (onSlideChange) {
      onSlideChange(slides[newIndex]);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (onSlideChange) {
      onSlideChange(slides[index]);
    }
  };

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, slides.length]);

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-lg">
      {/* Main Image */}
      <div className="relative h-full w-full">
        <Image
          src={currentSlide.image}
          alt={currentSlide.title}
          fill
          className="object-cover transition-opacity duration-500"
        />
        
        {/* Alert Badge */}
        <div className={`absolute left-5 top-5 rounded-full ${currentSlide.alertColor} px-3 py-1 text-sm font-semibold text-white shadow-lg`}>
          {currentSlide.alertType}
        </div>

        {/* Navigation Buttons */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-bg-primary/90 text-text-primary shadow-lg backdrop-blur-sm transition hover:bg-bg-primary/100"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-bg-primary/90 text-text-primary shadow-lg backdrop-blur-sm transition hover:bg-bg-primary/100"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Progress Indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? "w-6 bg-white" 
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
