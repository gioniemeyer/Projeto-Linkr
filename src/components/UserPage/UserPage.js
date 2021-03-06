import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import Loading from "../Timeline/Loading";
import Trending from "../Trending/Trending";
import UserContext from "../../contexts/UserContext";
import Header from "../Header";
import { useParams } from "react-router-dom";
import PostClickedUser from "../MyPosts/PostClickedUser";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from "react-loading";
import "../../styles/infinitescroll-styles.css";

export default function UserPage() {
  const [UserPosts, setUserPosts] = useState([]);
  const [enableLoading, setEnableLoading] = useState(true);
  const { userData } = useContext(UserContext);
  const localUser = JSON.parse(localStorage.getItem("user"));
  let params = useParams();
  const [name, setName] = useState("");
  const [following, setFollowing] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [disabler, setDisabler] = useState(false);
  const [LikedPosts, setLikedPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  function RenderPosts() {
    if(UserPosts.length===0){
    const config = {
      headers: { Authorization: `Bearer ${userData.token || localUser.token}` },
    };
    const request = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${params.id}/posts`,
      config
    );

    request.then((response) => {
      setUserPosts(response.data.posts);
      setEnableLoading(false);
    });

    request.catch((error) => {
      alert(
        "Houve uma falha ao obter os posts dessa hashtag, por favor, atualize a página."
      );
    });}
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
    window.scrollTo(0, 0);
    RenderLikes();
    CreateLikedPosts();
    RenderPosts();
  }, []);

  function Follow() {
    const body = [];
    const config = {
      headers: { Authorization: `Bearer ${localUser.token || userData.token}` },
    };
    setDisabler(true);
    if (!enabled) {
      const req = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${params.id}/follow`,
        body,
        config
      );
      req.then(() => {
        setDisabler(false);
        setEnabled(true);
      });
      req.catch(() => alert("erro ao executar a operação aa"));
    } else {
      const reque = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${params.id}/unfollow`,
        body,
        config
      );
      reque.then(() => {
        setDisabler(false);
        setEnabled(false);
      });
      reque.catch(() => alert("erro ao executar a operação b"));
    }
  }

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${localUser.token || userData.token}` },
    };
    const retest = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows`,
      config
    );
    retest.then((r) => setFollowing(r.data));
  }, []);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${localUser.token || userData.token}` },
    };
    const request = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${params.id}/posts`,
      config
    );
    const promise = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${params.id}`,
      config
    );
    request.then((response) => {
      setUserPosts(response.data.posts);
      setEnableLoading(false);
    });
    promise.then((r) => setName(r.data.user.username));
    request.catch((error) => {
      alert(
        "Houve uma falha ao obter os posts desse usuário, por favor, atualize a página."
      );
    });
    const retest = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows`,
      config
    );
    retest.then((r) => setFollowing(r.data));
  }, [params]);

  function teste() {
    if (following.users) {
      for (let i = 0; i < following.users.length; i++) {
        if (following.users[i].id == params.id) {
          setEnabled(true);
        }
      }
    }
  }
  useEffect(teste, [following.users]);

  function fetchData() {
    if (UserPosts.length >= 500) {
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
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${
          params.id
        }/posts?olderThan=${UserPosts[UserPosts.length - 1].id}`,
        config
      );

      request.then((response) => {
        if (response.data.posts.length < 10) {
          setHasMore(false);
        }
        setTimeout(() => {
          setUserPosts([...UserPosts, ...response.data.posts]);
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
        dataLength={UserPosts.length}
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
        <UserPostsBody>
            <UserPostsContainer>
                <PostsContainer habilitado={enabled}>
                    <Title>{name}'s posts</Title>   
                    <FollowButton onClick={Follow} disabled={disabler} habilitado={enabled}>
                    {enabled?'Unfollow':'Follow'}
                    </FollowButton>
                    {UserPosts.length === 0 && !enableLoading ? <div className="no-post">Nenhum post encontrado :(</div> : UserPosts.map((post, i) => <PostClickedUser RenderLikes={RenderLikes} RenderPosts={RenderPosts} post={post} key={i} MyPosts={UserPosts}/>)}
                    {enableLoading && <Loading />}
                </PostsContainer>
              
                
                <div className="trending">
                    <Trending />
                    
                </div>
            </UserPostsContainer>
        </UserPostsBody>
      </InfiniteScroll>
    </>
  );
}

const FollowButton = styled.button`
  color: ${(props) => (props.habilitado ? " #1877F2" : " #FFFFFF")};
  background-color: ${(props) => (props.habilitado ? " #FFFFFF" : " #1877F2")};
  width: 110px;
  position: fixed;
  top: 141px;
  left: calc((100vw + 611px + 301px - 210px) / 2);
  @media (max-width: 920px) {
    position: inherit;
    margin: 0px 0 19px 0px;
  }
  @media (max-width: 614px) {
    margin: 0px 0 19px 30px;
  }
  @media (max-width: 330px) {
    margin: 0px auto 19px auto;
  }
`;
const UserPostsBody = styled.div`
  display: flex;
  justify-content: center;
  background-color: #333333;
  position: relative;
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
    margin: 50px 0 19px 30px;
    font-size: 33px;
  }
  @media (max-width: 330px) {
    margin: 50px auto 19px auto;
  }
`;
