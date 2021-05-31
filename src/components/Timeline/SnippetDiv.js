import styled from "styled-components";
import ReactPlayer from 'react-player/lazy'
import getYouTubeID from 'get-youtube-id';


export default function SnippetDiv({link}) {
      let idVideo = getYouTubeID("youtube abcdefghijk", {fuzzy: false});

    return(
        <SnippetVideo href={link} target="_blank" className='player-wrapper'>
            <ReactPlayer 
                url={link} 
                className='react-player'
                width='100%'
                height='100%'/>
            <h5>{link}</h5>
        </SnippetVideo>
    )
}

const SnippetVideo = styled.a`
    width: 503px;
    height: 100%;
    border-radius: 11px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    .player-wrapper {
        position: relative;
        padding-top: 56.25% /* Player ratio: 100 / (1280 / 720) */
        
    }
    

    .player-wrapper > div {
        position: absolute;
        top: 10px;
        left: 10px;
        }

    @media (max-width: 614px){
        width: 100%;
    }
`;