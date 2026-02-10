import React from 'react';
import { Box, Typography } from '@mui/material';

const NewWindow = () => {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" component="h1" id="new-window-title">
        Nueva ventana
      </Typography>
      <Typography variant="body1">
        Esta es una nueva ventana abierta desde Selenium.
      </Typography>
    </Box>
  );
};

export default NewWindow;
