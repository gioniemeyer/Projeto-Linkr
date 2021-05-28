import SignInPage from './SignIn/SignInPage'
import HomePage from './Home/HomePage'
import UserContext from '../contexts/UserContext';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { useState } from "react";
import TimelinePage from "./Timeline/TimelinePage";
import Header from './Header';
import Trending from "./Trending/Trending";
import MyPostsPage from './MyPosts/MyPostsPage';
import UserPage from './UserPage/UserPage';
import HashtagPage from './Hashtag/HashtagPage';
import LikesPage from './MyLikes/LikesPage';


export default function App() {
  const [userData, setUserData] = useState('');

  return (
    <BrowserRouter>
      <UserContext.Provider value={{userData, setUserData}}>
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>
          <Route path='/sign-up' exact>
            <SignInPage />
          </Route>    
          <Route path='/timeline' exact>
            <TimelinePage />
          </Route>          
          <Route path='/trending' exact>
            <Header />
            <Trending />
          </Route>
          <Route path='/my-likes' exact>
            <Header />
            <LikesPage />
          </Route>
          <Route path='/my-posts' exact>
            <Header />            
            <MyPostsPage />
          </Route> 
          <Route path='/user/:id' exact>
            <Header />            
            <UserPage />
          </Route>   
          <Route path='/hashtag/:hashtag' exact>
            <Header />            
            <HashtagPage />
          </Route>       
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
