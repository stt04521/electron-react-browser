/**
 * Created by shishitengteng on 2018/3/14.
 */
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import player from './views/browser';

export const routes = (
    <HashRouter basname='/'>
        <Switch>
            <Route path='/browser' component={player} />
        </Switch>
    </HashRouter>
);