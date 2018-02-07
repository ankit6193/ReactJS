import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ShowPost from './home';
import SignIn from './login';
import SignUp from './signup';
import EditPost from './edit';
import AddPost from './add';

import { BrowserRouter,Switch,Route } from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <main>
        <BrowserRouter>
        <Switch>
            <Route exact path = '/' component={ShowPost} />
            <Route path = '/addpost/:id?' component={AddPost} />
            <Route path = '/login' component={SignIn} />
            <Route path = '/signup' component={SignUp} />
            <Route path = '/edit' component={EditPost} />
        </Switch>
        </BrowserRouter>
    </main>

), document.getElementById('root'));
registerServiceWorker();
