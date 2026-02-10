import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  Typography, 
  TextField, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper
} from '@mui/material';

const initialData = [
  { name: 'Mouse', price: 12, stock: 12 },
  { name: 'Teclado', price: 35, stock: 5 },
  { name: 'Monitor', price: 199, stock: 2 },
  { name: 'Audífonos', price: 49, stock: 8 },
];

// Orden alfabético esperado: Audífonos, Monitor, Mouse, Teclado

const Tables = () => {
  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = () => {
    // Crear una copia nueva del array para forzar la actualización
    const dataToSort = [...data];
    // Ordenar sin mutar el array original
    const sorted = dataToSort.sort((a, b) => {
      const comparison = sortAsc 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
      return comparison;
    });
    // Usar una nueva referencia para forzar el re-render
    setData([...sorted]);
    setSortAsc(!sortAsc);
  };

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">Tables</Typography>
      
      <Card sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField 
            id="filter-input"
            label="Filtro por texto" 
            variant="outlined" 
            size="small"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <Button 
            id="sort-name"
            variant="contained" 
            onClick={handleSort}
          >
            Ordenar por nombre
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
          <Table id="products-table">
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Stock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>${row.price}</TableCell>
                  <TableCell>{row.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default Tables;
