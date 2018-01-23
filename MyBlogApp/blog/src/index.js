import {Signin,Signup} from './main'; 

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import {Route} from 'react-router';
import {HashRouter , Switch,BrowserRouter} from 'react-router-dom';

// var Router = window.ReactRouter.Router;
// var Route = window.ReactRouter.Route;
// var hashHistory = window.ReactRouter.hashHistory;

ReactDOM.render((
    <BrowserRouter>
    <Switch>
        <div>
            <Route exact path="/" component={Signin} ></Route>
            <Route path="/signup" component={Signup} ></Route>
        </div>
    </Switch>
    </BrowserRouter>),
    document.getElementById('app'));

registerServiceWorker();
