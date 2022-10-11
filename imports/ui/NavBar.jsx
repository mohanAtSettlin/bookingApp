import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'

import LocalActivityIcon from '@mui/icons-material/LocalActivity';

export const NavBar = () => {
  return (
   <AppBar position='static' color='warning'>
    <Container >
        <Toolbar disableGutters> 

    <LocalActivityIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
    <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor:"pointer"
            }}
          >
            Booking
          </Typography>
        </Toolbar>
    </Container>
   </AppBar>
  )
}
