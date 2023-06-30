import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Slide, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { Box } from "@mui/system";
import arrow from "../images/arrow.png";
import axios from "axios";
import mainStore from "../stores/main.store";
import medium from '../logos/medium.svg';
import mediumDark from '../logos/mediumDark.png';
import riskdao from '../images/riskdao.png';
import { useSwipeable } from "react-swipeable";

const mediumRSSFeedURL = "https://riskdao-landing-api.la-tribu.xyz/medium"


const PinnedPost = {
    title: 'Introducing Risk DAO',
    thumbnail: riskdao,
    link: 'https://medium.com/risk-dao/introducing-risk-dao-75a241115c95'
}
const lastPost = {
    title: 'Read more on Medium',
    thumbnail:medium,
    thumbnailBlack :mediumDark,
    link: 'https://medium.com/risk-dao'
}


function RenderCard(props) {
    const containerRef = useRef();
    const mobile = useMediaQuery('(min-width:600px)');
    if(!props.article){
        return
    }
    return (
        <Box sx={{width:'100%', height:'100%', maxHeight:'30vh'}} ref={containerRef} rel="noreferrer noopener">
            <Tooltip title={props.article.title}>
        <Slide sx={{minHeight:{xs:'100%', sm:'100%', lg:'100%', xl:'100%',display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}} container={containerRef.current} in={props.slideIn} direction={props.slideDirection}>
            <Card elevation={12} sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%'}}>
                <CardActionArea href={props.article.link} target="_blank">
                <CardMedia  sx={{height: !mobile ? '15vh' : '45%', padding: 2}} alt={props.article.title} component='img' image={mainStore.blackMode && props.article.thumbnailBlack ? props.article.thumbnailBlack : props.article.thumbnail} />
                <CardContent sx={{height: '45%'}}>
                    <Typography sx={{overflow: 'hidden', textOverflow:'ellipsis', display:'-webkit-box', WebkitLineClamp: !mobile ? 2 : 4, WebkitBoxOrient:'vertical'}} component='div'>
                        {props.article.title}
                    </Typography>
                </CardContent>
                </CardActionArea>
            </Card>
        </Slide>
        </Tooltip>
        </Box>
    )
}
export default function Medium(props) {
    const [mediumData, setMediumData] = useState(undefined);
    const [postIndex, setPostIndex] = useState(0);
    const blackMode = props.blackMode;
    const className = blackMode ? 'Medium-buttons-dark' : 'Medium-buttons'
    const [slideIn, setSlideIn] = useState(true);
    const [slideDirection, setSlideDirection] = useState('left');

    useEffect(() => {
        async function fetchPosts() {
            const data = await axios.get(mediumRSSFeedURL);
            setMediumData(data.data.items);
        }
        fetchPosts();
    }, []);

    const swipHandlers = useSwipeable({
        onSwipedLeft: (eventData) => handleButton('right'),
        onSwipedRight: (eventData) => handleButton('left'),
    })

    function handleButton(direction) {
        const increment = direction === 'left' ? postIndex === 0 ? 0 : postIndex > 3 ? -3 : -postIndex : postIndex === (mediumData.length - 3) ? 0 : postIndex < (mediumData.length - 4) ? 3 : (mediumData.length - 3 - postIndex);
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
    return (<Box sx={{marginTop: '3vh', width: '100%', height: '100%', minHeight:'35vh', display: 'flex', flexDirection: 'row', alignContent:'center', alignItems:'center', justifyContent:'space-between'}}>
        <img className={className} style={postIndex === 0 ? { opacity: '5%' } : {}} src={arrow} alt="left-button" onClick={() => handleButton('left')} />
        <Container component='main' maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        <Grid {... swipHandlers} container direction="row" flexWrap='wrap' justifyContent="center" alignItems="stretch" rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12} sm={6} lg={4} xl={4}>
        <RenderCard slideIn={slideIn} slideDirection={slideDirection} article={postIndex === 0 ? PinnedPost : mediumData[postIndex]} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={4}>
        <RenderCard slideIn={slideIn} slideDirection={slideDirection} article={postIndex === 0 ? mediumData[postIndex] : mediumData[postIndex + 1]} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={4}>
        <RenderCard slideIn={slideIn} slideDirection={slideDirection} article={postIndex === 0 ? mediumData[postIndex +1] : (postIndex === mediumData.length - 3) ? lastPost : mediumData[postIndex + 2]} />
        </Grid>
        </Grid>
        </Container>
        <img className={className} style={postIndex === mediumData.length - 3 ? { opacity: '5%', transform: 'rotate(180deg' } : { transform: 'rotate(180deg' }} src={arrow} alt="right-button" onClick={() => handleButton('right')} /></Box>
    )
}