import {Switch, Route, BrowserRouter} from 'react-router-dom'
import SignInPage from './SignIn/SignInPage'
import Header from './Header';

export default function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Header />
        <Route path='/sign-up' exact>
          <SignInPage />
        </Route>
      </Switch>
    </BrowserRouter>    
  );
}

