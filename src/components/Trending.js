import styled from "styled-components"
export default function Trending(){
    return(
        <TrendingBox>
        <h1>
            trending
        </h1>
        <Topics>
            # javascript
        </Topics>
        <Topics>
            # javascript
        </Topics>
        </TrendingBox>
    )
}

const TrendingBox=styled.div`
    background-color: #171717;
    width: 301px;
    height: 406px;
    border-radius: 16px;
    
    h1{
        color: #ffffff;
        font-size: 27px;
        padding-left: 16px;
        padding-top: 9px;
        border-bottom: 1px solid #484848;
        padding-bottom: 12px;
        font-family: 'Oswald', sans-serif;
    }
`
const Topics=styled.ul`
    color: #ffffff;
    font-size: 19px;
    font-family: 'Lato', sans-serif;
    padding-left: 16px;
    padding-bottom: 10px;
    font-weight: 700;
    letter-spacing: 0.05em;
    :first-of-type{
        padding-top: 22px;
    }
`