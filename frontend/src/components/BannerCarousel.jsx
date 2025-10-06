import React, { useEffect, useState } from "react";
import laptop from "../assets/laptop.png";
import mobile from "../assets/mobile.png";
import tv from "../assets/tv.png";
import bike from "../assets/bike.png";                       // new image
import HomeAppliances from "../assets/HomeAppliances.png";  // new image

const images = [
  { src: laptop, alt: "Laptop Offers" },
  { src: mobile, alt: "Mobile Deals" },
  { src: tv, alt: "TV Sale" },
  { src: bike, alt: "Bike Deals" },                         // new
  { src: HomeAppliances, alt: "Home Appliance Offers" }    // new
];


function BannerCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex items-center justify-center my-8">
      <img
  src={images[index].src}
  alt={images[index].alt}
  className="w-full mx-auto transition-all duration-500"
  style={{
    maxWidth: "1200px",
    maxHeight: "500px", // or higher if you want 
    width: "100%",
    height: "auto",
    objectFit: "contain", // displays the full image, never cropped
    background: "#fff"   // or remove if not needed
  }}
/>
    </div>
  );
}

export default BannerCarousel;
