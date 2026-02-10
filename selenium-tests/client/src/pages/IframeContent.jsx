import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const IframeContent = () => {
  const [msg, setMsg] = useState('Texto inicial');

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', height: '100%' }}>
      <Typography variant="h6">Contenido del IFrame</Typography>
      <Button 
        variant="contained" 
        id="iframe-btn" 
        onClick={() => setMsg('Texto cambiado desde iframe')}
        sx={{ my: 2 }}
      >
        Cambiar texto
      </Button>
      <Typography id="iframe-output">{msg}</Typography>
    </Box>
  );
};

export default IframeContent;
