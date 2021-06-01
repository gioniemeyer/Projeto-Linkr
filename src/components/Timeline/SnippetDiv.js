import styled from "styled-components";

export default function SnippetDiv({link, idVideo}) {

    return(
        <SnippetVideo href={link} target="_blank" >
         
            <iframe className="snippet-text"
                width="500" 
                height="280" 
                src={`https://www.youtube.com/embed/${idVideo}?autoplay=1&mute=1`}>
            </iframe>     

            <h5>{link}</h5>
        </SnippetVideo>
    )
}

const SnippetVideo = styled.a`
    width: 503px;
    height: 320px;
    border-radius: 11px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    position: relative;

    @media (max-width: 614px){
        width: 100%;
        height: 220px;
    }

    @media (max-width: 321px){
        height: 160px;
    }
    .snippet-text {

        @media (max-width: 614px){
            width: calc(250px);
            height: calc(170px);
        }
        @media (max-width: 321px){
            width: calc(210px);
            height: calc(120px);
        }
    }

    h5 {
        height: 13px;
        font-size: 17px;
        line-height: 13px;
        color: #CECECE;
        word-break: break-all;
        white-space: nowrap;
        overflow: hidden !important;
        text-overflow: ellipsis;

        @media (max-width: 614px){
            width: 100%;
            height: 15px;
            font-size: 9px;
        }
    }
`;

