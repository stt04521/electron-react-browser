/**
 * Created by shishitengteng on 2018/3/20.
 */
import React, { Component } from 'react';
import BrowserPageSearch from './browser.page.search';
const pathlib = require('path');
const url = require('url');

const BrowserPageStatus = (props) => {
    let status = props.page.statusText;
    if (!status && props.page.isLoading) {
        status = 'Loading...';
    }
    return (
        <div
            id='browser-page-status'
            className={status ? 'visible' : 'hidden'}
        >
            {status}
        </div>
    );
};

const resize = () => {
    Array.prototype.forEach.call(document.querySelectorAll('webview'), (webview) => {
        let obj = webview;
        // var obj = webview && webview.querySelector('::shadow object')
        if (obj) {
            console.log(obj);
            obj.style.height = (window.innerHeight - 59) + 'px'; // -61 to adjust for the tabs and navbar regions
        }
    });
};

class BrowserPage extends Component {
    componentDidMount () {
        resize()
        // setup resize events
        window.addEventListener('resize', resize)
        // attach webview events
        for (let k in webviewEvents) {
            this.refs.webview.addEventListener(k, webviewHandler(this, webviewEvents[k]))
        }
        // set location, if given
        if (this.props.page.location) {
            this.navigateTo(this.props.page.location);
        }
    }
    componentWillUnmount () {
        window.removeEventListener('resize', resize);
    }

    onPageSearch = (query) => {
        this.refs.webview.executeJavaScript(`window.find(${query}, 0, 0, 1)`);
    }

    navigateTo = (l) => {
        let webview = this.refs.webview;
        webview.setAttribute('src', l);
    }
    render () {
        const preload = url.format({
            protocol: 'file:',
            pathname: pathlib.join(__dirname, '../preload/main.js'),
            slashes: true
        })
        return (
            <div
                id='browser-page'
                className={this.props.isActive ? 'webviewVisible' : 'webviewHidden'}
            >
                <BrowserPageSearch
                    isActive={this.props.page.isSearching}
                    inputRef={el => this.inputElement = el}
                    onPageSearch={this.onPageSearch}
                />
                <webview
                    ref='webview'
                    preload={preload}
                    onContextMenu={this.props.onContextMenu}
                />
                <BrowserPageStatus page={this.props.page} />
            </div>
        );
    }
}

const webviewHandler = (self, fnName) => {
    return function (e) {
        if (self.props[fnName])
            self.props[fnName](e, self.props.page, self.props.pageIndex)
    };
}

let webviewEvents = {
    'load-commit': 'onLoadCommit',
    'did-start-loading': 'onDidStartLoading',
    'did-stop-loading': 'onDidStopLoading',
    'did-finish-load': 'onDidFinishLoading',
    'did-fail-load': 'onDidFailLoad',
    'did-get-response-details': 'onDidGetResponseDetails',
    'did-get-redirect-request': 'onDidGetRedirectRequest',
    'dom-ready': 'onDomReady',
    'page-title-set': 'onPageTitleSet',
    'close': 'onClose',
    'destroyed': 'onDestroyed',
    'ipc-message': 'onIpcMessage',
    'console-message': 'onConsoleMessage',
    'new-window': 'onNewWindow'
}


export default BrowserPage;
