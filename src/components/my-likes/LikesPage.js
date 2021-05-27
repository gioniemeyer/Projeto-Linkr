import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import Trending from "../Trending/Trending";
import Loading from "../Timeline/Loading";
import Post from "../Timeline/Post";
import UserContext from "../../contexts/UserContext";
import Header from "../Header";
import PostMyLikes from "./PostMyLikes";

export default function LikesPage() {
    const [enableLoading, setEnableLoading] = useState(false);
    const [likedPosts, setLikedPosts] = useState([]);

    const localUser = JSON.parse(localStorage.getItem("user"));
    const {userData} = useContext(UserContext);

    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${userData.token || localUser.token}` } };
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/liked", config);

        request.then(response => {
            setLikedPosts(response.data.posts);
            setEnableLoading(false);
            console.log(userData);
        });

        request.catch(error => {
            alert("Houve uma falha ao obter os posts, por favor, atualize a página.");
            setEnableLoading(false);
        });
    }, []);

    return(
        <>
        <Header />
        <TimelineBody>
            <TimelineContainer>
                <TimelinePostsContainer>
                    <Title>my likes</Title>
                    {
                        likedPosts.length === 0 && !enableLoading
                        ? <div className="no-post">Nenhum post encontrado :(</div> 
                        : likedPosts.map((post, i) => <PostMyLikes post={post} key={i}         
                          setLikedPosts={setLikedPosts}
                          likedPosts={likedPosts}
                          />)
                    }
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
    @media (max-width: 614px) {
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
`