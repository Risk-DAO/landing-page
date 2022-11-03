import React, { Component } from "react";
import {observer} from "mobx-react"
import dashboardsStore from "../stores/dashboards.store"
import DashboardCard from "../components/DashboardCard"


class Dashboard extends Component {

  render() {
    return <div>
      <hgroup>
      <h4>Risk Management Dashboards</h4>
      <h6>Risk metrics & Simulations based on past and current data, updating daily</h6>
      </hgroup>
      <div style={{
          display: 'flex', 
          flexWrap: 'wrap', 
        }}>
          {dashboardsStore.dashboards.map(d => <DashboardCard key={d} {...d}/>)}
      </div>
    </div> 
  }
}

export default observer(Dashboard)