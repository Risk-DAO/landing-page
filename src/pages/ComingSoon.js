import { Component } from "react";
import mainStore from "../stores/main.store";
import { observer } from "mobx-react";

const styles = {
  article: { minHeight: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  a: {}
}

class ComingSoon extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    const color = mainStore.blackMode ? 'light' : 'dark';
    return (
      <div>
        <p>
          <a style={{minWidth: '280px', margin: '10px'}} role="button" href="https://bad-debt.riskdao.org" class="contrast" aria-label="Bad Debt Dashboard">Bad Debt Dashboard</a>
          <a style={{minWidth: '280px', margin: '10px'}} role="button" href="/dashboards" class="contrast outline" aria-label="Risk Analysis Dashboards">Risk Analysis Dashboards</a>
          <a style={{minWidth: '280px', margin: '10px'}} role="button" href="https://irs.riskdao.org" class="contrast" aria-label="Interest Rate Simulator">Interest Rate Simulator</a>
        </p>
        <div className="grid">
          <a style={styles.a}href="https://medium.com/risk-dao/introducing-risk-dao-75a241115c95" target="_blank">
            <article style={styles.article}>
              <img src={`/images/cs/intro.png`}/>
                Introducing Risk DAO
            </article>
          </a>
          <a style={styles.a}href="https://medium.com/risk-dao/using-the-riskdao-simulation-gui-2aaffd6c5792" target="_blank">
            <article style={styles.article}>
              <img src={`/images/cs/Ts.png`}/>
                Using the RiskDAO simulation GUI
            </article>
          </a>
          <a style={styles.a}href="https://medium.com/risk-dao/vesta-finance-system-parameterization-risk-analysis-b52aaf7b56e5" target="_blank">
            <article style={styles.article}>
            <img src={`/images/cs/vesta.png`}/>
                Vesta Finance: System Parameterization Risk Analysis
            </article>
          </a>
        </div>
      </div>
    )
  }
}

export default observer(ComingSoon)