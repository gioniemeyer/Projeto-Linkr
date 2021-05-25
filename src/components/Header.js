import styled from "styled-components";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import logo from "../images/logo.png";
import ClickAwayListener from 'react-click-away-listener';
import { Link } from "react-router-dom";

export default function Header() {  
  const [open, setOpen] = useState(false);
 
	function handleClickAway () {
		setOpen(false);
	};    

  return (    
   <>
      <Container>      
        <Title>linkr</Title>        
        <RightSide>
          {open ? (               
            <Button>
              <IoIosArrowDown />
            </Button>            
          ) : (
            <Button onClick={() => setOpen(true)}>
              <IoIosArrowUp />
            </Button>
          )}
          {open ? (
            <UserPicture>
              <img src={logo} alt="userimage"></img>
            </UserPicture>
          ) : (
            <UserPicture onClick={() => setOpen(true)}>
              <img src={logo} alt="userimage"></img>
            </UserPicture>
          )}
        </RightSide>             
      </Container>
      {open ? (
           <ClickAwayListener onClickAway={handleClickAway}>
                <Menu>
                <LinksWrapper>
                <Link to="/my-posts"><span onClick={() => setOpen(false)}>My posts</span></Link>                    
                <Link to="/my-likes"><span onClick={() => setOpen(false)}>My likes</span></Link>
                <Link to="/"><span onClick={() => setOpen(false)}>Logout</span></Link>
                </LinksWrapper>
                </Menu>
            </ClickAwayListener>
      ) : (
        ""
      )}    
    </>
  );
}

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
  }
`;

const RightSide = styled.div`
  background-color: #151515;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 110px;
`;

const Title = styled.div`
  color: #fff;
  width: 108px;
  height: 54px;
  font-size: 50px;
  padding-left: 28px;
  font-family: 'Passion One';
  line-height: 53.95px;

  @media (max-width: 600px) {
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

    @media (max-width: 600px) {
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
    padding: 15px;
    font-family: 'Lato';
    line-height: 20.4px;

    @media (max-width: 600px) {
      font-size: 15px;    
      padding: 13px;  
    }
  }`;
