import { useEffect, useState } from "react";

import arrow from "../images/arrow.png";
import axios from "axios";

const mediumRSSFeedURL = "https://riskdao-landing-api.la-tribu.xyz/medium"
const styles = {
    article: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '25vh' },
    a: { width:'30%', height:'35vh', margin: '0 1% 0 1%' }
}

function Card(props) {
    return (<a style={styles.a} href={props.data.link} target="blank">
        <article style={styles.article}>
            <header style={{marginBottom: '0'}}>
            <img style={{ height: '12vh', marginBottom: '5%' }} src={props.data.thumbnail} alt="" />
            </header>
            <body style={{ height: '8vh', marginBottom: '5%' }}>
            <small style={{marginTop: '5%'}}>{props.data.title}</small>
            </body>
        </article>
    </a>
    )
}

export default function Medium(props) {
    const [mediumData, setMediumData] = useState(undefined);
    const [postIndex, setPostIndex] = useState(0);

    const blackMode = props.blackMode;
    const className = blackMode ? 'Medium-buttons-dark' : 'Medium-buttons'

    useEffect(() => {
        async function fetchPosts() {
            const data = await axios.get(mediumRSSFeedURL);
            setMediumData(data.data.items);
        }
        fetchPosts();
    }, []);

    function handleButton(direction) {
        if (direction === 'left') {
            if (postIndex > 1) {
                setPostIndex(postIndex - 2);
            }
            if (postIndex === 1) {
                setPostIndex(postIndex - 1);
            }
        }
        if (direction === 'right') {
            if (postIndex < (mediumData.length - 4)) {
                setPostIndex(postIndex + 2);
            }
            if (postIndex === (mediumData.length - 4)) {
                setPostIndex(postIndex + 1);
            }
        }
    }
    if (!mediumData) {
        return (
            <div>Could not load Medium posts</div>
        )
    }


    return (<div style={{ display: 'flex', justifyContent: 'center', width: '100%', minHeight: '20vh', alignItems: 'center' }}>
        <img className={className} style={postIndex === 0 ? { opacity: '5%' } : {}} src={arrow} alt="left-button" onClick={() => handleButton('left')} />
        {mediumData ?
            <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width:'100%' }}>
                <Card data={mediumData[mediumData.length - 1]} />
                <Card data={mediumData[postIndex]} />
                <Card data={mediumData[postIndex + 1]} />
            </div>
            : 'Could not load Medium posts'}
        <img className={className} style={postIndex === mediumData.length - 3 ? { opacity: '5%', transform: 'rotate(180deg' } : { transform: 'rotate(180deg' }} src={arrow} alt="right-button" onClick={() => handleButton('right')} />
    </div>)
}