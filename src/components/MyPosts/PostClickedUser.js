import styled from "styled-components";
import { BiRepost } from "react-icons/bi";
import { useContext, useState, useRef, useEffect } from "react";
import Hashtag from "../Timeline/Hashtag";
import { Link, useHistory } from "react-router-dom";
import Modal from "../Modal";
import { FaTrash } from "react-icons/fa";
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";
import getYouTubeID from "get-youtube-id";
import SnippetDiv from "../Timeline/SnippetDiv";
import GeolocationModal from "../GeolocationModal";
import { IoLocationSharp } from "react-icons/io5";
import {AiFillHeart} from 'react-icons/ai';
import ReactTooltip from 'react-tooltip';
import Comments from "../Comments"
import CommentBox from "../CommentBox"
import ModalLink from "../ModalLink";
import ModalRepost from "../ModalRepost";
export default function PostClickedUser({ post, RenderPosts, RenderLikes,MyPosts }) {
    const { id, text, link, linkTitle, linkDescription, linkImage, user,commentCount, repostCount, repostedBy } = post;   
    const history = useHistory();
    const { userData } = useContext(UserContext);
    const [modalOpen, setModalOpen] = useState(false);
    const localUser = JSON.parse(localStorage.getItem("user"));  
    const [control,setControl]=useState(false);
    const [newText,setNewText]=useState(text);
    const [disabler,setDisabler]=useState(false);
    const [geoModalOpen, setGeoModalOpen] = useState(false);
    const inputRef=useRef();
    const idVideo = getYouTubeID(link); 
    const [numberOfComments,setNumberOfComments]=useState(commentCount);
    const [showComment,setShowComment]=useState(false);
    const [edited,setEdited]=useState(false);
    const [isLiked, setIsLiked] = useState();
    const [likesQty, setLikesQty] = useState(post.likes.length);
    const [likes, setLikes] = useState(post.likes);
    const [modalLink, setModalLink] = useState(false);
    const [modalRepostOpen, setModalRepostOpen] = useState(false);
    

    useEffect(() => {
        likes.forEach((like, i) => {
          setLikes([...likes], like.username = like['user.username']);
        });
      }, []);

    useEffect(()=>{
        if(control){
          inputRef.current.focus()
        }
      },[control])
      
      useEffect(()=>{
        RenderPosts()
        setNewText(text)
      },[text])
      

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
       setEdited(true)
       setDisabler(false)
       setControl(false)
       RenderPosts()}
       )
       request.catch(()=>{alert('N??o foi poss??vel salvar as altera????es')
       setDisabler(false)})
    }
  


  function LikeOrDeslike() {
    const body = [];

    const config = {
      headers: { Authorization: `Bearer ${userData.token || localUser.token}` },
    };

    if (isLiked === false || likesQty === 0 || isLiked === undefined) {
      const request = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/like`,
        body,
        config
      );

      request.then(response => {
        setIsLiked(true);
        const soma = likesQty + 1;
        setLikesQty(soma);
        setLikes(response.data.post.likes);
      });

    } else {
      const request = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/dislike`,
        body,
        config
      );

      request.then(response => {
        setIsLiked(false);
        const subtrair = likesQty - 1;
        setLikesQty(subtrair);
        setLikes(response.data.post.likes);
      });
    }
  }

  useEffect(() => {
    likes.forEach(element => {
      if(element.userId === localUser.user.id) {
        setIsLiked(true);
      }
    });
  }, []);

  function openModalRepost() {
    setModalRepostOpen(true);
  }

  return (
    <>
    {
      repostedBy === undefined
      ? ""
      :
        <RepostHeader>
          <div>
            <BiRepost className="repost-icon-header" />
            <span>Re-posted by <strong>{repostedBy.id === (userData.id || localUser.user.id) ? "you" : repostedBy.username}</strong></span>
          </div>
        </RepostHeader>
    }
    <PostBox>
    <ModalLink modalLink={modalLink} setModalLink={setModalLink} postID={id} link={link} linkTitle={linkTitle} />
    <ModalRepost modalRepostOpen={modalRepostOpen} setModalRepostOpen={setModalRepostOpen} RenderPosts={RenderPosts} postID={id} />
    <SideMenu isLiked={isLiked}>
        <Link to={`/user/${user.id}`}>
          <img src={user.avatar} alt="Imagem de avatar do usu??rio" />
        </Link>
        {isLiked ? (
          <AiFillHeart className="heart-icon" onClick={LikeOrDeslike} />
        ) : (
          <AiFillHeart
            stroke={"white"}
            strokeWidth={80}
            fill={"#171717"}
            className="heart-icon"
            onClick={LikeOrDeslike}
          />
        )}
        <span
          data-tip={
            likes.length === 0
              ? ""
              : likes.length !== 1
              ? likes.length >= 3
                ? isLiked
                  ? `Voc??, ${likes[0]['username']} e outras ${
                      likes.length - 2
                    } pessoas`
                  : `${likes[0]['username']}, ${
                      likes[1]['username']
                    } e outras ${likes.length - 2} pessoas`
                : isLiked
                ? `Voc?? e ${
                    localUser.user.username === likes[0]['username']
                      ? likes[1]['username']
                      : likes[0]['username']
                  } curtiram`
                : `${likes[0]['username']} e ${likes[1]['username']} curtiram`
              : isLiked
              ? `Voc?? curtiu`
              : `${likes[0]['username']} curtiu`
          }
        >
          {likesQty} {likesQty === 1 || likesQty === 0 ? "like" : "likes"}
        </span>
        <ReactTooltip place="bottom" type="light" effect="float" />
        <div className="repost-box">
          <Comments numberComment={numberOfComments} setShowComment={setShowComment} showComment={showComment} />
        </div>
        <div className="repost-box">
          <BiRepost onClick={openModalRepost} className="repost-icon" />
        </div>
        <span>{repostCount} {repostCount === 1 || repostCount === 0 ? "re-post" : "re-posts"}</span>
      </SideMenu>
      <Content>
        <Wrapper>
          <Link className="link" to={`${user.id}`}>
            <h1>{user.username}</h1>
          </Link>
          {post.geolocation && (
            <IoLocationSharp
              onClick={(e) => {
                e.stopPropagation();
                setGeoModalOpen(true);
              }}
              className="geolocation"
            />
          )}
        </Wrapper>
        <h2>
          {control ? (
            [
              <form onSubmit={Edit}>
                <input
                  type="text"
                  required
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  disabled={disabler}
                  ref={inputRef}
                  onKeyDown={(e) => (e.keyCode == 27 ? setControl(false) : "")}
                />
              </form>,
            ]
          ) : (
            <Hashtag text={edited?newText:text}/>
          )}
        </h2>
        {idVideo ? (
          <SnippetDiv link={link} idVideo={idVideo} />
        ) : (
            <Snippet onClick={() => setModalLink(true)}>
                <div className="snippet-text">
              <h3>{linkTitle}</h3>
              <h4>{linkDescription}</h4>
              <h5>{link}</h5>
            </div>
            <img src={linkImage} alt={linkDescription} />
          </Snippet>
        )}
      </Content>
      {(userData ? userData.user.id : localUser.user.id) === user.id && (
        <FaPencilAlt onClick={ShowEdit} className="pencil-icon" />
      )}
      {(userData ? userData.user.id : localUser.user.id) === user.id && (
        <FaTrash onClick={() => setModalOpen(true)} className="trash-icon" />
      )}
      <Modal
        RenderPosts={RenderPosts}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        postID={id}
      />
      {post.geolocation && (
        <GeolocationModal
          latitude={post.geolocation.latitude}
          longitude={post.geolocation.longitude}
          RenderPosts={RenderPosts}
          geoModalOpen={geoModalOpen}
          setGeoModalOpen={setGeoModalOpen}
          post={post}
        ></GeolocationModal>
      )}
    </PostBox>
    {showComment?<CommentBox id={id} userAuthor={user.id} numberOfComments={numberOfComments} setNumberOfComments={setNumberOfComments} TimelinePosts={MyPosts}/>:''}
    </>
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

  @media (max-width: 614px) {
    width: 100%;
    border-radius: 0;
    padding: 9px 18px 15px 15px;
  }

  .trash-icon {
    position: absolute;
    top: 23px;
    right: 23px;
    color: #ffffff;
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
    color: #ffffff;
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

  @media (max-width: 614px) {
    margin-right: 14px;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;

    @media (max-width: 614px) {
      width: 40px;
      height: 40px;
    }
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 26.5px;

      @media (max-width: 614px) {
        width: 40px;
        height: 40px;
      }
    }

    svg {
      pointer-events: none;

      path {
        pointer-events: all;
      }
    }

    .heart-icon {
      width: 20px;
      height: 18px;
      color: #ffffff;
      margin-bottom: 4px;
      margin-top: 19px;
      color: ${(props) => (props.isLiked ? "#AC0000" : "#FFFFFF")};
      cursor: pointer;

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

  .repost-box {
    svg {
      pointer-events: all;
      cursor: pointer;
    }
    
    .repost-icon {
      color: #FFFFFF;
      margin-top: 22px;
      font-size: 25px;
    }
  } 
`;

const Content = styled.div`
  width: 503px;

  @media (max-width: 614px) {
    width: calc(100% - 69px);
  }

  h1 {
    width: fit-content;
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

  input {
    width: 100%;
    border-radius: 7px;
    font-size: 14px;
    padding: 4px 9px;
    outline: 1px solid black;
    overflow-y: auto;
    overflow-wrap: break-word;
    color: #4c4c4c;
  }
`;

const Snippet = styled.div`
  width: 503px;
  height: 155px;
  border-radius: 11px;
  border: 1px solid #4d4d4d;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 614px) {
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

    @media (max-width: 614px) {
      width: calc(100% - 95px);
      padding: 7px 7px 8px 11px;
    }
  }

  h3 {
    height: 38px;
    font-size: 16px;
    line-height: 19px;
    color: #cecece;
    margin-bottom: 5px;
    word-break: break-all;
    overflow: hidden !important;

    @media (max-width: 614px) {
      height: 26px;
      font-size: 11px;
    }
  }

  h4 {
    height: 39px;
    font-size: 11px;
    line-height: 13px;
    color: #9b9595;
    margin-bottom: 13px;
    word-break: break-all;
    overflow: hidden !important;

    @media (max-width: 614px) {
      height: 42px;
      font-size: 9px;
    }
  }

  h5 {
    height: 13px;
    font-size: 11px;
    line-height: 13px;
    color: #cecece;
    word-break: break-all;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;

    @media (max-width: 614px) {
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

    @media (max-width: 614px) {
      width: 95px;
      height: 115px;
      object-fit: cover;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;

  .geolocation {
    margin-top: 3px;
    margin-left: 5px;
    color: white;
    cursor: pointer;

    @media (max-width: 614px) {
      margin-top: 1px;
    }
  }
`;

const RepostHeader = styled.header`
  width: 611px;
  height: 100px;
  font-size: 11px;
  color: white;
  background-color: #1E1E1E;
  border-radius: 16px;
  padding: 4px 0 0 13px;
  margin-bottom: -67px;

  @media (max-width: 614px) {
    width: 100vw;
    border-radius: 0;
  }

  div {
    display: flex;
    align-items: center;
  }

  .repost-icon-header {
    font-size: 25px;
    margin-right: 5px;
  }
`;