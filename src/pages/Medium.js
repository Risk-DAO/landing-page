import { Card, CardActionArea, CardContent, CardMedia, Grid, Slide, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { Box } from "@mui/system";
import arrow from "../images/arrow.png";
import axios from "axios";

const mediumRSSFeedURL = "https://riskdao-landing-api.la-tribu.xyz/medium"

const gridContainer = {
    display: "grid",
    gridTemplateRow: "1fr",
    gridAutoFlow: "row",
    gap: '1vw'
  };

function RenderCard(props) {
    const containerRef = useRef();
    if(!props.article){
        return
    }
    const onTop = props.onTop ? 'tooltip' : '';
    return (
        <Box sx={{width:'100%', height:'100%', zIndex: onTop}} ref={containerRef} rel="noreferrer noopener">
        <Slide sx={{height:'100%'}} container={containerRef.current} in={props.slideIn} direction={props.slideDirection}>
            <Card sx={{height: '100%'}}>
                <CardActionArea href={props.article.link} target="_blank">
                <CardMedia  sx={{height: '45%'}} alt={props.article.title} component='img' image={props.article.thumbnail} />
                <CardContent  sx={{height: '45%'}}>
                    <Typography component='div'>
                        {props.article.title}
                    </Typography>
                </CardContent>
                </CardActionArea>
            </Card>
        </Slide>
        </Box>
    )
}
export default function Medium(props) {
    const [mediumData, setMediumData] = useState(undefined);
    const [postIndex, setPostIndex] = useState(0);
    const blackMode = props.blackMode;
    const className = blackMode ? 'Medium-buttons-dark' : 'Medium-buttons'
    const [slideIn, setSlideIn] = useState(true);
    const [slideDirection, setSlideDirection] = useState('down');
    useEffect(() => {
        async function fetchPosts() {
            const data = await axios.get(mediumRSSFeedURL);
            setMediumData(data.data.items);
        }
        fetchPosts();
    }, []);

    function handleButton(direction) {
        const increment = direction === 'left' ? postIndex === 0 ? 0 : postIndex === 1 ? -1 : -2 : postIndex === (mediumData.length - 3) ? 0 : postIndex === (mediumData.length - 4) ? 1 : 2;
        if(increment === 0){
            return
        }
        const newIndex = (postIndex + increment + mediumData.length) % mediumData.length;
        const oppDirection = direction === 'left' ? 'right' : 'left';
        setSlideDirection(direction);
        setSlideIn(false);
        setTimeout(() => {
            setPostIndex(newIndex);
            setSlideDirection(oppDirection);
            setSlideIn(true);
        }, 500);
    }
    if (!mediumData) {
        return (
            <div>Could not load Medium posts</div>
        )
    }
    return (<Box sx={{marginTop: '3vh', width: '100%', height: '30vh', display: 'flex', flexDirection: 'row', alignContent:'center', alignItems:'center', justifyContent:'space-between'}}>
        <img className={className} style={postIndex === 0 ? { opacity: '5%' } : {}} src={arrow} alt="left-button" onClick={() => handleButton('left')} />
        <Grid container gridAutoFlow='column' direction="row" justifyContent="center" alignItems="center" rowSpacing={2} columnSpacing={2}>
        <Grid sx={{height:'100%'}} item xs={12} sm={6} lg={4} xl={4}>
        <RenderCard onTop={true} slideIn={true} slideDirection={slideDirection} article={mediumData[(mediumData.length - 1)]} />
        </Grid>
        <Grid sx={{height:'100%'}} item xs={12} sm={6} lg={4} xl={4}>
        <RenderCard sx={{height:'100%'}} slideIn={slideIn} slideDirection={slideDirection} article={mediumData[postIndex]} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={4}>
        <RenderCard slideIn={slideIn} slideDirection={slideDirection} article={mediumData[postIndex + 1]} />
        </Grid>
        </Grid>
        <img className={className} style={postIndex === mediumData.length - 3 ? { opacity: '5%', transform: 'rotate(180deg' } : { transform: 'rotate(180deg' }} src={arrow} alt="right-button" onClick={() => handleButton('right')} /></Box>
    )
}