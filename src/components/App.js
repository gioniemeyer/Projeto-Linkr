import {Switch, Route, BrowserRouter} from 'react-router-dom'

import SignInPage from './SignIn/SignInPage'
import TimelinePage from "./Timeline/TimelinePage";
import HomePage from './Home/HomePage'

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
          <TimelinePage />
        </Route>
      </Switch>
    </BrowserRouter>
    
  );
}

