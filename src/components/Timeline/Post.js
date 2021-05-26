import styled from "styled-components";
import { AiOutlineHeart } from 'react-icons/ai';
import axios from "axios"
import UserContext from "../../contexts/UserContext";
import { useEffect, useState, useContext } from "react";

export default function Post({ post,LikedsIds}) {
    const { userData } = useContext(UserContext);
    const { id, text, link, linkTitle, linkDescription, linkImage, user, likes } = post;
    const texto = text.split(' ');
   
    const pessoa = JSON.parse(localStorage.getItem("user"));
  
    
    let hashtags = [];
    for(let i = 0; i < texto.length; i++) {
        if (texto[i].includes('#')) {
            hashtags.push(texto[i]);
        }
    }
   

    function LikeOrDeslike(){
            const body=[]
            const config = { headers: { Authorization: `Bearer ${userData.token || pessoa.token}` } };
            const request=axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/like`,body, config)
            request.then(()=>console.log('post curtido'))
            
    }
    
    return(
        <PostBox>
            <SideMenu>
                <img src={linkImage} alt={linkTitle} />
                <AiOutlineHeart className="heart-icon" onClick={LikeOrDeslike}/>
                <span>{likes.length} {likes.length === 1 ? "like" : "likes"}</span>
            </SideMenu>
            <Content>
                <h1>{user.username}</h1>
                <h2>{text}</h2>
                <Snippet href={link} target="_blank">
                    <div>
                        <h3>{linkTitle}</h3>
                        <h4>{linkDescription}</h4>
                        <h5>{link}</h5>
                    </div>
                    <img src={linkImage} alt={linkTitle} />
                </Snippet>
            </Content>
        </PostBox>
    );
}

const PostBox = styled.li`
    width: 611px;
    background-color: #171717;
    display: flex;
    justify-content: space-between;
    padding: 17px 21px 20px 18px;
    border-radius: 16px;
    margin-bottom: 16px;
`;

const SideMenu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
        margin-bottom: 19px;
    }

    .heart-icon {
        width: 20px;
        height: 18px;
        color: #FFFFFF;
        margin-bottom: 4px;
    }

    span {
        font-size: 11px;
        color: white;
    }
`;

const Content = styled.div`
    width: 503px;

    h1 {
        font-size: 19px;
        color: #FFFFFF;
        margin-bottom: 7px;
    }

    h2 {
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
        margin-bottom: 8px;
    }
`;

const Snippet = styled.a`
    width: 503px;
    height: 155px;
    border-radius: 11px;
    border: 1px solid #4D4D4D;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
        padding: 0 20px;
    }

    h3 {
        font-size: 16px;
        line-height: 19px;
        color: #CECECE;
        margin-bottom: 5px;
    }

    h4 {
        font-size: 11px;
        line-height: 13px;
        color: #9B9595;
        margin-bottom: 13px;
    }

    h5 {
        font-size: 11px;
        line-height: 13px;
        color: #CECECE;
    }

    img {
        width: 153.44px;
        height: 155px;
        border-radius: 0px 12px 13px 0px;
    }
`;