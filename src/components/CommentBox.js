import UserContext from "../contexts/UserContext";
import { useContext, useState,useEffect } from "react";
import styled from "styled-components"
import axios from "axios"
import Comment from "./Comment"
import {IoPaperPlaneOutline} from "react-icons/io5"

export default function CommentBox({id,userAuthor,numberOfComments,setNumberOfComments}){
    const { userData } = useContext(UserContext);
    const localUser = JSON.parse(localStorage.getItem("user"));
    const [message,setMessage]=useState("");
    const [commentList,setCommentList]=useState([]);
   
    
    function RenderComments(){
       
        const config = {
            headers: { Authorization: `Bearer ${userData.token || localUser.token}` },
          };
          const request= axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/comments`,config)
          request.then((r)=>{
            setNumberOfComments(r.data.comments.length)
            setCommentList(r.data.comments)})
          request.catch(()=>alert('Erro ao renderizar comentários'))
    }
    useEffect(RenderComments,[])

    function PostComment(event){
        event.preventDefault();
        const body = {
            text: message
          };
        const config = {
            headers: { Authorization: `Bearer ${userData.token || localUser.token}` },
          };
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/comment`,body,config)
        request.then(()=>{setMessage('')
        RenderComments()})
        request.catch(()=>alert('erro ao enviar comentário'))
        
    }

    return(
        <Box>
            {commentList.map((e)=>{
                return <Comment id={e.id} text={e.text} user={e.user} userAuthor={userAuthor}/>
            })}
            <CreateComment>
            <img src={localUser.user.avatar || userData.user.avatar}/>
            <form onSubmit={PostComment}>
                <InputBox>
                    <input type="text" required placeholder="write a comment..." value={message} onChange={e => setMessage(e.target.value)}/>
                    <IoPaperPlaneOutline className="plane-icon" onClick={PostComment}/>
                </InputBox>
            </form>
            </CreateComment>
        </Box>
    )
}

const InputBox=styled.div`
    position: relative;
    width: 510px; 
    .plane-icon{
        color: #F3F3F3;
        position: absolute;
        right:18px;
        bottom:11px;
        font-size: 16.5px;
    }
    @media (max-width: 614px) {
            width: 100%;
      }
  
`
const Box=styled.div`
    width: 611px;
    background: #1E1E1E;
    margin-top: -50px;
    margin-bottom: 10px;
    border-radius: 16px;
    padding-top: 30px;
    
    @media (max-width: 614px) {
            width: 100%;
      }
`
const CreateComment=styled.div`
    display: flex;
    margin:15px 20px;
    
    
     img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 18px;
    }
    input{
        width: 100%;
        height: 39px;
        background: #252525;
        border-radius: 8px;
        border: none;
        padding-left: 15px;
        color:#ACACAC;
        ::placeholder{
        color:#575757;
        font-style: italic;
        font-size: 14px;
        letter-spacing: 0.05em;
        }
        :focus{
        outline: none;
        box-shadow: 0px 0px 1px 1px rgba(255,255,255,0.2);
        }
        
    }
    
`