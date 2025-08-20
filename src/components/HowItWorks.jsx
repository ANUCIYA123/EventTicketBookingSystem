import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import './howItWorks.css';

const steps = [
  {
    title: 'Register',
    description: 'Sign up as a donor or receiver. It only takes a minute!',
    emoji: '📝',
  },
  {
    title: 'Donate or Receive',
    description: 'Save lives by donating or receiving the needed blood quickly.',
    emoji: '❤️',
  },
];

const HowItWorks = () => {
  return (
    <Box className="how-section">
      <Typography variant="h4" className="how-title">
        How It Works
      </Typography>
      <Grid container spacing={4} justifyContent="center" className="how-grid">
        {steps.map((step, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="how-card"
            >
              <Typography className="how-emoji" variant="h2">{step.emoji}</Typography>
              <Typography variant="h6" className="how-step">{step.title}</Typography>
              <Typography className="how-desc">{step.description}</Typography>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HowItWorks;
