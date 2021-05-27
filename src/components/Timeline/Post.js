import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import Hashtag from "./Hashtag";
import {AiFillHeart} from 'react-icons/ai';
import ReactTooltip from 'react-tooltip';

export default function Post({ post,handleLikes,TimelinePosts,LikedPosts,RenderLikes,RenderPosts }) {
  const { userData } = useContext(UserContext);
  const {  id, text, link, linkTitle, linkDescription, linkImage, user, likes, isLiked } =post;
  const texto = text.split(" ");
  const localUser = JSON.parse(localStorage.getItem("user"));
  let enabled=false
  
  function LikeOrDeslike() {
    const body = [];
   
   
    const config = {
      headers: { Authorization: `Bearer ${userData.token || localUser.token}` },
    };
    if(enabled===false){
    const request = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/like`,
      body,
      config
    );
   
    
    }else{
      const request = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/dislike`,
        body,
        config
      );
      
    }
    RenderLikes()
    RenderPosts()
  }

  likes.forEach(element => {
    if(element.userId===localUser.user.id){
      enabled=true
    }
  });
  
  
  return (
    <PostBox>
      <SideMenu enabled={enabled}>
        <Link to={`user/${user.id}`}>
          <img src={user.avatar} alt="Imagem de avatar do usuário" />
        </Link>
        {enabled?<AiFillHeart className="heart-icon" onClick={LikeOrDeslike}/>:<AiOutlineHeart className="heart-icon" onClick={LikeOrDeslike}/>}
        <span data-tip={likes.length === 0 ? '' :
          likes.length !== 1 ?
            likes.length >= 3 ?
              enabled ? 
                `Você, ${likes[0]['user.username']} e outras ${likes.length-2} pessoas` : 
                `${likes[0]['user.username']}, ${likes[1]['user.username']} e outras ${likes.length-2} pessoas` :
            enabled ? 
              `Você e ${localUser.user.username===likes[0]['user.username']?likes[1]['user.username']:likes[0]['user.username']} curtiram` : 
              `${likes[0]['user.username']} e ${likes[1]['user.username']} curtiram` :
          enabled ? 
            `Você curtiu` :
            `${likes[0]['user.username']} curtiu`}>

        {likes.length} {likes.length === 1 ? "like" : "likes"}</span>
        <ReactTooltip place="bottom" type="light" effect="float"/>
      </SideMenu>
      <Content>
        <Link to={`user/${user.id}`}>
          <h1>{user.username}</h1>
        </Link>
        <h2>
          <Hashtag text={text} />
        </h2>
        <Snippet href={link} target="_blank">
          <div className="snippet-text">
            <h3>{linkTitle}</h3>
            <h4>{linkDescription}</h4>
            <h5>{link}</h5>
          </div>
          <img src={linkImage} alt={linkDescription} />
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
  @media (max-width: 614px) {
    width: 100%;
    border-radius: 0;
    padding: 9px 18px 15px 15px;
  }
`;
const SideMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 614px) {
    margin-right: 14px;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    margin-bottom: 19px;
    @media (max-width: 614px) {
      width: 40px;
      height: 40px;
    }
  }
  .heart-icon {
    width: 20px;
    height: 18px;
    color: ${(props) => (props.enabled ? "#AC0000" : "#BABABA")};
    margin-bottom: 4px;
    @media (max-width: 614px) {
      width: 17px;
      height: 15px;
    }
  }
  span {
    font-size: 11px;
    color: #ffffff;
    @media (max-width: 614px) {
      font-size: 9px;
    }
  }
`;
const Content = styled.div`
  width: 503px;
  @media (max-width: 614px) {
    width: 100%;
  }
  h1 {
    font-size: 19px;
    color: #ffffff;
    margin-bottom: 7px;
    word-break: break-all;
    @media (max-width: 614px) {
      font-size: 17px;
    }
  }
  h2 {
    font-size: 17px;
    line-height: 20px;
    color: #b7b7b7;
    margin-bottom: 8px;
    word-break: break-all;
    @media (max-width: 614px) {
      font-size: 15px;
    }
  }
`;
const Snippet = styled.a`
  width: 503px;
  height: 155px;
  border-radius: 11px;
  border: 1px solid #4d4d4d;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 614px) {
    width: 100%;
    min-height: 115px;
  }
  .snippet-text {
    padding-left: 20px;
    @media (max-width: 614px) {
      padding-left: 11px;
    }
  }
  h3 {
    font-size: 16px;
    line-height: 19px;
    color: #cecece;
    margin-bottom: 5px;
    word-break: break-all;
    @media (max-width: 614px) {
      font-size: 11px;
    }
  }
  h4 {
    font-size: 11px;
    line-height: 13px;
    color: #9b9595;
    margin-bottom: 13px;
    word-break: break-all;
    @media (max-width: 614px) {
      font-size: 9px;
    }
  }
  h5 {
    font-size: 11px;
    line-height: 13px;
    color: #cecece;
    word-break: break-all;
    @media (max-width: 614px) {
      font-size: 9px;
    }
  }
  img {
    width: 153.44px;
    height: 155px;
    border-radius: 0px 12px 13px 0px;
    margin-left: 20px;
    @media (max-width: 614px) {
      min-width: 95px;
      min-height: 115px;
      margin-left: 0;
    }
  }
`;
