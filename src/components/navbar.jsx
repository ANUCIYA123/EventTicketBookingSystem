import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" className="navbar-glass">
      <Toolbar>
        <BloodtypeIcon sx={{ color: 'red', mr: 1 }} />
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 'bold', color: 'red' }}
        >
          Blood Connect
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {[ ].map(
            (item) => (
              <Button
                key={item}
                color="inherit"
                className="nav-link"
                component={Link}
                to={`/${item.replace(/\s+/g, '').toLowerCase()}`}
              >
                {item}
              </Button>
            )
          )}

          {/* Admin Login Button */}
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate('/admin')}
            className="nav-link"
          >
            Admin Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
