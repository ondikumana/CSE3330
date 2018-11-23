import React from "react"
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Login from './components/Login/Login'
import Me from './components/Home/Me'
import Profile from "./components/Profile/Profile"
import Page from "./components/Page/Page"
import HomeProvider from "./components/Home/HomeProvider"
import Messages from "./components/Messages/Messages"

const Layout = () =>
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/login' exact component={Login} />
            <HomeProvider>
                <Route path='/me' exact component={Me} />
                <Route path='/profile' exact component={Profile} />
                <Route path='/page' exact component={Page} />
                <Route path='/messages' exact component={Messages} />
            </HomeProvider>
            {/* <Route path='/family' exact component={FamilyPage} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/events' exact component={Events} />
            <Route path='/resetpassword' exact component={ResetPassword} /> */}
            {/* <Route component={PageNotFound} /> */}
        </Switch>
    </BrowserRouter>

export default Layout
