/**
 * Created by shishitengteng on 2018/3/14.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import '../../../style/browser-tabs.css';
import '../../../style/browser.css';
import '../../../style/browser-page.css';
import '../../../style/browser-navbar.css';
import '../../../style/common.css';
import '../../../style/font-awesome.css';
import { routes } from './router';

// router(redux);

ReactDOM.render(
    routes,
    document.getElementById('root')
);
