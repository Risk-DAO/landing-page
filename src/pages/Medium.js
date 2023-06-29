import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Slide, Typography } from "@mui/material";
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
    const onTop = props.onTop ? '20' : '2';
    return (
        <Box sx={{width:'100%', height:'100%'}} ref={containerRef} rel="noreferrer noopener">
        <Slide sx={{minHeight:{xs:'100%', sm:'100%', lg:'100%', xl:'100%',display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', zIndex:onTop}}} container={containerRef.current} in={props.slideIn} direction={props.slideDirection}>
            <Card elevation={12} sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', zIndex:onTop}}>
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
    return (<Box sx={{marginTop: '3vh', width: '100%', height: '100%', display: 'flex', flexDirection: 'row', alignContent:'center', alignItems:'center', justifyContent:'space-between'}}>
        <img className={className} style={postIndex === 0 ? { opacity: '5%' } : {}} src={arrow} alt="left-button" onClick={() => handleButton('left')} />
        <Container component='main' maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        <Grid container direction="row" flexWrap='wrap' justifyContent="center" alignItems="stretch" rowSpacing={2} columnSpacing={2}>
        <Grid minHeight={'100%'} item xs={12} sm={6} lg={4} xl={4}>
        <RenderCard onTop={true} slideIn={true} slideDirection={slideDirection} article={mediumData[(mediumData.length - 1)]} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={4}>
        <RenderCard slideIn={slideIn} slideDirection={slideDirection} article={mediumData[postIndex]} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={4}>
        <RenderCard slideIn={slideIn} slideDirection={slideDirection} article={mediumData[postIndex + 1]} />
        </Grid>
        </Grid>
        </Container>
        <img className={className} style={postIndex === mediumData.length - 3 ? { opacity: '5%', transform: 'rotate(180deg' } : { transform: 'rotate(180deg' }} src={arrow} alt="right-button" onClick={() => handleButton('right')} /></Box>
    )
}