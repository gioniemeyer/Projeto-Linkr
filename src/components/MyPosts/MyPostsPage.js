import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import Loading from "../Timeline/Loading"
import Trending from "../Trending/Trending";
import UserContext from "../../contexts/UserContext";
import Header from "../Header"; 
import PostClickedUser from "./PostClickedUser";

export default function MyPostsPage() {
    const [MyPosts, setMyPosts] = useState([]);
    const [enableLoading, setEnableLoading] = useState(true);
    const [HashtagList, setHashtagList] = useState([]);
    const { userData } = useContext(UserContext);
    const localUser = JSON.parse(localStorage.getItem("user"));
    
  function RenderPosts() {
    const config = { headers: { Authorization: `Bearer ${userData.token || localUser.token}` } };
    const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${localUser.user.id || userData.user.id}/posts`, config);

    request.then(response => {
        setMyPosts(response.data.posts);
        setEnableLoading(false);            
    });

    request.catch(error => {
        alert("Houve uma falha ao obter os seus posts, por favor, atualize a página.");
    });
  }

  useEffect(RenderPosts, []);

     return(
        <>
        <Header />
        <MyPostsBody>
            <MyPostsContainer>
                <PostsContainer>
                    <Title>my posts</Title>                    
                    {MyPosts.length === 0 && !enableLoading ? <div className="no-post">Nenhum post encontrado :(</div> : MyPosts.map((post, i) => <PostClickedUser RenderPosts={RenderPosts} post={post} key={i} />)}
                    {enableLoading && <Loading />}
                </PostsContainer>
                <div className="trending">
                    <Trending />
                </div>
            </MyPostsContainer>
        </MyPostsBody>
        </>
    );
}


const MyPostsBody = styled.div`
    display: flex;
    justify-content: center;
    background-color: #333333; 
       

    @media (max-width: 614px){
        flex-direction: column;
        align-items: center;
        margin-top: 50px;     
    }
`;

const MyPostsContainer = styled.div`
    width: 937px;
    display: flex;
    justify-content: space-between;
    font-family: 'Lato';
    margin-top: 60px;   
    min-height: 100vh;     

    @media (max-width: 614px){
        width: 100%;
        flex-direction: column;
        align-items: center;
    }

    .no-post {
        font-size: 25px;
        color: #FFFFFF;
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

    @media (max-width: 614px){
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
        margin: 25px 0 19px 17px;
        font-size: 33px;
    }
`;