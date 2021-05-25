import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Post from "./Post";
import Loading from "./Loading";
import NewPost from "./NewPost";

export default function Timeline() {
    const [TimelinePosts, setTimelinePosts] = useState([
        {
            "id": 2,
            "text": "Never Gonna Give You Up #rickroll",
            "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            "linkTitle": "Rick Astley - Never Gonna Give You Up (Video)",
            "linkDescription": "Rick Astley's official music video for “Never Gonna Give You Up” Listen to Rick Astley: https://RickAstley.lnk.to/_listenYDSubscribe to the official Rick Ast...",
            "linkImage": "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
            "user": {
                "id": 1,
                "username": "teste",
                "avatar": "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/1/avatar"
            },
            "likes": [
                {
                    "id": 1,
                    "userId": 1,
                    "postId": 2,
                    "createdAt": "2021-05-24T18:55:37.544Z",
                    "updatedAt": "2021-05-24T18:55:37.544Z",
                    "user.id": 1,
                    "user.username": "teste"
                }
            ]
        }
    ]);
    const [enableLoading, setEnableLoading] = useState(true);

    console.log(TimelinePosts);

    // useEffect(() => {
    //     const config = { headers: { Authorization: "Bearer token" } };
    //     const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts", config);

    //     request.then(response => {
    //         setTimelinePosts(response.data);
    //         setEnableLoading(false);
    //     })

    //     request.catch(error => {
    //         alert("Houve uma falha ao obter os posts, por favor, atualize a página.");
    //     })
    // }, [])

    return(
        <>
            <Header />
            <TimelineContainer>
                <TimelinePostsContainer>
                    <Title>timeline</Title>
                    {/* <NewPost /> */}
                    {TimelinePosts.length === 0 ? <div className="no-post">Nenhum post encontrado :(</div> : TimelinePosts.map((post, i) => <Post post={post} key={i} />)}
                    {enableLoading && <Loading />}
                    {/* <Loading /> */}
                </TimelinePostsContainer>
            </TimelineContainer>
        </>
    );
}

const TimelineContainer = styled.div`
    background-color: #333333;
    display: flex;
    justify-content: center;
    font-family: 'Lato';

    .no-post {
        font-size: 25px;
        color: #FFFFFF;
    }
`;

const TimelinePostsContainer = styled.ul`
    width: 611px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Header = styled.header`
    width: 100%;
    height: 72px;
    background-color: #151515;
`;

const Title = styled.h1`
    font-family: 'Oswald';
    font-size: 43px;
    color: #FFFFFF;
    margin: 60px 0 45px 0;
`;