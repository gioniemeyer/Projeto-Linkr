import {Switch, Route, BrowserRouter} from 'react-router-dom'
import SignInPage from './SignIn/SignInPage'
export default function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/sign-up' exact>
          <SignInPage />
        </Route>
      </Switch>
    </BrowserRouter>
    
  );
}

