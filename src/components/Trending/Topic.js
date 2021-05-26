import styled from "styled-components"
import { Link } from "react-router-dom";
export default function Topic({item}){

    return(
        <Link to={`/hashtag/:${item}`}>
            <Topics>
                # {item}
            </Topics>
        </Link>
    )
}

const Topics=styled.ul`
    color: #ffffff;
    font-size: 19px;
    font-family: 'Lato', sans-serif;
    padding-left: 16px;
    padding-bottom: 10px;
    font-weight: 700;
    letter-spacing: 0.05em;
    word-break: break-all;
    :hover {
        filter: brightness(50%);
        
    }
`