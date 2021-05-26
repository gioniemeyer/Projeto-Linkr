import SignInPage from './SignIn/SignInPage'
import HomePage from './Home/HomePage'
import UserContext from '../contexts/UserContext';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { useState } from "react";
import TimelinePage from "./Timeline/TimelinePage";
import Header from './Header';
import Trending from "./Trending/Trending";
import UserContext from '../contexts/UserContext';
import LikesPage from './LikesPage';

export default function App() {
  const [user, setUser] = useState('');
  

  return (
    <BrowserRouter>
      <UserContext.Provider value={{user, setUser}}>
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
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
