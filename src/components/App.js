import { Switch, Route, BrowserRouter } from 'react-router-dom'

import SignInPage from './SignIn/SignInPage'
import TimelinePage from "./Timeline/TimelinePage";
import HomePage from './Home/HomePage'
import Header from './Header';
import Trending from "./Trending"

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>    
  );
}
