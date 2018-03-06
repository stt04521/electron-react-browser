/**
 * Created by shishitengteng on 2018/2/27.
 */
import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import player from './views/player';

export const routes = (
    <HashRouter basname='/'>
        <div>
            <Route path='/home' component={player} />
        </div>
    </HashRouter>
);
