import { makeAutoObservable, runInAction } from "mobx"
import axios from "axios"
import web3Utils from "web3-utils"

class DashboardsStore {

  dashboards = [
    {
      name: 'aurigami',
      description: 'The native money market on Aurora',
      url: 'https://aurigami.riskdao.org',
      logo: {
        black: "https://aurigami.riskdao.org/logos/aurigami.svg",
        white: "https://aurigami.riskdao.org/logos/aurigami.svg"
      }
    },
    {
      name: 'vesta',
      description: 'a layer 2-first lending protocol, without interest',
      url: 'https://vesta.riskdao.org',
      logo: {
        black: "https://vesta.riskdao.org/logos/vesta-dark.svg",
        white: "https://vesta.riskdao.org/logos/vesta.svg"
      }
    },
    {
      name: 'gearbox',
      description: 'Generalized Leverage Protocol Built with composability',
      url: 'https://gearbox.riskdao.org',
      logo: {
        black: "https://gearbox.riskdao.org/logos/gearboxwhite.png",
        white: "https://gearbox.riskdao.org/logos/gearboxblack.png"
      }
    },
    {
      name: 'hadouken',
      description: 'Faster and cheaper DeFi, powered by Nervos',
      url: 'https://hadouken.riskdao.org',
      logo: {
        black: "https://nervos-github-api.riskdao.workers.dev/logos/nervos-dark.svg",
        white: "https://nervos-github-api.riskdao.workers.dev/logos/nervos.svg"
      },
    },
    {
      name: 'agave',
      description: 'the DeFi lending protocol on Gnosis chain',
      url: 'https://agave.riskdao.org',
      logo: {
        black: "/images/platforms/agave.svg",
        white: "/images/platforms/agave.svg",
      },
    },    
    {
      name: 'meld',
      description: 'The Banking Stack for DeFi, on Cardano',
      url: 'https://www.meld.com/',
      logo: {
        black: "/images/platforms/meld.svg",
        white: "/images/platforms/meld-black.svg",
      },
      comingSoon: true,
    },
  ]
  
  constructor () {
    makeAutoObservable(this)
  }
}

export default new DashboardsStore()