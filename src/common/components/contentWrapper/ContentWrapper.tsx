import React, { ReactNode } from 'react'

import { Paper } from '@mui/material'
import Container from '@mui/material/Container'
import { Theme } from '@mui/material/styles'
import { SxProps } from '@mui/system'

type PropsType = {
  sx?: SxProps<Theme>
  children: ReactNode
}

export const ContentWrapper: React.FC<PropsType> = ({ children, sx }) => (
  <Container
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      marginTop: '20px',
      ...sx,
    }}
  >
    <Paper
      elevation={4}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem 3rem',
      }}
    >
      {children}
    </Paper>
  </Container>
)