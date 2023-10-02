import React, {useState} from "react";
import { Carousel, CarouselIndicators, CarouselControl, CarouselItem, CarouselCaption } from "reactstrap";
import Image from "next/image";

import { CarouselImages } from "../../interface/CarouselImages";
import image from "../../assets/images/landingpage/home.png"

const ImagesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === CarouselImages.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? CarouselImages.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  const slides = CarouselImages.map((item, i) => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={i}
    >
      <Image 
        src={item.name}
        alt={item.alt} 
        width={700} 
        height={600} 
        className="carousel-image"
        loading="eager"
      />
    </CarouselItem>
  ));
  return (
    <>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={CarouselImages}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </>
  )
}

export default ImagesCarousel;