import React, { Component } from "react";
import {observer} from "mobx-react"
import mainStore from "../stores/main.store"

const DashboardCard = observer(props => {
  return <article 
      onClick={() => window.open(props.url, '_blank').focus()}
      className={`dashboard-card ${props.comingSoon ? '' : 'clickable blur-onhover'}`}>
    <div style={{opacity: props.comingSoon ? 0.4 : 1}}>
      <img style={{maxHeight: '40px'}} src={props.logo[mainStore.blackMode ? 'black' : 'white']}/>
      <p style={{margin: 'var(--spacing) 0'}}>{props.description}</p>
    </div>
    {props.comingSoon && <kbd style={{marginTop: '-80px'}}>coming soon</kbd>}
  </article>
})

export default DashboardCard