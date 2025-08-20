import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import './statistics.css';

const statsData = [
  { label: 'Donors Registered', icon: '🧍‍♂️', end: 10000 },
  { label: 'Blood Units Donated', icon: '💉', end: 50000 },
  { label: 'Hospitals Supported', icon: '🏥', end: 500 },
];

const Counter = ({ end }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const incrementTime = 20;
    const step = end / (duration / incrementTime);

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, incrementTime);

    return () => clearInterval(timer);
  }, [end]);

  return <Typography variant="h4" className="counter">{count.toLocaleString()}+</Typography>;
};

const StatisticsSection = () => {
  return (
    <Box className="stats-section">
      <Grid container spacing={4} justifyContent="center">
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="stat-card"
            >
              <Typography variant="h3" className="stat-icon">{stat.icon}</Typography>
              <Counter end={stat.end} />
              <Typography className="stat-label">{stat.label}</Typography>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatisticsSection;
