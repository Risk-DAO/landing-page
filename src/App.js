import {observer} from "mobx-react"
import ComingSoon from "./components/ComingSoon"
import Hero from './components/Hero'
import Footer from './components/Footer'
import './themeSwitcher'
import './App.css';

function App() {
  return (
    <div className="App">
      <Hero/>
      <div className="container page">
        <ComingSoon/>
      </div>
      <Footer/>
    </div>
  );
}

export default observer(App);
