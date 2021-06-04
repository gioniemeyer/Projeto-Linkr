import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import Trending from "../Trending/Trending";
import Loading from "../Timeline/Loading";
import LikedPost from "./LikedPost";
import UserContext from "../../contexts/UserContext";
import Header from "../Header";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from "react-loading";
import "../../styles/infinitescroll-styles.css";

export default function LikesPage() {
  const [enableLoading, setEnableLoading] = useState(false);
  const [LikedPosts, setLikedPosts] = useState([]);
  const { userData } = useContext(UserContext);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [TimelinePosts, setTimelinePosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  function RenderPosts() {
    if(LikedPosts.length===0){
    const config = {
      headers: { Authorization: `Bearer ${userData.token || localUser.token}` },
    };
    const request = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/liked",
      config
    );

    request.then((response) => {
      setLikedPosts(response.data.posts);
    });

    request.catch((error) => {
      alert("Houve uma falha ao obter os posts, por favor, atualize a página.");
      setEnableLoading(false);
    });}
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    RenderPosts();
  }, []);

  function fetchData() {
    if (LikedPosts.length >= 500) {
      setHasMore(false);
      return;
    }

    if (LikedPosts.length !== 0) {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.token || localUser.token}`,
        },
      };

      const request = axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/liked?olderThan=${
          LikedPosts[LikedPosts.length - 1].id
        }`,
        config
      );

      request.then((response) => {
        if (response.data.posts.length < 10) {
          setHasMore(false);
        }
        setTimeout(() => {
          setLikedPosts([...LikedPosts, ...response.data.posts]);
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
      <InfiniteScroll
        dataLength={LikedPosts.length}
        next={fetchData}
        hasMore={hasMore}
        loader={
          <div className="loading-posts">
            <ReactLoading type="spin" color="#6D6D6D" width={80} height={80} />
            <span className="loading-text">Loading more posts...</span>
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
        <TimelineBody>
          <TimelineContainer>
            <TimelinePostsContainer>
              <Title>my likes</Title>
              {LikedPosts.length === 0 && !enableLoading ? (
                <div className="no-post">Nenhum post encontrado :(</div>
              ) : (
                LikedPosts.map((post, i) => (
                  <LikedPost
                    post={post}
                    key={i}
                    setLikedPosts={setLikedPosts}
                    LikedPosts={LikedPosts}
                    TimelinePosts={TimelinePosts}
                    RenderPosts={RenderPosts}
                  />
                ))
              )}
              {enableLoading && <Loading />}
            </TimelinePostsContainer>
            <div className="trending">
              <Trending />
            </div>
          </TimelineContainer>
        </TimelineBody>
      </InfiniteScroll>
    </>
  );
}

const TimelineBody = styled.div`
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

    span,
    .end-message {
      margin-top: 16px;
      margin-bottom: 20px;
      font-size: 22px;
      letter-spacing: 0.05em;
      font-family: "Lato";
      color: #6d6d6d;
    }
  }
`;
const TimelineContainer = styled.div`
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
const TimelinePostsContainer = styled.ul`
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
    margin: 25px 0 19px 17px;
    font-size: 33px;
  }
`;
