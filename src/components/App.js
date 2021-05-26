import {Switch, Route, BrowserRouter} from 'react-router-dom'

import SignInPage from './SignIn/SignInPage';
import HomePage from './Home/HomePage'
import { useState } from 'react';
import UserContext from '../contexts/UserContext';
import Trending from "./Trending"

export default function App() {

  const [user, setUser] = useState('');

  return (
    <BrowserRouter>

      <UserContext.Provider value={{user, setUser}}>
        <Switch>
        <Route path='/' exact>
            <HomePage/>
          </Route>
          <Route path='/sign-up' exact>
            <SignInPage />
          </Route>
          <Route path='/trending' exact>
          <Trending />
        </Route>
        </Switch>
      </UserContext.Provider>

    </BrowserRouter>
  );
}

