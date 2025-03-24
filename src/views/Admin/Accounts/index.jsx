import React, { useState, useEffect } from 'react';
import StatCard from '../dashboardComponents/StatCard';
import FineTable from './components/TransactionTable';
import { 
  Box, 
  Paper, 
  Typography,
  CircularProgress,
  Divider,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import GroupsIcon from '@mui/icons-material/Groups';
import PaidIcon from '@mui/icons-material/Paid';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import axios from 'axios';

const index = () => {
  // State for statistics
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalFine: 0,
    paidMembers: 0,
    pendingMembers: 0
  });
  
  // State for chart data
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Colors for charts
  const COLORS = ['#ca0019', '#f44336', '#ff9800', '#2196f3'];
  
  // Fetch statistics
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch members with fines
        const finesRes = await axios.get('http://localhost:5000/api/admin/member/fines/all');
        const fineMembers = finesRes.data.data || [];
        
        // Calculate total fine amount
        const totalFineAmount = fineMembers.reduce((total, member) => {
          return total + parseInt(member.fineStatus || 0);
        }, 0);
        
        // Count members with pending fines
        const membersWithFines = fineMembers.filter(member => 
          parseInt(member.fineStatus || 0) > 0
        ).length;
        
        // Get total members count
        const membersRes = await axios.get('http://localhost:5000/api/admin/member?page=1&limit=1');
        const totalMembers = membersRes.data.pagination?.total || 0;
        
        // Fetch batch-wise distribution for chart
        const batches = ["The Uniques 1.0", "The Uniques 2.0", "The Uniques 3.0"];
        const batchData = [];
        
        for (const batch of batches) {
          try {
            const batchRes = await axios.get(`http://localhost:5000/api/admin/fine/search`, {
              params: { batch, limit: 100 }
            });
            
            const batchMembers = batchRes.data.data || [];
            const batchTotal = batchMembers.reduce((sum, m) => sum + parseInt(m.fineStatus || 0), 0);
            
            batchData.push({
              name: batch,
              fines: batchTotal,
              members: batchMembers.length
            });
          } catch (err) {
            console.error(`Error fetching batch ${batch}:`, err);
          }
        }
        
        // Update states
        setStats({
          totalMembers,
          totalFine: totalFineAmount,
          pendingMembers: membersWithFines,
          paidMembers: totalMembers - membersWithFines
        });
        
        setChartData(batchData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching statistics:", err);
        setError("Failed to load statistics. Please try again later.");
        setLoading(false);
        
        // Fallback data
        setChartData([
          { name: 'The Uniques 1.0', fines: 2500, members: 20 },
          { name: 'The Uniques 2.0', fines: 1800, members: 18 },
          { name: 'The Uniques 3.0', fines: 1200, members: 12 }
        ]);
      }
    };
    
    fetchData();
  }, []);
  
  // Prepare data for pie chart
  const pieData = [
    { name: 'Paid Members', value: stats.paidMembers },
    { name: 'Members with Fine', value: stats.pendingMembers }
  ];

  return (
    <div className="p-4">
      <Typography variant="h4" fontWeight="bold" className="mb-6 text-gray-800">
        Financial Management
      </Typography>
      
      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}
      
      {/* Stats Cards Row */}
      <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 my-4'>
        <StatCard 
          icon={<GroupsIcon fontSize="large" />}
          title='Total Members' 
          value={loading ? <CircularProgress size={24} /> : stats.totalMembers}
          link="/admin/members-overview"
        />
        <StatCard 
          icon={<CurrencyRupeeIcon fontSize="large" />}
          title='Total Fine' 
          value={loading ? <CircularProgress size={24} /> : `₹${stats.totalFine}`}
        />
        <StatCard 
          icon={<PaidIcon fontSize="large" />}
          title='Members Paid' 
          value={loading ? <CircularProgress size={24} /> : stats.paidMembers}
        />
        <StatCard 
          icon={<WarningAmberIcon fontSize="large" />}
          title='Members with Fine' 
          value={loading ? <CircularProgress size={24} /> : stats.pendingMembers}
        />
      </div>
      
      {/* Charts Section */}
      <Grid container spacing={3} className="mb-6">
        <Grid item xs={12} md={8}>
          <Paper elevation={2} className="p-4">
            <Typography variant="h6" fontWeight="bold" className="mb-4">
              Fine Distribution by Batch
            </Typography>
            {loading ? (
              <Box className="flex justify-center items-center" height={300}>
                <CircularProgress />
              </Box>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`₹${value}`, 'Total Fine']}
                    labelStyle={{ color: '#333' }}
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
                  />
                  <Bar dataKey="fines" fill="#ca0019" name="Total Fine" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={2} className="p-4 h-full">
            <Typography variant="h6" fontWeight="bold" className="mb-4">
              Fine Payment Status
            </Typography>
            {loading ? (
              <Box className="flex justify-center items-center" height={300}>
                <CircularProgress />
              </Box>
            ) : (
              <Box className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Members']} />
                  </PieChart>
                </ResponsiveContainer>
                
                <Box className="mt-4">
                  <div className="flex justify-center gap-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#ca0019] mr-2"></div>
                      <Typography variant="body2">Members with Fine</Typography>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#2196f3] mr-2"></div>
                      <Typography variant="body2">Paid Members</Typography>
                    </div>
                  </div>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      {/* Fine Management Table */}
      <FineTable />
    </div>
  );
};

export default index;