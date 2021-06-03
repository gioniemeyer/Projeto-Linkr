import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import Loading from "../Timeline/Loading";
import Trending from "../Trending/Trending";
import UserContext from "../../contexts/UserContext";
import Header from "../Header";
import PostClickedUser from "./PostClickedUser";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from 'react-loading';

export default function MyPostsPage() {
  const [MyPosts, setMyPosts] = useState([]);
  const [enableLoading, setEnableLoading] = useState(true);
  const [HashtagList, setHashtagList] = useState([]);
  const { userData } = useContext(UserContext);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [LikedPosts, setLikedPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  function RenderPosts() {
    const config = {
      headers: { Authorization: `Bearer ${userData.token || localUser.token}` },
    };
    const request = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${
        localUser.user.id || userData.user.id
      }/posts`,
      config
    );

    request.then((response) => {
      setMyPosts(response.data.posts);
      setEnableLoading(false);
    });

    request.catch((error) => {
      alert(
        "Houve uma falha ao obter os seus posts, por favor, atualize a página."
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
    RenderPosts();
    RenderLikes();
    CreateLikedPosts();
  }, []);

  function fetchData() {
    if (MyPosts.length >= 500) {
      setHasMore(false);
      return;
    }

    if (MyPosts.length !== 0) {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.token || localUser.token}`,
        },
      };

      const request = axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${
          localUser.user.id || userData.user.id
        }/posts?olderThan=${
          MyPosts[MyPosts.length - 1].id
        }`,
        config
      );

      request.then((response) => {
        if(response.data.posts.length < 10) {
          setHasMore(false);
        }
        setTimeout(() => {
          setMyPosts([...MyPosts, ...response.data.posts]);
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
      <MyPostsBody>
      <InfiniteScroll
          dataLength={MyPosts.length}
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
        <MyPostsContainer>
          <PostsContainer>
            <Title>my posts</Title>
            {MyPosts.length === 0 && !enableLoading ? (
              <div className="no-post">Nenhum post encontrado :(</div>
            ) : (
              MyPosts.map((post, i) => (
                <PostClickedUser
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
            <Trending />
          </div>
        </MyPostsContainer>
        </InfiniteScroll>
      </MyPostsBody>
    </>
  );
}

const MyPostsBody = styled.div`
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

const MyPostsContainer = styled.div`
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
    margin: 25px 0 19px 17px;
    font-size: 33px;
  }
`;
