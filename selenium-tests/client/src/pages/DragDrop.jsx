import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Paper } from '@mui/material';

const DragDrop = () => {
  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7243/ingest/26ac42de-188a-4eff-8743-3a9a15e6651a', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: 'client/src/pages/DragDrop.jsx',
        message: 'DragDrop component mounted',
        timestamp: Date.now(),
        sessionId: 'debug-session',
        hypothesisId: 'component-mount'
      })
    }).catch(()=>{});
  }, []);
  // #endregion

  const [status, setStatus] = useState('Pendiente');

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', 'drag-item');
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (data === 'drag-item') {
      setStatus('Elemento soltado');
      // Append element if needed visually, but status update might be enough for test
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">Drag & Drop</Typography>
      <Card sx={{ p: 3, minHeight: 400 }}>
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Paper 
            id="drag-item"
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            sx={{ 
              width: 100, 
              height: 100, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: 'move',
              bgcolor: 'primary.light',
              color: 'white'
            }}
          >
            Arrástrame
          </Paper>

          <Paper 
            id="drop-zone"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            sx={{ 
              width: 200, 
              height: 200, 
              border: '2px dashed #ccc',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              bgcolor: 'background.default'
            }}
          >
            Suelta aquí
          </Paper>
        </Box>
        <Typography id="drop-status" sx={{ mt: 2 }} color="text.secondary">
          {status}
        </Typography>
      </Card>
    </Box>
  );
};

export default DragDrop;
