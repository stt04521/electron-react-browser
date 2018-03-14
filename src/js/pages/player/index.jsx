import React from 'react';
import ReactDOM from 'react-dom';
import { routes } from './router';
import '../../../style/normalize.css';
import '../../../style/iconfont.css';
import '../../../style/antdRest.css';
// router(redux);

ReactDOM.render(
    routes,
    document.getElementById('root')
);

