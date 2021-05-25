import styled from "styled-components"
export default function Topic({item}){
    return(
        <Topics>
            # {item}
        </Topics>
    )
}

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