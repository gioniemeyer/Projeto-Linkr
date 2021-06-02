import styled from "styled-components";
import { AiOutlineHeart } from 'react-icons/ai';
import { useContext, useState, useRef, useEffect } from "react";
import Hashtag from "../Timeline/Hashtag";
import { Link, useHistory } from "react-router-dom";
import Modal from "../Modal";
import { FaTrash } from 'react-icons/fa';
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import {FaPencilAlt} from 'react-icons/fa';
import getYouTubeID from 'get-youtube-id';
import SnippetDiv from "../Timeline/SnippetDiv";
import ModalLink from "../ModalLink";

export default function PostClickedUser({ post, RenderPosts }) {
    const { id, text, link, linkTitle, linkDescription, linkImage, user, likes } = post;   
    const history = useHistory();
    const { userData } = useContext(UserContext);
    const [modalOpen, setModalOpen] = useState(false);
    const localUser = JSON.parse(localStorage.getItem("user"));  
    const [control,setControl]=useState(false)
    const [newText,setNewText]=useState(text)
    const [disabler,setDisabler]=useState(false)
    const inputRef=useRef();
    const idVideo = getYouTubeID(link);
    const [modalLink, setModalLink] = useState(false);

    useEffect(()=>{
        if(control){
          inputRef.current.focus()
        }
        setNewText(text)
    },[control]);

    function ShowEdit(){ 
        if(control){
         setControl(false)
         
         return
        }else{
         setControl(true)
         
        }
        
    }
      
     function Edit(event){
       event.preventDefault();
       setDisabler(true)
       const body = {
         text: newText
       };
       const config = {
         headers: { Authorization: `Bearer ${userData.token || localUser.token}` },
       };
       const request= axios.put(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}`,body,config)
       request.then((response)=>{
       setDisabler(false)
       setControl(false)
       RenderPosts()}
       )
       request.catch(()=>{alert('Não foi possível salvar as alterações')
       setDisabler(false)})
    }
      
    return(
        <PostBox>
            <ModalLink modalLink={modalLink} setModalLink={setModalLink} postID={id} link={link} linkTitle={linkTitle} />
            <SideMenu>
                <Link to={`/user/${user.id}`}> 
                    <img src={user.avatar} alt="Imagem de avatar do usuário" />
                </Link>
                <AiOutlineHeart className="heart-icon" />
                <span>{likes.length} {likes.length === 1 || likes.length === 0 ? "like" : "likes"}</span>
            </SideMenu>
            <Content>
                <h1 onClick={() => history.push(`${user.id}`)}>{user.username}</h1>
                <h2>
                {control?          
                [<form onSubmit={Edit}>
                    <input type="text" required value={newText} onChange={(e) => setNewText(e.target.value)} disabled={disabler} ref={inputRef} onKeyDown={(e)=>e.keyCode==27?setControl(false):''}/>
                </form>]           
                :<Hashtag text={text} />}
                </h2>
                {idVideo ? 
                    <SnippetDiv link={link} idVideo={idVideo} /> :
                    <Snippet onClick={() => setModalLink(true)}>
                    <div className="snippet-text">
                        <h3>{linkTitle}</h3>
                        <h4>{linkDescription}</h4>
                        <h5>{link}</h5>
                        </div>
                        <img src={linkImage} alt={linkDescription} />
                    </Snippet> }
            </Content>
            {(userData ? userData.user.id : localUser.user.id) === user.id && <FaPencilAlt onClick={ShowEdit} className="pencil-icon"/>}
            {(userData ? userData.user.id : localUser.user.id) === user.id && <FaTrash onClick={() => setModalOpen(true)} className="trash-icon" />}
            <Modal RenderPosts={RenderPosts} modalOpen={modalOpen} setModalOpen={setModalOpen} postID={id} />
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
    position: relative;    

    @media (max-width: 614px){
        width: 100%;
        border-radius: 0;
        padding: 9px 18px 15px 15px;
    }

    .trash-icon {
      position: absolute;
      top: 23px;
      right: 23px;
      color: #FFFFFF;
      width: 14px;
      height: 14px;
      cursor: pointer;

      @media (max-width: 614px) {
            top: 13px;
        }
    }

    .pencil-icon {
      position: absolute;
      top: 23px;
      right: 48px;
      color: #FFFFFF;
      width: 14px;
      height: 14px;
      cursor: pointer;

      @media (max-width: 614px) {
            top: 13px;
      }
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

        @media (max-width: 614px){
            width: 40px;
            height: 40px;
        }
    }

    .heart-icon {
        width: 20px;
        height: 18px;
        color: #FFFFFF;
        margin-bottom: 4px;
        margin-top: 19px;
        color: ${(props) => (props.enabled ? "#AC0000" : "#BABABA")};

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
        width: calc(100% - 69px);
    }

    h1 {
        width: fit-content;
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

    input{
        width: 100%;
        border-radius: 7px;
        font-size: 14px;
        padding:4px 9px;
        outline: 1px solid black;
        overflow-y: auto;
        overflow-wrap: break-word;
        color: #4C4C4C;
    }
`;

const Snippet = styled.div`
    width: 503px;
    height: 155px;
    border-radius: 11px;
    border: 1px solid #4D4D4D;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 614px){
        width: 100%;
        height: 115px;
    }

    .snippet-text {
        width: 350px;
        height: 100%;
        padding: 10px 10px 10px 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @media (max-width: 614px){
            width: calc(100% - 95px);
            padding: 7px 7px 8px 11px;
        }
    }

    h3 {
        height: 38px;
        font-size: 16px;
        line-height: 19px;
        color: #CECECE;
        margin-bottom: 5px;
        word-break: break-all;
        overflow: hidden !important;

        @media (max-width: 614px){
            height: 26px;
            font-size: 11px;
        }
    }

    h4 {      
        height: 39px;                                       
        font-size: 11px;
        line-height: 13px;
        color: #9B9595;
        margin-bottom: 13px;
        word-break: break-all;
        overflow: hidden !important;

        @media (max-width: 614px){
            height: 42px;
            font-size: 9px;
        }
    }

    h5 {
        height: 13px;
        font-size: 11px;
        line-height: 13px;
        color: #CECECE;
        word-break: break-all;
        white-space: nowrap;
        overflow: hidden !important;
        text-overflow: ellipsis;

        @media (max-width: 614px){
            height: 15px;
            font-size: 9px;
        }
    }

    img {
        width: 153.44px;
        height: 155px;
        border-radius: 0px 12px 13px 0px;
        object-fit: cover;
        white-space: pre-wrap;
        text-overflow: ellipsis; 
        overflow: hidden;

        @media (max-width: 614px){
            width: 95px;
            height: 115px;
            object-fit: cover;
        }
    }
`;