import { Card, CardActionArea, CardContent, CardMedia, List, ListItem, Slide, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { TransitionGroup } from "react-transition-group";
import arrow from "../images/arrow.png";
import axios from "axios";

const mediumRSSFeedURL = "https://riskdao-landing-api.la-tribu.xyz/medium"

function renderCard(article) {
    return (
        <ListItem>
            <Card>
                <CardActionArea>
                <CardMedia component='img' image={article.thumbnail} />
                <CardContent>
                    <Typography component='div'>
                        {article.title}
                    </Typography>
                </CardContent>
                </CardActionArea>
            </Card>
        </ListItem>
    )
}

export default function Medium(props) {
    const [mediumData, setMediumData] = useState(undefined);
    const [postIndex, setPostIndex] = useState(0);
    const containerRef = useRef();
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
    return (<div style={{ display: 'flex', justifyContent: 'center', width: '100%', minHeight: '20vh', alignItems: 'center' }} ref={containerRef}>
        <img className={className} style={postIndex === 0 ? { opacity: '5%' } : {}} src={arrow} alt="left-button" onClick={() => handleButton('left')} />
            <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width:'100%' }}>
                <List style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width:'100%' }}>
                <TransitionGroup style={{display: 'flex', flexDirection:'row', justifyContent: 'center', width:'100%' }}>
                <Slide sx={{width: '33%', height:'100%'}}>{renderCard((mediumData[mediumData.length - 1]))}</Slide>
                {mediumData.filter((_, index) =>(index === postIndex || index === postIndex +1)).map(_ => <Slide direction={postIndex%2 ? 'right' : 'left'} sx={{width: '33%', height:'100%'}} key={_.title}>{renderCard(_)}</Slide>)}
                </TransitionGroup>
                </List>
            </div>
        <img className={className} style={postIndex === mediumData.length - 3 ? { opacity: '5%', transform: 'rotate(180deg' } : { transform: 'rotate(180deg' }} src={arrow} alt="right-button" onClick={() => handleButton('right')} />
    </div>)
}