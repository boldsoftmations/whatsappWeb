import React from 'react';
import { CssBaseline, Box, Toolbar } from '@mui/material';
import AccordionItem from '../components/AccordionItem';
import { users } from '../config/UsersList';
import CustomHeader from '../components/CustomHeader';

const Home = () => {
  return (
    <>
      <CssBaseline />
      <CustomHeader />
      <Toolbar /> 
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f0f2f5', width: '100%' }}>
        {users.map((user) => (
          <AccordionItem key={user.id} user={user} />
        ))}
      </Box>
    </>
  );
};

export default Home;
