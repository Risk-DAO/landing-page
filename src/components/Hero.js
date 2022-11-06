import React, { Component } from "react";
import {observer} from "mobx-react"
import mainStore from "../stores/main.store"

class Hero extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    const color = mainStore.blackMode ? 'white' : 'black';
    return (
      <section>
        <div className="container" style={{padding: '10vh 0 0 0', display: 'flex', justifyContent: 'center'}}>
          <img style={{maxHeight: '10vh', maxWidth: '66vw'}} src={`/images/${color}-wordmark.png`}/>

        </div>
        <p style={{
              textAlign: 'center',
              padding: 'var(--spacing)',
              margin: '0 auto',
              color: 'var(--muted-color)', 
              maxWidth: '400px'}}>
            Research & Risk Analysis For DeFi Lending Protocols
        </p>
      </section>
    )
  }
}

export default observer(Hero)