import React, { useEffect } from 'react'

import './App.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { useAppDispatch } from '../../common/hooks/hooks'
import { initTC } from '../bll/appThunks'
import { store } from '../bll/store'

import { RoutesComponent } from './RoutesComponent'

import { Header } from 'common/components/header/Header'
import { theme } from 'common/styles/theme'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initTC())
  }, [])

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          <div className="App">
            <Header />
            <RoutesComponent />
          </div>
        </Provider>
      </ThemeProvider>
    </HashRouter>
  )
}

export default App
