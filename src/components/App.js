import {Switch, Route, BrowserRouter} from 'react-router-dom'
import SignInPage from './SignIn/SignInPage'
import Trending from "./Trending"
export default function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/sign-up' exact>
          <SignInPage />
        </Route>
        <Route path='/trending' exact>
          <Trending />
        </Route>
      </Switch>
    </BrowserRouter>
    
  );
}

