import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import aave from '../logos/aave.svg';
import agave from '../logos/agave.svg';
import aurigami from '../logos/aurigami.svg';
import badger from '../logos/badger.svg';
import badgerDark from '../logos/badgerDark.svg';
import compound from '../logos/compound.svg';
import compoundDark from '../logos/compoundDark.svg';
import flare from '../logos/flare.svg';
import gearbox from '../logos/gearbox.svg';
import gearboxDark from '../logos/gearboxDark.svg';
import godwoken from '../logos/godwoken.svg';
import godwokenDark from '../logos/godwokenDark.svg';
import hadouken from '../logos/hadouken.svg';
import liquity from '../logos/liquity.svg';
import liquityDark from '../logos/liquityDark.svg';
import maker from '../logos/maker.svg';
import meld from '../logos/meld.svg';
import meldDark from '../logos/meldDark.svg';
import moonwell from '../logos/moonwell.svg';
import nftperp from '../logos/nftperp.svg';
import nftperpDark from '../logos/nftperpDark.svg';
import { useState } from 'react';
import vesta from '../logos/vesta.svg';
import vestaDark from '../logos/vestaDark.svg';

function GridItem(partner, blackMode) {
    const [visibility, setVisibility] = useState(false);
    function handleModal(){
        setVisibility(!visibility);
    }
    const modalTitle = partner.name.charAt(0).toUpperCase() + partner.name.slice(1);


    return <div className="gridItem" onTouchStart={handleModal}>
        <Dialog className='contrast' onClose={(event, reason) =>{if(reason === 'backdropClick'){handleModal()}}} open={visibility}><DialogTitle>{modalTitle}</DialogTitle> <DialogContent><DialogContentText>{partner.description}</DialogContentText></DialogContent></Dialog>
        <img alt={`${partner.name} logo`} src={blackMode ? partner.logoDark : partner.logo} title={partner.description} />
    </div>
}

const partners = [
    {
        'name': 'aave',
        'logo': aave,
        'logoDark': aave,
        'description': 'Aave grants.',
    },
    {
        'name': 'agave',
        'logo': agave,
        'logoDark': agave,
        'description': 'Lending market analysis and monitoring.',
    },
    {
        'name': 'aurigami',
        'logo': aurigami,
        'logoDark': aurigami,
        'description': 'Lending market analysis and monitoring.',
    },
    {
        'name': 'badger',
        'logo': badger,
        'logoDark': badgerDark,
        'description': 'eBTC analysis.',
    },
    {
        'name': 'compound',
        'logo': compound,
        'logoDark': compoundDark,
        'description': 'Compound grants.',
    },
    {
        'name': 'flare',
        'logo': flare,
        'logoDark': flare,
        'description': 'fAsset analysis.',
    },
    {
        'name': 'gearbox',
        'logo': gearbox,
        'logoDark': gearboxDark,
        'description': 'Lending market analysis and monitoring.',
    },
    {
        'name': 'godwoken',
        'logo': godwoken,
        'logoDark': godwokenDark,
        'description': 'Bug bounty.',
    },
    {
        'name': 'hadouken',
        'logo': hadouken,
        'logoDark': hadouken,
        'description': 'Lending market analysis and monitoring.',
    },
    {
        'name': 'liquity',
        'logo': liquity,
        'logoDark': liquityDark,
        'description': 'Research bounty: game theoretic analysis of Chicken Bonds.',
    },
    {
        'name': 'maker',
        'logo': maker,
        'logoDark': maker,
        'description': 'Bounty for pushing a vote to clear bad debt.',
    },
    {
        'name': 'meld',
        'logo': meld,
        'logoDark': meldDark,
        'description': 'Lending market analysis and monitoring.',
    },
    {
        'name': 'moonwell',
        'logo': moonwell,
        'logoDark': moonwell,
        'description': 'Bug bounty.',
    },
    {
        'name': 'nftperp',
        'logo': nftperp,
        'logoDark': nftperpDark,
        'description': '',
    },
    {
        'name': 'vesta',
        'logo': vesta,
        'logoDark': vestaDark,
        'description': 'Lending market analysis and monitoring.',
    }
]

export default function Partners(props) {
    const blackMode = props.blackMode;
    const className = blackMode ? 'trustedByDark' : 'trustedBy'


    return <div className="partnersContainer"><div className={className}>Trusted By
    </div>
        <div className="gridContainer">
            {partners.map((_) => GridItem(_, blackMode))}
        </div>
    </div>
}