import './themeSwitcher'
import './App.css'

import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { ThemeProvider, createTheme } from '@mui/material'

import Buttons from "./pages/Buttons"
import Dashboards from "./pages/Dashboards"
import Footer from './components/Footer'
import Hero from './components/Hero'
import Medium from './pages/Medium'
import Partners from "./components/Partners"
import mainStore from './stores/main.store'
import { observer } from "mobx-react"
import { useMemo } from 'react'

function App() {
  const blackMode = mainStore.blackMode;
  const mode = mainStore.blackMode ? 'dark' : 'light';
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
  return (
    <div className="App">
      <Router>
      <ThemeProvider theme={theme}>
        <Hero/>
        <div className="container page">
          <Routes>
            <Route exact path="/"  element={<Buttons/>}/>
            <Route exact path="/dashboards" element={<Dashboards/>}/>
          </Routes>
          <hr/>
          <Partners blackMode={blackMode}/>
          <hr/>
          <Medium blackMode={blackMode}/>
        </div>
        <Footer/>
        </ThemeProvider>
      </Router >
    </div >
  );
}

export default observer(App);
