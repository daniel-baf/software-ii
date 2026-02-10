import React, { useState } from 'react';
import { Box, Card, Typography, Button, Chip } from '@mui/material';

const Dynamic = () => {
  const [status, setStatus] = useState('Idle');
  const [output, setOutput] = useState('Sin datos');

  const handleLoad = async () => {
    setStatus('Cargando');
    try {
      const res = await fetch('/api/delayed?delay=2000');
      const data = await res.json();
      setOutput(JSON.stringify(data));
      setStatus('Loaded');
    } catch (e) {
      setStatus('Error');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">Dynamic Content</Typography>
      <Card sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <Button variant="contained" onClick={handleLoad} id="load-data">
            Cargar contenido
          </Button>
          <Chip label={status} id="dynamic-badge" color={status === 'Loaded' ? 'success' : 'default'} />
        </Box>
        <Typography id="dynamic-output">
          {output}
        </Typography>
      </Card>
    </Box>
  );
};

export default Dynamic;
