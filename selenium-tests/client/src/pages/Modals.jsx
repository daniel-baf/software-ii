import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  Typography, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions 
} from '@mui/material';

const Modals = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">Modals</Typography>
      
      <Card sx={{ p: 3 }}>
        <Button 
          variant="contained" 
          onClick={handleClickOpen}
          id="open-modal"
        >
          Abrir modal
        </Button>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        id="modal-backdrop" // Not exactly backdrop, but wrapper
      >
        <DialogTitle id="alert-dialog-title">
          Modal de prueba
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Elemento modal para validar waits y acciones.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} id="close-modal" autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Modals;
