import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="text.primary">
        Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
            { title: 'Total Tests', value: '1,234', color: '#6e7dff' },
            { title: 'Success Rate', value: '98.5%', color: '#4fd1c5' },
            { title: 'Active Users', value: '45', color: '#f6ad55' },
            { title: 'Server Load', value: '12%', color: '#fc8181' }
        ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 140 }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" fontWeight="bold" sx={{ color: stat.color }}>
                            {stat.value}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {stat.title}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        ))}
      </Grid>

      <Card sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom id="welcome-text">
          Bienvenido a la zona privada.
        </Typography>
        <Typography variant="body1" color="text.secondary">
            Esta pantalla valida sesión con cookie. Utiliza el menú lateral para navegar entre las diferentes pruebas de Selenium.
        </Typography>
      </Card>
    </Box>
  );
};

export default Dashboard;
