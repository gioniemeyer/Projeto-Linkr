
import { AiOutlineComment } from 'react-icons/ai';
import styled from "styled-components"
export default function Comments({numberComment,setShowComment,showComment}){
    function Show(){
        showComment?setShowComment(false):setShowComment(true)
    }
    return(
        <IconBox>
            <AiOutlineComment className="comment-icon" onClick={Show}/>
            <span> {numberComment} {numberComment===1?'comment': 'comments'}</span>
        </IconBox>
    )
}

const IconBox=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    span{
        text-align: center;
    }
`