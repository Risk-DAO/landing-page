import arrow from "../images/arrow.png";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const mediumRSSFeedURL = "https://riskdao-landing-api.la-tribu.xyz/medium"
const styles = {
    article: {display: 'flex', flexDirection: 'column', justifyContent: 'center', maxHeight: '25vh', minHeight: '25vh'},
    a: {width: '30%', margin: '0 10px 0 0'}
}

function Card(props) {
    return (<a style={styles.a} href={props.data.link} target="blank">
        <article style={styles.article}>
            <img style={{height:'40%', marginBottom:'5%'}} src={props.data.thumbnail} alt="" />
            <small style={{height:'40%', marginTop: '5%'}}>{props.data.title}</small>
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

    function handleButton(direction){
        if(direction === 'left'){
            if(postIndex > 0){
                setPostIndex(postIndex - 1);
            }
        }
        if(direction === 'right'){
            if(postIndex < (mediumData.length - 3)){
                setPostIndex(postIndex + 1);
            }
        }
    }


    return (<div style={{display: 'flex', justifyContent: 'center', width:'100%', alignItems:'center'}}>
        <img className={className} src={arrow} alt="left-button" onClick={() => handleButton('left')}/>
        {mediumData ?
            <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                <Card data={mediumData[mediumData.length - 1]}/> 
                <Card data={mediumData[postIndex]} />
                <Card data={mediumData[postIndex + 1]} />
            </div>
            : 'Could not load Medium posts'}
        <img className={className} style={{transform: 'rotate(180deg'}} src={arrow} alt="right-button" onClick={() => handleButton('right')}/>
    </div>)
}