import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const CustomHeader = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#075e54' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BoldSoftmation
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CustomHeader;
