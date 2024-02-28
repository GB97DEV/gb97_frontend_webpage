import { useState } from "react";
import { Carousel, CarouselIndicators, CarouselControl, CarouselItem, CarouselCaption } from "reactstrap";

import { InicioSlide } from "../slides/InicioSlide"
import AplicacionesSlide from "../slides/AplicacionesSlide";
import { TestimonioSlide } from "../slides/TestimoniosSlide";

const ContentCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const slides = [
    <InicioSlide key={0} active={activeIndex === 0}/>,
    <AplicacionesSlide key={1} active={activeIndex === 1} />,
    <TestimonioSlide key={2} active={activeIndex === 2} />
  ];

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  return (
    <div>
      <Carousel className="carousel-container" activeIndex={activeIndex} next={next} previous={previous} interval={10000}>
        <CarouselIndicators
          items={slides}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides.map((slide, i) => (
          <CarouselItem
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={i}
          >
            {slide}
          </CarouselItem>
        ))}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
          className="custom-carousel-control"
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
          className="custom-carousel-control"
        />
      </Carousel>
    </div>
  );
};

export default ContentCarousel