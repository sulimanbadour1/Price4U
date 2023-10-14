"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const heroImages = [
  {
    imageUrl: "/assets/images/hero-1.svg",
    alt: "Smart Watch",
  },
  {
    imageUrl: "/assets/images/hero-2.svg",
    alt: "Bag",
  },
  {
    imageUrl: "/assets/images/hero-3.svg",
    alt: "Lamp",
  },
  {
    imageUrl: "/assets/images/hero-4.svg",
    alt: "air fryer",
  },
  {
    imageUrl: "/assets/images/hero-5.svg",
    alt: "chair",
  },
];

const HeroCarousel = () => {
  return (
    <div className="flex justify-evenly items-center">
      {/* <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image) => (
          <Image
            src={image.imageUrl}
            alt={image.alt}
            width={470}
            height={470}
            className="object-contain"
            key={image.alt}
          />
        ))}
      </Carousel> */}
      <Player
        autoplay
        loop={true}
        src="/assets/anim/anim5.json"
        style={{
          height: "580px",
          width: "600px",
          zIndex: 1,
        }}
        className="hidden xl:block scale-75 lg:scale-100"
      >
        <Controls
          visible={false}
          buttons={["play", "repeat", "frame", "debug"]}
        />
      </Player>
    </div>
  );
};

export default HeroCarousel;
