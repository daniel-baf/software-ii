import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  Typography, 
  Button, 
  Stack,
  Alert as MuiAlert
} from '@mui/material';

const Alerts = () => {
  const [output, setOutput] = useState('Resultado pendiente');

  const handleAlert = () => {
    alert('Esto es un alert');
    setOutput('Alert OK');
  };

  const handleConfirm = () => {
    const result = window.confirm('¿Estás seguro?');
    setOutput(result ? 'Confirmado' : 'Cancelado');
  };

  const handlePrompt = () => {
    const result = window.prompt('Escribe algo:');
    setOutput(result !== null ? result : 'Prompt cancelado');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">Alerts</Typography>
      
      <Card sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Button variant="contained" onClick={handleAlert} id="alert-btn">
            Alert
          </Button>
          <Button variant="contained" color="warning" onClick={handleConfirm} id="confirm-btn">
            Confirm
          </Button>
          <Button variant="contained" color="secondary" onClick={handlePrompt} id="prompt-btn">
            Prompt
          </Button>
        </Stack>

        <MuiAlert severity="info" id="alert-output">
          {output}
        </MuiAlert>
      </Card>
    </Box>
  );
};

export default Alerts;
