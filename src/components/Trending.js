import styled from "styled-components"
import Topic from "./Topic"
export default function Trending(){
    const TrendList=['javascript','react','react-native','material','web-dev','mobile','css','html','node','sql']
    return(
        <TrendingBox>
        <h1>
            trending
        </h1>
        {TrendList.map((e)=>{
            return  <Topic item={e}/>
        })}
        </TrendingBox>
    )
}

const TrendingBox=styled.div`
    background-color: #171717;
    width: 301px;
    height: 380px;
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
