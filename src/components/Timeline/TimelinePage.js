import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import Post from "./Post";
import Loading from "./Loading";
import NewPost from "./NewPost";
import Trending from "../Trending/Trending";
import UserContext from "../../contexts/UserContext";
import Header from "../Header";

export default function Timeline() {
  
  const [TimelinePosts, setTimelinePosts] = useState([]);
  const [enableLoading, setEnableLoading] = useState(false);
  const { userData } = useContext(UserContext);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [LikedPosts, setLikedPosts] = useState([]);

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

  function RenderPosts() {
    const config = {
      headers: { Authorization: `Bearer ${userData.token || localUser.token}` },
    };
    const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts",
      config
    );
    request.then((response) => {
      console.log(response.data)
      setTimelinePosts(response.data.posts);
      setEnableLoading(false);
    })
    request.catch(() => {
        alert("Houve uma falha ao obter os posts, por favor, atualize a página.");
    })
    ;
  }


  
  function CreateLikedPosts() {
    const config = { headers: { Authorization: `Bearer ${userData.token || localUser.token}` } };
    const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/liked", config);

    request.then(response => {
        setLikedPosts(response.data.posts);

        RenderPosts();
    });

    request.catch(error => {
        alert("Houve uma falha ao obter os posts, por favor, atualize a página.");
        setEnableLoading(false);
    });
}
  
  useEffect(() => {
    RenderPosts();
    RenderLikes();
    CreateLikedPosts()
  }, []);



  return (
    <>
      <Header />
      <TimelineBody>
        <TimelineContainer>
          <TimelinePostsContainer>
            <Title>timeline</Title>
            <NewPost RenderPosts={RenderPosts} />
            {TimelinePosts.length === 0 && !enableLoading ? (
              <div className="no-post">Nenhum post encontrado :(</div>
            ) : (
              TimelinePosts.map((post, i) => (
                <Post
                  post={post}
                  TimelinePosts={TimelinePosts}
                  setLikedPosts={setLikedPosts}
                  LikedPosts={LikedPosts}
                  key={i}
                  RenderLikes={RenderLikes}
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
    </>
  );
}

const TimelineBody = styled.div`
  display: flex;
  justify-content: center;
  background-color: #333333;
  min-height: 100vh;
  @media (max-width: 614px) {
    flex-direction: column;
    align-items: center;
  }
`;
const TimelineContainer = styled.div`
  width: 937px;
  display: flex;
  justify-content: space-between;
  font-family: "Lato";
  margin-top: 60px;
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
    font-family: 'Oswald';
    font-weight: 700;
    font-size: 43px;
    color: #FFFFFF;
    margin: 60px 0 45px 0;

    @media (max-width: 614px){
        margin: 35px 0 19px 17px;
        font-size: 33px;
    }
`
