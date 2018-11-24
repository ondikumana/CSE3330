import React from "react"
import { Route, BrowserRouter, Switch, HashRouter } from 'react-router-dom'
import Login from './components/Login/Login'
import Me from './components/Home/Me'
import Profile from "./components/Profile/Profile"
import Page from "./components/Page/Page"
import HomeProvider from "./components/Home/HomeProvider"
import Messages from "./components/Messages/Messages"
import Register from "./components/Register/Register"
import Admin from "./components/Admin/Admin"

const Layout = () =>
    <HashRouter>
        <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <Route path='/admin' exact component={Admin} />
            <HomeProvider>
                <Route path='/me' exact component={Me} />
                <Route path='/profile' exact component={Profile} />
                <Route path='/page' exact component={Page} />
                <Route path='/messages' exact component={Messages} />
            </HomeProvider>
        </Switch>
    </HashRouter>

export default Layout
