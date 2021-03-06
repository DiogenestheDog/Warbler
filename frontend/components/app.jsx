import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from '../util/route_util'
import LoginContainer from './session/login_container';
import SignupContainer from './session/signup_container';
import SplashContainer from './splash/splash_container';
import NavBarContainer from './nav_bar/nav_bar_container';
import UserProfileContainer from './profile/user_profile_container';

const App = () => (
    <div>
        <NavBarContainer />
        <Switch>
            <AuthRoute exact path="/login" component={LoginContainer} />
            <AuthRoute exact path="/signup" component={SignupContainer} />
            <ProtectedRoute path="/profile" component={UserProfileContainer} />
            <ProtectedRoute path="/" component={SplashContainer} />
        </Switch>
    </div>
);

export default App