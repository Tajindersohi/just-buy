import { Box, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const ImageSlider = ({ categories }) => {
  const sliderRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollTimeout = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    if (!isAutoScrolling) return;

    const scrollContainer = sliderRef.current;
    const scrollStep = 200;
    let scrollAmount = 0;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    const autoScroll = () => {
      if (scrollAmount >= maxScroll) {
        scrollAmount = 0;
        scrollContainer.scrollLeft = 0;
      } else {
        scrollAmount += scrollStep;
        scrollContainer.scrollLeft += scrollStep;
      }
      checkScrollPosition();
    };

    const interval = setInterval(autoScroll, 30);
    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const scroll = (direction) => {
    const scrollContainer = sliderRef.current;
    const scrollAmount = 200;
    scrollContainer.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
    setTimeout(checkScrollPosition, 300);
  };

  const handleUserScroll = () => {
    setIsAutoScrolling(false);
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setIsAutoScrolling(true);
    }, 3000);
    checkScrollPosition();
  };

  const checkScrollPosition = () => {
    const scrollContainer = sliderRef.current;
    setIsAtStart(scrollContainer.scrollLeft <= 0);
    setIsAtEnd(scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth);
  };

  useEffect(() => {
    checkScrollPosition();
  }, []);

  return (
    <Box display="flex" alignItems="center" position="relative">
      {/* Left Button - Hidden at Start */}
      {!isAtStart && (
        <Button
          onClick={() => scroll("left")}
          sx={{
            position: "absolute",
            left: 0,
            zIndex: 10,
            background: "rgba(0,0,0,0.5)",
            color: "white",
            minWidth: "40px",
            height: "40px",
            borderRadius: "50%",
            "&:hover": { background: "black" },
          }}
        >
          <ChevronLeft />
        </Button>
      )}

      <Box
        ref={sliderRef}
        display="flex"
        flexDirection="row"
        sx={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          scrollBehavior: "smooth",
          gap: 3,
          width: "100%",
          "&::-webkit-scrollbar": { display: "none" },
        }}
        onMouseEnter={() => setIsAutoScrolling(false)}
        onMouseLeave={() => setIsAutoScrolling(true)}
        onScroll={handleUserScroll}
      >
        {categories.map((category, idx) => (
          <Box
            key={idx}
            borderRadius="50%"
            sx={{
              backgroundImage: `url(${category.imageUrl})`,
              backgroundSize: "cover",
              width: "145px",
              height: "145px",
              flexShrink: 0,
            }}
          />
        ))}
      </Box>

      {/* Right Button - Hidden at End */}
      {!isAtEnd && (
        <Button
          onClick={() => scroll("right")}
          sx={{
            position: "absolute",
            right: 0,
            zIndex: 10,
            background: "rgba(0,0,0,0.5)",
            color: "white",
            minWidth: "40px",
            height: "40px",
            borderRadius: "50%",
            "&:hover": { background: "black" },
          }}
        >
          <ChevronRight />
        </Button>
      )}
    </Box>
  );
};

export default ImageSlider;
