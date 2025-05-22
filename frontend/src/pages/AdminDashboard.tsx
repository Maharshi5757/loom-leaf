import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AdminDashboard: React.FC = () => {
  const [value, setValue] = useState(0);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Sample data - replace with actual API calls
  const orders = [
    { id: '1', customer: 'John Doe', total: 99.99, status: 'Completed', date: '2024-03-20' },
    { id: '2', customer: 'Jane Smith', total: 149.99, status: 'Processing', date: '2024-03-19' },
  ];

  const inventory = [
    { id: '1', name: 'Cotton T-Shirt', stock: 50, price: 29.99, category: 'mens' },
    { id: '2', name: 'Denim Jeans', stock: 30, price: 49.99, category: 'mens' },
  ];

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Redirect if not admin
  if (!isAuthenticated || user?.role !== 'admin') {
    navigate('/');
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Orders" />
          <Tab label="Inventory" />
          <Tab label="Analytics" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>${order.total}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Button variant="contained" color="primary" sx={{ mb: 2 }}>
                Add New Product
              </Button>
            </Box>
            <Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Stock</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {inventory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.stock}</TableCell>
                        <TableCell>${item.price}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                            Edit
                          </Button>
                          <Button variant="outlined" color="error" size="small">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Typography variant="h6" gutterBottom>
            Sales Analytics
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ flex: '1 1 calc(33.33% - 16px)', minWidth: '250px' }}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Total Sales</Typography>
                <Typography variant="h4">$24,500</Typography>
              </Paper>
            </Box>
            <Box sx={{ flex: '1 1 calc(33.33% - 16px)', minWidth: '250px' }}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Total Orders</Typography>
                <Typography variant="h4">150</Typography>
              </Paper>
            </Box>
            <Box sx={{ flex: '1 1 calc(33.33% - 16px)', minWidth: '250px' }}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Average Order Value</Typography>
                <Typography variant="h4">$163.33</Typography>
              </Paper>
            </Box>
          </Box>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default AdminDashboard; 