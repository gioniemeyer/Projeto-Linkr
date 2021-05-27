import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import Loading from "../Timeline/Loading"
import Trending from "../Trending/Trending";
import UserContext from "../../contexts/UserContext";
import Header from "../Header"; 
import { useParams } from 'react-router-dom';
import PostClickedHashtag from "./PostClickedHashtag";


export default function HashtagPage() {
    const [UserPosts, setUserPosts] = useState([]);
    const [enableLoading, setEnableLoading] = useState(true);    
    const { userData } = useContext(UserContext);
    const localUser = JSON.parse(localStorage.getItem("user"));    
    const params = useParams(); 
    const [name, setName] = useState("");

    if (name !== params.hashtag) {
       getHashtagPosts(); 
    } 


    function getHashtagPosts() {
        const config = { headers: { Authorization: `Bearer ${localUser.token || userData.token}` } };
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${params.hashtag}/posts`, config);
        
        request.then(response => {
            setUserPosts(response.data.posts);
            setEnableLoading(false);               
            setName(params.hashtag);                                        
        });    
        
        request.catch(error => {
            alert("Houve uma falha ao obter os posts dessa hashtag, por favor, atualize a página.");
        });

    }
    
    useEffect(getHashtagPosts, []);


    return(
        <>
        <Header />
        <UserPostsBody>
            <UserPostsContainer>
                <PostsContainer>
                    <Title># {name}</Title>                   

                    {UserPosts.length === 0 && !enableLoading ? <div className="no-post">Nenhum post encontrado :(</div> : UserPosts.map((post, i) => <PostClickedHashtag post={post} key={i} />)}
                    {enableLoading && <Loading />}
                </PostsContainer>
                <div className="trending">
                    <Trending getHashtagPosts={getHashtagPosts} />

                </div>
            </UserPostsContainer>
        </UserPostsBody>
        </>
    );
}

const UserPostsBody = styled.div`
    display: flex;
    justify-content: center;
    background-color: #333333;  

    @media (max-width: 614px){
        flex-direction: column;
        align-items: center;
    }
`;

const UserPostsContainer = styled.div`
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

        @media (max-width: 614px){
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
        margin: 50px 0 19px 17px;
        font-size: 33px;
    }
`;