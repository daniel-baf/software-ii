import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Stack, 
  Alert
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('error')) {
      setError(true);
    }
    if (params.get('logout')) {
        localStorage.removeItem('isAuthenticated');
        setLogoutMessage(true);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('isAuthenticated', 'true'); // For client-side checks
        navigate(data.redirect || '/dashboard');
      } else {
        setError(true);
      }
    } catch (err) {
      // If server returns redirect (HTML) instead of JSON (shouldn't happen with our server change)
      // Fallback to form submit
      document.getElementById('login-form').submit();
    }
  };

  return (
    <Box 
      sx={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: 'background.default'
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', p: 2 }}>
        <CardContent>
          <Box component="header" sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom color="primary">
              Login
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Demo Project
            </Typography>
          </Box>

          <Stack spacing={3} component="form" id="login-form" onSubmit={handleSubmit}>
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              Credenciales: <strong>demo / demo</strong>
            </Alert>
            
            {error && (
              <Alert severity="error" id="login-message" sx={{ borderRadius: 2 }}>
                Credenciales inválidas
              </Alert>
            )}
            
            {logoutMessage && (
              <Alert severity="info" id="login-message" sx={{ borderRadius: 2 }}>
                Sesión cerrada correctamente
              </Alert>
            )}

            <TextField
              label="Usuario"
              variant="outlined"
              fullWidth
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button 
              type="submit" 
              variant="contained" 
              size="large"
              id="login-submit"
            >
              Entrar
            </Button>
            
            <Button component="a" href="/" color="inherit">
              Volver a Inicio
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
