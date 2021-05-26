import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import Post from "./Post";
import Loading from "./Loading";
import NewPost from "./NewPost";
import Trending from "../Trending/Trending";
import UserContext from "../../contexts/UserContext";

export default function Timeline() {
    const [TimelinePosts, setTimelinePosts] = useState([]);
    const [enableLoading, setEnableLoading] = useState(true);
    const [HashtagList, setHashtagList] = useState([]);
    const { userData } = useContext(UserContext);
    const pessoa = JSON.parse(localStorage.getItem("user"));
    console.log(userData.token)
   
    

    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${userData.token || pessoa.token}` } };
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts", config);

        request.then(response => {
            setTimelinePosts(response.data.posts);
            setEnableLoading(false);
            console.log(response.data);
        });

        request.catch(error => {
            alert("Houve uma falha ao obter os posts, por favor, atualize a página.");
        });
    }, []);

    return(
        <>
            <TimelineContainer>
                <TimelinePostsContainer>
                    <Title>timeline</Title>
                    {/* <NewPost /> */}
                    {TimelinePosts.length === 0 ? <div className="no-post">Nenhum post encontrado :(</div> : TimelinePosts.map((post, i) => <Post post={post} key={post.id} />)}
                    {enableLoading && <Loading />}
                </TimelinePostsContainer>
                <div className="trending">
                    <Trending />
                </div>
            </TimelineContainer>
        </>
    );
}

const TimelineContainer = styled.div`
    background-color: #333333;
    display: flex;
    justify-content: center;
    font-family: 'Lato';
    margin-top: 60px;

    .no-post {
        font-size: 25px;
        color: #FFFFFF;
    }

    .trending {
        margin-top: 148px;
    }
`;

const TimelinePostsContainer = styled.ul`
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