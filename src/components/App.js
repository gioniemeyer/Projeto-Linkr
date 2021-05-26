import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { useState } from "react";
import SignInPage from './SignIn/SignInPage'
import TimelinePage from "./Timeline/TimelinePage";
import HomePage from './Home/HomePage'
import Header from './Header';
import Trending from "./Trending/Trending";
import UserContext from '../contexts/UserContext';

export default function App() {
  const [userData, setUserData] = useState('');

  return (
    <BrowserRouter>
      <UserContext.Provider value={{userData, setUserData}}>
        <Switch>
          <Route path='/' exact>
            <HomePage/>
          </Route>
          <Route path='/sign-up' exact>
            <SignInPage />
          </Route>
          <Route path='/timeline' exact>
            <Header />
            <TimelinePage />
          </Route>
          <Route path='/trending' exact>
            <Header />
            <Trending />
          </Route>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
