import React from 'react';
import CelebrationComponent from '@/utils/Header';
import { 
  Typography, 
  Box,
  Container,
  Paper,
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const HomeContent = () => {
  const location = useLocation();
  
  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={contentVariants}
    >
      <CelebrationComponent title="Success Stories → Inspiring Journeys ✦" />
      
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>The Uniques Difference</Typography>
          <Typography paragraph>
            At The Uniques Community, we pride ourselves on nurturing talent and providing the resources, mentorship, 
            and opportunities that help our members achieve extraordinary success. Our comprehensive approach to 
            professional development focuses on technical skills, leadership abilities, and personal growth.
          </Typography>
          <Typography paragraph>
            The success stories showcased here are testament to the power of community, dedication, and the unique 
            approach we take to preparing our members for the challenges of the tech industry.
          </Typography>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              sx={{ px: 4, py: 1 }}
            >
              Join The Uniques Community
            </Button>
          </Box>
        </Paper>
      </Container>
    </motion.div>
  );
};

export default HomeContent;
