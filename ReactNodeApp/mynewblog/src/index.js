import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ShowPost from './home';
import SignIn from './login';
import SignUp from './signup';
import { BrowserRouter } from 'react-router-dom'
import { Switch,Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render((
    <main>
        <BrowserRouter>
        <Switch>
            <Route exact path = '/' component={ShowPost} />
            <Route path = '/login' component={SignIn} />
            <Route path = '/signup' component={SignUp} />
        </Switch>
        </BrowserRouter>
    </main>

), document.getElementById('root'));
registerServiceWorker();
