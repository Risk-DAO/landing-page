import './themeSwitcher'
import './App.css'

import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import ComingSoon from "./pages/ComingSoon"
import Dashboards from "./pages/Dashboards"
import Footer from './components/Footer'
import Hero from './components/Hero'
import Partners from "./components/Partners"
import { observer } from "mobx-react"

function App() {
  return (
    <div className="App">
      <Router>
        <Hero/>
        <div className="container page">
          <Routes>
            <Route exact path="/"  element={<ComingSoon/>}/>
            <Route exact path="/dashboards" element={<Dashboards/>}/>
          </Routes>
          <Partners/>
        </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default observer(App);
