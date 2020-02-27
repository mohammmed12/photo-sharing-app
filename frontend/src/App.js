import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect,Switch } from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation'
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth'

import { AuthContext } from './shared/context/auth-context'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  
  let routes;
  
  if (isLoggedIn) {
    routes=(
      <Switch>
      <Route exact path='/' component={Users}/>
      <Route path='/:userId/places' exact>
      <UserPlaces />
      </Route>
      <Route exact path='/places/new' component={NewPlace} />
      <Route path='/places/:placeId' component={UpdatePlace} />
      <Redirect to='/'/>
      </Switch>
    )
  }else {
    routes= (
      <Switch>
      <Route exact path='/' component={Users}/>
      <Route path='/:userId/places' exact>
      <UserPlaces />
      </Route>
      <Route exact path='/auth' component={Auth} />
      <Redirect to='/auth'/>
      </Switch>
    )
  }
  
  return <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
    <Router>
    <MainNavigation />
    <main>
    {routes}
    </main>
  </Router>
  </AuthContext.Provider>
}

export default App;
