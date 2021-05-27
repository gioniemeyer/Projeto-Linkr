import ReactHashtag from "react-hashtag";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Hashtag({ text }) {
    return(
        <ReactHashtag renderHashtag={(hashtagValue) => (
            <Link to={`/hashtag/:${hashtagValue.replace("#", "")}`}>
                <Hashtags>{hashtagValue}</Hashtags>
            </Link>
        )}>
            {text}
        </ReactHashtag>
    );
}

const Hashtags = styled.span`
    font-weight: 700;
    color: #FFFFFF;
`;