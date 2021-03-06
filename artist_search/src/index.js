import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './HomePage';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import ArtistHomePage from './ArtistHomePage';

// Uses ReactRouter to handle URL changes 

// Switch works like switch case and matches string and based on that redirects to components

// All component will be rendered on root div of index.html

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
