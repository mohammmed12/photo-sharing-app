import React from 'react';
import { BrowserRouter as Router, Route, Redirect,Switch } from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation'
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
function App() {
  return <Router>
    <MainNavigation />
    <main>
    <Switch>
    <Route exact path='/' component={Users}/>
    <Route path='/:userId/places' exact>
      <UserPlaces />
    </Route>
    <Route exact path='/places/new' component={NewPlace} />
    <Route path='/places/:placeId' component={UpdatePlace} />
    <Redirect to='/' />
    </Switch>
    </main>
  </Router>
}

export default App;
