import React from 'react';
import Slider from 'react-slick';
import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import './testimonials.css';

const testimonials = [
  {
    name: "Rahul S.",
    role: "Donor",
    message: "Donating blood here was easy and fulfilling. I feel proud knowing I helped someone."
  },
  {
    name: "Anjali P.",
    role: "Receiver",
    message: "I found a donor in minutes during an emergency. This platform saved my brother’s life!"
  },
  {
    name: "Dr. Mehta",
    role: "Hospital Partner",
    message: "An excellent initiative. We’re now better equipped during shortages thanks to this network."
  }
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Box className="testimonial-section">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Typography variant="h4" className="testimonial-heading">
          ❤️ What People Are Saying
        </Typography>
        <Slider {...settings}>
          {testimonials.map((t, index) => (
            <Box key={index} className="testimonial-card">
              <Typography variant="body1" className="testimonial-message">
                “{t.message}”
              </Typography>
              <Typography variant="h6" className="testimonial-name">
                — {t.name}, {t.role}
              </Typography>
            </Box>
          ))}
        </Slider>
      </motion.div>
    </Box>
  );
};

export default Testimonials;
