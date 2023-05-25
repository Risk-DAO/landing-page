import aave from '../logos/aave.svg';
import agave from '../logos/agave.svg';
import aurigami from '../logos/aurigami.svg';
import badger from '../logos/badger.svg';
import compound from '../logos/compound.svg';
import flare from '../logos/flare.svg';
import hadouken from '../logos/hadouken.svg';
import liquity from '../logos/liquity.svg';
import meld from '../logos/meld.svg';
import moonwell from '../logos/moonwell.svg';
import vesta from '../logos/vesta.svg';

function GridItem(partner){
    return <div className="gridItem">
        <img alt={`${partner} logo`} src={partner} />
    </div>
}

export default function Partners(){
    const partners = [aave, agave, aurigami, badger, compound, flare, 'gearbox', 'godwoken', hadouken, liquity, 'maker', meld, moonwell, 'neftperp', vesta];
    return <div className="partnersContainer"><div className="trustedBy">Trusted By
        </div>
        <div className="gridContainer">
        {partners.map((_)=> GridItem(_))}
    </div>
    </div>
}