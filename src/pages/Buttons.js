import { Component } from "react";
import { observer } from "mobx-react";

class Buttons extends Component {

  render () {
    return (
      <div>
        <p>
          <a style={{minWidth: '280px', margin: '10px'}} role="button" href="https://bad-debt.riskdao.org" class="contrast" aria-label="Bad Debt Dashboard">Bad Debt Dashboard</a>
          <a style={{minWidth: '280px', margin: '10px'}} role="button" href="https://medium.com/risk-dao" class="contrast outline" aria-label="Publications">Publications</a>
          <a style={{minWidth: '280px', margin: '10px'}} role="button" href="https://irs.riskdao.org" class="contrast" aria-label="Interest Rate Simulator">Interest Rate Simulator</a>
        </p>
      </div>
    )
  }
}

export default observer(Buttons)