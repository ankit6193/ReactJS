import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './HomePage';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import ArtistHomePage from './ArtistHomePage';


ReactDOM.render((
    <BrowserRouter>
    <Switch>
        <div>
            <Route exact path="/" component={HomePage} ></Route>
            <Route path="/home/:artistName" component={ArtistHomePage} ></Route>
        </div>
    </Switch>
    </BrowserRouter>),
document.getElementById('root'));
registerServiceWorker();
