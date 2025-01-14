import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Carousel.css";

const slides = [
  {
    image:
      "https://png.pngtree.com/png-clipart/20220125/original/pngtree-handheld-mini-fan-png-image_7209848.png",
    description: "starting at $10.00",
    title: "Compact home electronics",
  },
  {
    image:
      "https://static.vecteezy.com/system/resources/previews/047/826/367/non_2x/portable-blender-against-transparent-background-free-png.png",
    description: "starting at $30.00",
    title: "Browse & discover millions of products",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000); // Slow down carousel slide interval to 6 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        setIsTransitioning(false);
      }, 500); // Matches the CSS transition duration
    }
  };

  const handlePrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
        setIsTransitioning(false);
      }, 500); // Matches the CSS transition duration
    }
  };

  return (
    <div className="carousel-cont">
      <div className="carousel">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              className={`carousel-slide ${
                index === currentIndex ? "active" : ""
              }`}
              key={index}
            >
              <img src={slide.image} alt={`Slide ${index + 1}`} />
              <div className="carousel-text">
                {index === currentIndex && (
                  <>
                    <motion.p
                      className="text-description"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 1.2, delay: 0.3 }} // Slightly delayed and slower
                    >
                      {slide.description}
                    </motion.p>
                    <motion.h2
                      className="text-title"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 1.2 }} // Slower text animation duration
                    >
                      {slide.title}
                    </motion.h2>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
