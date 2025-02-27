import React, { useState, useEffect } from "react";
import "./style.scss";

function ImageSlider({ children, visibleSlides = 5 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDone, setSlideDone] = useState(true);
  const [timeID, setTimeID] = useState(null);
  const totalSlides = children.length;

  // useEffect(() => {
  //   if (slideDone) {
  //     setSlideDone(false);
  //     setTimeID(
  //       setTimeout(() => {
  //         slideNext();
  //         setSlideDone(true);
  //       }, 5000)
  //     );
  //   }
  // }, [slideDone]);

  const slideNext = () => {
    setActiveIndex((val) => {
      if (val >= totalSlides - visibleSlides) {
        return 0;
      } else {
        return val + visibleSlides;
      }
    });
  };

  const slidePrev = () => {
    setActiveIndex((val) => {
      if (val <= 0) {
        return totalSlides - visibleSlides;
      } else {
        return val - visibleSlides;
      }
    });
  };

  const AutoPlayStop = () => {
    if (timeID > 0) {
      clearTimeout(timeID);
      setSlideDone(false);
    }
  };

  const AutoPlayStart = () => {
    if (!slideDone) {
      setSlideDone(true);
    }
  };

  return (
    <div
      className="container__slider"
      // onMouseEnter={AutoPlayStop}
      // onMouseLeave={AutoPlayStart}
    >
      <div className="slider__track" style={{ transform: `translateX(-${(100 / visibleSlides) * activeIndex}%)` }}>
        {children.map((item, index) => (
          <div className="slider__item" key={index} style={{ width: `${100 / visibleSlides}%` }}>
            {item}
          </div>
        ))}
      </div>

      <div className="container__slider__links">
        {Array.from({ length: Math.ceil(totalSlides / visibleSlides) }).map((_, index) => (
          <button
            key={index}
            className={
              activeIndex === index * visibleSlides
                ? "container__slider__links-small container__slider__links-small-active"
                : "container__slider__links-small"
            }
            onClick={() => setActiveIndex(index * visibleSlides)}
          ></button>
        ))}
      </div>

      <button className="slider__btn-next" onClick={slideNext}>{">"}</button>
      <button className="slider__btn-prev" onClick={slidePrev}>{"<"}</button>
    </div>
  );
}

export default ImageSlider;
