import React from "react";
import HeroSlider from "../components/HeroSlider";
import FeaturedBooks from "../components/FeaturedBooks";
import PopularBooks from "../components/PopularBooks";
import Newsletter from "../components/Newsletter";

const Home: React.FC = () => {
  return (
    <>
      <HeroSlider />
      <FeaturedBooks />
      <PopularBooks />
      <Newsletter />
    </>
  );
};

export default Home;
