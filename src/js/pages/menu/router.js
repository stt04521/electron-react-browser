/**
 * Created by shishitengteng on 2018/3/1.
 */
import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import menu from './views/menu';

export const routes = (
    <HashRouter basname='/'>
        <div>
            <Route path='/menu' component={menu} />
        </div>
    </HashRouter>
);
