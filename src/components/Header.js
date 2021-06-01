import styled from "styled-components";
import { useState, useContext } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import ClickAwayListener from 'react-click-away-listener';
import { Link, useHistory } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { IoIosSearch } from "react-icons/io";
import {DebounceInput} from 'react-debounce-input';
import axios from 'axios';
export default function Header() {  
  const [open, setOpen] = useState(false);
  const { userData } = useContext(UserContext);	  
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const localUser = JSON.parse(localStorage.getItem("user"));

  function goToTimeline() {   
    history.push("/timeline")
  }

  function renderUsers(e) {
    setName(e.target.value);
    const config = { headers: { Authorization: `Bearer ${userData.token || localUser.token}` } };

    const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/search?username=${name}`, config)
    request.then(resp => {
      setUsers(resp.data.users);
    });
  }
console.log(users)
  return (    
   <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Body>

      <Container>      
        <Title onClick={goToTimeline}>linkr</Title>
        <Search>
          <DebounceInput
            minLength={2}
            placeholder='Search for people and friends'
            debounceTimeout={300}
            value={name}
            onChange={renderUsers} />

            <ul>

              {users.length > 0 ? (
                users.map(u => {          
                return(
                <li key={u.id}>
                  <Link to={`user/${u.id}`}>
                  <img src={u.avatar}></img>
                  </Link>
                  <Link to={`user/${u.id}`}>
                  <p>{u.username}</p>
                  </Link>

                </li>)
                })
              ) : ''}

            </ul>


            {/* <ButtonSearch>
              <IoIosSearch />
            </ButtonSearch> */}
            
            {/* <UserDiv>
                <p>teste</p>
              </UserDiv>
            
            */}
        </Search>
        <RightSide>
          {open ? (          
            <Button onClick={() => setOpen(false)}>
              <IoIosArrowDown />
            </Button>            
          ) : (
            <Button onClick={() => setOpen(true)}>
              <IoIosArrowUp />
            </Button>
          )}
          {open ? (
            <UserPicture onClick={() => setOpen(false)}>
              <img src={localUser.user.avatar || userData.user.avatar} alt="userimage"></img>
            </UserPicture>
          ) : (
            <UserPicture onClick={() => setOpen(true)}>
              <img src={localUser.user.avatar || userData.user.avatar} alt="userimage"></img>
            </UserPicture>
          )}
        </RightSide>                     
      
        {open ? (           
                <Menu>                   
                    <LinksWrapper>
                        <Link to="/my-posts"><span onClick={() => setOpen(false)}>My posts</span></Link>                    
                        <Link to="/my-likes"><span onClick={() => setOpen(false)}>My likes</span></Link>
                        <Link to="/"><span onClick={() => setOpen(false)}>Logout</span></Link>
                    </LinksWrapper>                    
                </Menu>
        ) : ""} 
      </Container>
      </Body>

      </ClickAwayListener> 
  );
}

const Body = styled.div`
  position: relative;
`
const Container = styled.div`
  background: #151515;
  width: 100vw;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 6;

  @media (max-width: 614px) {
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  }
`;

const Menu = styled.div`
  width: 150px;
  height: 109px;
  position: fixed;
  top: 72px;
  right: 0;
  z-index: 8;
  background: #171717;
  border-radius: 0px 0px 0px 20px;

  @media (max-width: 600px) {
    height: 97px;    
    padding: 0px;
    right: 0px;
  }
`;

const RightSide = styled.div`
  background-color: #151515;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 110px;
  margin-right: 15px;
`;

const Title = styled.div`
  color: #fff;
  width: 108px;
  height: 54px;
  font-size: 50px;
  padding-left: 28px;
  font-family: 'Passion One';
  line-height: 53.95px;
  cursor: pointer;

  @media (max-width: 614px) {
    width: 99px;
    height: 45px;
    font-size: 45px;
    line-height: 49.55px;
  }
`;

const UserPicture = styled.div`
  width: 53px;
  height: 53px;
  border-radius: 100px;
  background: white;
  margin-right: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 53px;
    border-radius: 100px;
    padding: 0px;
  }

  @media (max-width: 600px) {
    width: 44px;
    height: 44px;
  }
`;

const Button = styled.button`
  width: 39px;
  height: 33px;
  background-color: #151515;
  border: none;

  img {
    width: 19px;
    height: 13px;
    color: white;

    @media (max-width: 614px) {
      width: 15px;
      height: 10px;
    }
  }

  svg {
    background-color: transparent;
    color: #fff;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    margin: auto auto;
  }
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: gray;
  align-items: center;
  justify-content: center;

  span, a {
    height: 20px;
    color: #ffffff;
    size: 17px;
    padding: 3px;
    font-family: 'Lato';
    line-height: 20.4px;
    margin: 5px;    

    @media (max-width: 614px) {
      font-size: 15px;    
      padding: 0px;  
    }
  }`;

const Search = styled.div`
  width: 30vw;
  background-color: #FFFFFF;
  border-radius: 8px;
  border: none;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 7px;
  right: 35vw;
  font-family: 'Lato';

  input{
    width: 30vw;
    height: 60px;
    border-radius: 8px;
    border: none;
  }
  textarea:focus, input:focus, select:focus {
    outline: 0;
  }


  li {
    background-color: #e7e7e7;
    height: 50px;
    display: flex;
    align-items: center;
  }
  
  li:last-child{
  border-radius: 8px;
  }

  img {
    width: 39px;
    height: 39px;
    border-radius: 50%;
    margin: 0 5px 0 5px;
  }

  @media (max-width: 614px) {
    position: absolute;
    width: 95vw;
    top:80px;
    left: 2.5vw;
    }
`

// const ButtonSearch = styled.button`

//   background-color: transparent;
//   border: none;

// svg {
//     background-color: transparent;
//     color: #c6c6c6;
//     border-radius: 5px;
//     width: 100%;
//     height: 100%;
//     margin: auto auto;
//   }
// `