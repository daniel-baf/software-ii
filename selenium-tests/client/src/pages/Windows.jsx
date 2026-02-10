import React, { useState } from 'react';
import { Box, Card, Typography, Button } from '@mui/material';

const Windows = () => {
  const [msg, setMsg] = useState('Esperando acción');

  const handleOpenWindow = () => {
    window.open('/new-window', '_blank', 'width=600,height=400');
    setMsg('Nueva ventana abierta');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">Windows & Frames</Typography>
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">New Window</Typography>
        <Button variant="contained" onClick={handleOpenWindow} id="open-window" sx={{ mt: 1 }}>
          Abrir nueva ventana
        </Button>
        <Typography id="window-output" sx={{ mt: 1 }}>{msg}</Typography>
      </Card>

      <Card sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>IFrame</Typography>
        <iframe 
            src="/iframe-content" 
            id="demo-iframe"
            title="Test Iframe"
            style={{ width: '100%', height: '200px', border: '1px solid #ccc' }}
        />
      </Card>
    </Box>
  );
};

export default Windows;
