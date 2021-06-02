
import { AiOutlineComment } from 'react-icons/ai';
import styled from "styled-components"
export default function Comments(){
    return(
        <IconBox>
            <AiOutlineComment className="comment-icon"/>
        </IconBox>
    )
}

const IconBox=styled.div`
    .comment-icon{
    font-size: 20px;
    color: #FFFFFF;
    margin-bottom: 4px;
    margin-top: 19px;
    
    @media (max-width: 614px) {
      width: 17px;
      height: 15px;
    }
    }
`