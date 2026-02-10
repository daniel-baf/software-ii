import React, { useState } from 'react';
import { Box, Card, Typography, Button, Alert } from '@mui/material';

const Upload = () => {
  const [message, setMessage] = useState('Sin carga');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      const res = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      const text = await res.text();
      setMessage(text);
    } catch (err) {
      setMessage('Error uploading');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">Upload</Typography>
      <Card sx={{ p: 3 }}>
        <form id="upload-form" onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <input 
              type="file" 
              name="file" 
              id="file-input" 
              style={{ display: 'block', marginBottom: '10px' }} 
            />
          </Box>
          <Button variant="contained" type="submit">Subir</Button>
        </form>
        <Alert severity="info" sx={{ mt: 2 }} id="upload-output">
          {message}
        </Alert>
      </Card>
    </Box>
  );
};

export default Upload;
