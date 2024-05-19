import React, { useEffect } from 'react';
import axios from 'axios';
import '../../style/main.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = ({ images }) => {

  const fetchImageUrls = () => {
    try {
      const response = axios.get('https://capstone-ecom-back-0acc37750539.herokuapp.com/products/images');
      images = response.data;
    } catch (error) {
      console.error('Error fetching image URLs:', error);
  };

  useEffect(() => {
    fetchImageUrls();
  }, []);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="the-carousel-container">
      <Slider {...settings}>
        {images.map((product) => (
          <div className='image-holder' key={product.name}>
            <img src={product.image} />
            <h1>{product.name}</h1>
            {/* <button onClick={() => addToCart(product)}>Add to Cart</button> */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;