import React from "react"
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Profile from "./components/Profile/Profile"
import Page from "./components/Page/Page"

const Layout = () =>

    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/login' exact component={Login} />
            <Route path='/home' exact component={Home} />
            <Route path='/profile' exact component={Profile} />
            <Route path='/page' exact component={Page} />
            {/* <Route path='/family' exact component={FamilyPage} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/events' exact component={Events} />
            <Route path='/resetpassword' exact component={ResetPassword} /> */}
            {/* <Route component={PageNotFound} /> */}
        </Switch>
    </BrowserRouter>

export default Layout
