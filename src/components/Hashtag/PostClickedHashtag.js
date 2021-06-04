import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { useState, useContext, useRef, useEffect } from "react";
import Hashtag from "../Timeline/Hashtag";
import { Link, useHistory, useParams } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { FaTrash } from "react-icons/fa";
import Modal from "../Modal";
import axios from "axios";
import { AiFillHeart } from "react-icons/ai";
import ReactTooltip from "react-tooltip";
import { FaPencilAlt } from "react-icons/fa";
import getYouTubeID from "get-youtube-id";
import SnippetDiv from "../Timeline/SnippetDiv";
import GeolocationModal from "../GeolocationModal";
import { IoLocationSharp } from "react-icons/io5";
import ModalLink from "../ModalLink";

export default function PostClickedHashtag({ post, RenderPosts, RenderLikes }) {
  const { id, text, link, linkTitle, linkDescription, linkImage, user } = post;
  const history = useHistory();
  const params = useParams();
  const localUser = JSON.parse(localStorage.getItem("user"));
  const { userData } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [control, setControl] = useState(false);
  const [newText, setNewText] = useState(text);
  const [disabler, setDisabler] = useState(false);
  const inputRef = useRef();
  const idVideo = getYouTubeID(link);
  const [geoModalOpen, setGeoModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState();
  const [likesQty, setLikesQty] = useState(post.likes.length);
  const [likes, setLikes] = useState(post.likes);
  const [modalLink, setModalLink] = useState(false);

  useEffect(() => {
    likes.forEach((like, i) => {
      setLikes([...likes], like.username = like['user.username']);
    });
  }, []);

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

  useEffect(() => {
    if (control) {
      inputRef.current.focus();
    }
    setNewText(text);
  }, [control]);

  function ShowEdit() {
    if (control) {
      setControl(false);
      return;
    } else {
      setControl(true);
    }
  }

  function Edit(event) {
    event.preventDefault();
    setDisabler(true);
    const body = {
      text: newText,
    };
    const config = {
      headers: { Authorization: `Bearer ${userData.token || localUser.token}` },
    };
    const request = axios.put(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}`,
      body,
      config
    );
    request.then((response) => {
      setDisabler(false);
      setControl(false);
      RenderPosts();
    });

    request.catch(() => {
      alert("Não foi possível salvar as alterações");
      setDisabler(false);
    });
  }

  return (
    <PostBox>
      
    <ModalLink modalLink={modalLink} setModalLink={setModalLink} postID={id} link={link} linkTitle={linkTitle} />
    <SideMenu isLiked={isLiked}>
        <Link to={`/user/${user.id}`}>
          <img src={user.avatar} alt="Imagem de avatar do usuário" />
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
                  ? `Você, ${likes[0]['username']} e outras ${
                      likes.length - 2
                    } pessoas`
                  : `${likes[0]['username']}, ${
                      likes[1]['username']
                    } e outras ${likes.length - 2} pessoas`
                : isLiked
                ? `Você e ${
                    localUser.user.username === likes[0]['username']
                      ? likes[1]['username']
                      : likes[0]['username']
                  } curtiram`
                : `${likes[0]['username']} e ${likes[1]['username']} curtiram`
              : isLiked
              ? `Você curtiu`
              : `${likes[0]['username']} curtiu`
          }
        >
          {likesQty} {likesQty === 1 || likesQty === 0 ? "like" : "likes"}
        </span>
        <ReactTooltip place="bottom" type="light" effect="float" />
      </SideMenu>
      <Content>
        <h1 onClick={() => history.push(`/user/${user.id}`)}>
          {user.username}
          {post.geolocation && (
            <IoLocationSharp
              onClick={(e) => {
                e.stopPropagation();
                setGeoModalOpen(true);
              }}
              className="geolocation"
            />
          )}
        </h1>
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
            <Hashtag text={text} />
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
    color: ${(props) => (props.isLiked ? "#AC0000" : "#BABABA")};
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

    .geolocation {
      padding-top: 3px;
      cursor: pointer;
      margin-left: 3px;
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
