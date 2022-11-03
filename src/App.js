import {observer} from "mobx-react"
import ComingSoon from "./pages/ComingSoon"
import Dashboards from "./pages/Dashboards"
import Hero from './components/Hero'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './themeSwitcher'
import './App.css';

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
        </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default observer(App);
