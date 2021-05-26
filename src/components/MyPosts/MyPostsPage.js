import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import Post from "./Post";
import Loading from "../Timeline/Loading"

import Trending from "../Trending/Trending";
import UserContext from "../../contexts/UserContext";
import Header from "../Header"; 

export default function MyPostsPage() {
    const [MyPosts, setMyPosts] = useState([]);
    const [enableLoading, setEnableLoading] = useState(true);
    const [HashtagList, setHashtagList] = useState([]);
    const { user } = useContext(UserContext);
    const pessoa = JSON.parse(localStorage.getItem("user"));
    
  

    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${user.token || pessoa.token}` } };
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${pessoa.user.id || user.user.id}/posts`, config);

        request.then(response => {
            setMyPosts(response.data.posts);
            setEnableLoading(false);            
        });

        request.catch(error => {
            alert("Houve uma falha ao obter os seus posts, por favor, atualize a página.");
        });
    }, []);

    return(
        <>
        <Header />
            <MyPostsContainer>
                <PostsContainer>
                    <Title>my posts</Title>
                    {/* <NewPost /> */}
                    {MyPosts.length === 0 ? <div className="no-post">Nenhum post encontrado :(</div> : MyPosts.map((post, i) => <Post post={post} key={i} />)}
                    {enableLoading && <Loading />}
                </PostsContainer>
                <div className="trending">
                    <Trending />
                </div>
            </MyPostsContainer>
        </>
    );
}

const MyPostsContainer = styled.div`
    background-color: #333333;
    display: flex;
    justify-content: center;
    font-family: 'Lato';
    margin-top: 60px;
    height: 100vh;

    .no-post {
        font-size: 25px;
        color: #FFFFFF;
    }

    .trending {
        margin-top: 148px;
    }
`;

const PostsContainer = styled.ul`
    width: 611px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 25px;
`;

const Title = styled.h1`
    font-family: 'Oswald';
    font-size: 43px;
    color: #FFFFFF;
    margin: 60px 0 45px 0;
`;