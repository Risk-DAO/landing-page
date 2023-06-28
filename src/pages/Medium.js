import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const mediumRSSFeedURL = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Frisk-dao";
// const mediumRSSFeedURL = "https://medium.com/feed/risk-dao"
const styles = {
    article: { minHeight: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
    a: {}
}

function Card(props) {
    return (<a style={styles.a} href={props.link} target="blank">
        <article style={styles.article}>
            <img src={props.thumbnail} alt="" />
            {props.title}
        </article>
    </a>
    )
}

export default function Medium() {
    const [mediumData, setMediumData] = useState(undefined);

    useEffect(() => {
        async function fetchPosts() {
            const data = await axios.get(mediumRSSFeedURL);
            setMediumData(data.data.items);
        }
        fetchPosts();
    })


    return (<div style={{display: "flex", flexDirection:'row', width:'40vw'}}>
        {mediumData ? mediumData.map(_ => <Card link={_.link} thumbnail={_.thumbnail} title={_.title} />) : 'lol'}
    </div>)
}