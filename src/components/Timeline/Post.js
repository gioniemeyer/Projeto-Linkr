import styled from "styled-components";
import { AiOutlineHeart } from 'react-icons/ai';
import { Link } from "react-router-dom";
import axios from 'axios';
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import Hashtag from "./Hashtag";
import ReactTooltip from "react-tooltip";

export default function Post({ post,LikedsIds}) {
    const { userData } = useContext(UserContext);
    const { id, text, link, linkTitle, linkDescription, linkImage, user, likes } = post;
    const texto = text.split(' ');
   
    const pessoa = JSON.parse(localStorage.getItem("user"));
  
    
  
    function LikeOrDeslike(){
            const body=[]
            const config = { headers: { Authorization: `Bearer ${userData.token || pessoa.token}` } };
            const request=axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/like`,body, config)
            request.then(()=>console.log('post curtido'))
            
    }
    
    return(
        <PostBox>
            <SideMenu>
                <Link to={`user/${user.id}`}>
                    <img src={user.avatar} alt="Imagem de avatar do usuário" />
                </Link>
                <AiOutlineHeart className="heart-icon" onClick={LikeOrDeslike}/>
                <span data-tip={ likes.length}>{likes.length} {likes.length === 1 ? "like" : "likes"}</span>
                <ReactTooltip place="bottom" type="light" effect="float"/>
                {console.log(likes)}
            </SideMenu>
            <Content>
                <Link to={`user/${user.id}`}>
                    <h1>{user.username}</h1>
                </Link>
                <h2><Hashtag text={text} /></h2>
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

    @media (max-width: 614px){
        width: 100%;
        border-radius: 0;
        padding: 9px 18px 15px 15px;
    }
`;

const SideMenu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 614px){
        margin-right: 14px;
    }

    img {
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
        margin-bottom: 19px;

        @media (max-width: 614px){
            width: 40px;
            height: 40px;
        }
    }

    .heart-icon {
        width: 20px;
        height: 18px;
        color: ${(props) => (props.enabled ? "red" : "#BABABA")};
        margin-bottom: 4px;

        @media (max-width: 614px){
            width: 17px;
            height: 15px;
        }
    }

    span {
        font-size: 11px;
        color: #FFFFFF;

        @media (max-width: 614px){
            font-size: 9px;
        }
    }
`;

const Content = styled.div`
    width: 503px;

    @media (max-width: 614px){
            width: 100%;
        }

    h1 {
        font-size: 19px;
        color: #FFFFFF;
        margin-bottom: 7px;
        word-break: break-all;

        @media (max-width: 614px){
            font-size: 17px;
        }
    }

    h2 {
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
        margin-bottom: 8px;
        word-break: break-all;

        @media (max-width: 614px){
            font-size: 15px;
        }
    }
`;

const Snippet = styled.a`
    width: 503px;
    height: 155px;
    border-radius: 11px;
    border: 1px solid #4D4D4D;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 614px){
        width: 100%;
        min-height: 115px;
    }

    .snippet-text {
        padding-left: 20px;

        @media (max-width: 614px){
            padding-left: 11px;
        }
    }

    h3 {
        font-size: 16px;
        line-height: 19px;
        color: #CECECE;
        margin-bottom: 5px;
        word-break: break-all;

        @media (max-width: 614px){
            font-size: 11px;
        }
    }

    h4 {
        font-size: 11px;
        line-height: 13px;
        color: #9B9595;
        margin-bottom: 13px;
        word-break: break-all;

        @media (max-width: 614px){
            font-size: 9px;
        }
    }

    h5 {
        font-size: 11px;
        line-height: 13px;
        color: #CECECE;
        word-break: break-all;

        @media (max-width: 614px){
            font-size: 9px;
        }
    }

    img {
        width: 153.44px;
        height: 155px;
        border-radius: 0px 12px 13px 0px;
        margin-left: 20px;

        @media (max-width: 614px){
            min-width: 95px;
            min-height: 115px;
            margin-left: 0;
        }
    }
`;