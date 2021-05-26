import {Switch, Route, BrowserRouter} from 'react-router-dom'
import SignInPage from './SignIn/SignInPage'
import Header from './Header';
import HomePage from './Home/HomePage'
import { useState } from 'react';
import UserContext from '../contexts/UserContext';
import TimelinePage from "./Timeline/TimelinePage";

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
          <Route path='/timeline' exact>
            <TimelinePage />
          </Route>
      </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

