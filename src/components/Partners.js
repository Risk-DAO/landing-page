import aave from '../logos/aave.svg';
import agave from '../logos/agave.png';
import agaveDark from '../logos/agaveDark.svg';
import aurigami from '../logos/aurigami.svg';
import badger from '../logos/badger.svg';
import badgerDark from '../logos/badgerDark.svg';
import compound from '../logos/compound.svg';
import compoundDark from '../logos/compoundDark.svg';
import flare from '../logos/flare.svg';
import gearbox from '../logos/gearbox.png';
import gearboxDark from '../logos/gearboxDark.png';
import godwoken from '../logos/godwoken.svg';
import godwokenDark from '../logos/godwokenDark.svg';
import hadouken from '../logos/hadouken.svg';
import liquity from '../logos/liquity.svg';
import liquityDark from '../logos/liquityDark.svg';
import maker from '../logos/maker.png';
import meld from '../logos/meld.svg';
import meldDark from '../logos/meldDark.svg';
import moonwell from '../logos/moonwell.png';
import nftperp from '../logos/nftperp.png';
import nftperpDark from '../logos/nftperpDark.png';
import vesta from '../logos/vesta.svg';
import vestaDark from '../logos/vestaDark.svg';

function GridItem(partner){
    return <div className="gridItem">
        <img alt={`${partner} logo`} src={partner} />
    </div>
}

export default function Partners(props){
    const partners = [aave, agave, aurigami, badger, compound, flare, gearbox, godwoken, hadouken, liquity, maker, meld, moonwell, nftperp, vesta];
    const partnersDark = [aave, agaveDark, aurigami, badgerDark, compoundDark, flare, gearboxDark, godwokenDark, hadouken, liquityDark, maker, meldDark, moonwell, nftperpDark, vestaDark];
    const renderPartners = props.blackMode ? partnersDark : partners
    const className = props.blackMode ? 'trustedByDark' : 'trustedBy'


    return <div className="partnersContainer"><div className={className}>Trusted By
        </div>
        <div className="gridContainer">
        {renderPartners.map((_)=> GridItem(_))}
    </div>
    </div>
}