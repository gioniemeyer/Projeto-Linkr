import styled from "styled-components"
import Topic from "./Topic"
import UserContext from "../../contexts/UserContext";
import { useEffect, useState, useContext } from "react";
import axios from "axios"
export default function Trending({ getHashtagPosts }){
    const { userData } = useContext(UserContext);
    const [topicList, setTopicList]=useState(0)
    const pessoa = JSON.parse(localStorage.getItem("user"));
    const TrendList=['javascript','react','react-native','material','web-dev','mobile','css','html','node','sql']
    
   
    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${userData.token || pessoa.token}` } };
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/trending`, config);
       
        request.then(response => {
            setTopicList(response.data.hashtags);                      
        });

        request.catch(error => {
            
        });
    }, []);

    

    return(
        <TrendingBox>
        <h1>
            trending
        </h1>
        {topicList? topicList.map((e,i)=><Topic onClick={getHashtagPosts} item={e} key={i}/>):''}
        
        </TrendingBox>
    )
}

const TrendingBox=styled.div`
    background-color: #171717;
    width: 301px;
    padding-bottom: 14px;
    border-radius: 16px;
    
    h1{
        color: #ffffff;
        font-size: 27px;
        padding-left: 16px;
        padding-top: 9px;
        border-bottom: 1px solid #484848;
        padding-bottom: 12px;
        font-family: 'Oswald', sans-serif;
        margin-bottom: 22px;
    }
`
