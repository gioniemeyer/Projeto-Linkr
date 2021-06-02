import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import Loading from "../Timeline/Loading";
import Trending from "../Trending/Trending";
import UserContext from "../../contexts/UserContext";
import Header from "../Header";
import { useParams } from "react-router-dom";
import PostClickedHashtag from "./PostClickedHashtag";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from 'react-loading';

export default function HashtagPage() {
  const [UserPosts, setUserPosts] = useState([]);
  const [enableLoading, setEnableLoading] = useState(true);
  const { userData } = useContext(UserContext);
  const localUser = JSON.parse(localStorage.getItem("user"));
  let params = useParams();
  const [name, setName] = useState("");
  const [LikedPosts, setLikedPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  if (name !== params.hashtag) {
    RenderPosts();
  }

  function RenderPosts() {
    const config = {
      headers: { Authorization: `Bearer ${userData.token || localUser.token}` },
    };
    const request = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${params.hashtag}/posts`,
      config
    );

    request.then((response) => {
      setUserPosts(response.data.posts);
      setEnableLoading(false);
      setName(params.hashtag);
    });

    request.catch((error) => {
      alert(
        "Houve uma falha ao obter os posts dessa hashtag, por favor, atualize a página."
      );
    });
  }

  function RenderLikes() {
    const config = {
      headers: { Authorization: `Bearer ${userData.token || localUser.token}` },
    };
    const requestLikeds = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/liked",
      config
    );
    requestLikeds.then((response) => setLikedPosts(response.data.posts));
  }

  function CreateLikedPosts() {
    const config = {
      headers: { Authorization: `Bearer ${userData.token || localUser.token}` },
    };
    const request = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/liked",
      config
    );

    request.then((response) => {
      setLikedPosts(response.data.posts);
      RenderPosts();
    });

    request.catch((error) => {
      alert("Houve uma falha ao obter os posts, por favor, atualize a página.");
      setEnableLoading(false);
    });
  }

  useEffect(() => {
    RenderLikes();
    CreateLikedPosts();
  }, [params]);

  function fetchData() {
    if (UserPosts.length >= 50) {
      setHasMore(false);
      return;
    }

    if (UserPosts.length !== 0) {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.token || localUser.token}`,
        },
      };

      const request = axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${params.hashtag}/posts?olderThan=${
            UserPosts[UserPosts.length - 1].id
          }`,
        config
      );

      request.then((response) => {
        setTimeout(() => {
          setUserPosts([...UserPosts, ...response.data.posts]);
          console.log(UserPosts);
        }, 500);
      });

      request.catch((error) => {
        alert("Algo deu errado com sua requisição, por favor, tente novamente");
      });
    }
  }

  return (
    <>
      <Header />
      <UserPostsBody>
      <InfiniteScroll
          dataLength={UserPosts.length}
          next={fetchData}
          hasMore={hasMore}
          loader={
            <div className="loading-posts">
              <ReactLoading
                type="spin"
                color="#6D6D6D"
                width={80}
                height={80}
              />
              <span>Loading more posts...</span>
            </div>
          }
          endMessage={
            <div className="loading-posts">
              <p className="end-message" style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all!</b>
              </p>
            </div>
          }
        >
        <UserPostsContainer>
          <PostsContainer>
            <Title># {name}</Title>

            {UserPosts.length === 0 && !enableLoading ? (
              <div className="no-post">Nenhum post encontrado :(</div>
            ) : (
              UserPosts.map((post, i) => (
                <PostClickedHashtag
                  LikedPosts={LikedPosts}
                  RenderLikes={RenderLikes}
                  RenderPosts={RenderPosts}
                  post={post}
                  key={i}
                />
              ))
            )}
            {enableLoading && <Loading />}
          </PostsContainer>
          <div className="trending">
            <Trending RenderPosts={RenderPosts} />
          </div>
        </UserPostsContainer>
        </InfiniteScroll>
      </UserPostsBody>
    </>
  );
}

const UserPostsBody = styled.div`
  display: flex;
  justify-content: center;
  background-color: #333333;

  @media (max-width: 614px) {
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }

  .loading-posts {
    width: 611px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    span, .end-message {
      margin-top: 16px;
      margin-bottom: 20px;
      font-size: 22px;
      letter-spacing: 0.05em;
      font-family: 'Lato';
      color: #6D6D6D;
    }
  }
`;

const UserPostsContainer = styled.div`
  width: 937px;
  display: flex;
  justify-content: space-between;
  font-family: "Lato";
  margin-top: 60px;

  min-height: 100vh;

  @media (max-width: 614px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }

  .no-post {
    font-size: 25px;
    color: #ffffff;
  }

  .trending {
    position: fixed;
    top: 208px;
    left: calc((100vw + 611px + 15px - 301px) / 2);

    @media (max-width: 900px) {
      display: none;
    }
  }
`;

const PostsContainer = styled.ul`
  width: 611px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 25px;

  @media (max-width: 614px) {
    width: 100%;
    align-items: flex-start;
    margin-right: 0;
  }
`;

const Title = styled.h1`
  font-family: "Oswald";
  font-weight: 700;
  font-size: 43px;
  color: #ffffff;
  margin: 60px 0 45px 0;

  @media (max-width: 614px) {
    margin: 50px 0 19px 17px;
    font-size: 33px;
  }
`;
