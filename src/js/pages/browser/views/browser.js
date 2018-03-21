/**
 * Created by shishitengteng on 2018/2/28.
 */
import React, { Component } from 'react';
import BrowserTabs from '../component/browser.tabs';
import BrowserNavbar from '../component/browser.navbar';
import BrowserPage from '../component/browser.page';

const electron = window.require('electron');
const { remote } = electron;
const { Menu, MenuItem, clipboard } = remote;
const urllib = require('url')

const createPageObject = (location) => {
    return {
        location: location || 'https://github.com/stt04521',
        statusText: false,
        title: 'new tab',
        isLoading: false,
        isSearching: false,
        canGoBack: false,
        canGoForward: false,
        canRefresh: false
    };
}

export default class BrowserChrome extends Component {
    constructor (props) {
        super(props);
        this.state = {
            pages: [createPageObject()],
            currentPageIndex: 0
        };
    }
    componentWillMount () {
        for (let k in this.tabHandlers) this.tabHandlers[k] = this.tabHandlers[k].bind(this);
        for (let k in this.navHandlers) this.navHandlers[k] = this.navHandlers[k].bind(this);
        for (let k in this.pageHandlers) this.pageHandlers[k] = this.pageHandlers[k].bind(this);
    }
    componentDidMount () {
        for (let k in this.webviewHandlers) {
            this.getWebView().addEventListener(k, this.webviewHandlers[k].bind(this))

            // attach keyboard shortcuts
            // :TODO: replace this with menu hotkeys
            let self = this
            document.body.addEventListener('keydown', e => {
                if (e.metaKey && e.keyCode === 70) { // cmd+f
                    // start search
                    self.getPageObject().isSearching = true
                    self.setState(self.state)

                    // make sure the search input has focus
                    self.getPage().querySelector('#browser-page-search input').focus();
                } else if (e.keyCode === 27) { // esc
                    // stop search
                    self.getPageObject().isSearching = false
                    self.setState(self.state);
                }
            });
        }
    }
    getWebView = (i) => {
        i = (typeof i === 'undefined') ? this.state.currentPageIndex : i;
        return this.refs['page-' + i].refs.webview;
    }
    getPage = (i) => {
        i = (typeof i === 'undefined') ? this.state.currentPageIndex : i;
        return this.refs['page-' + i];
    }
    getPageObject = (i) => {
        i = (typeof i === 'undefined') ? this.state.currentPageIndex : i;
        return this.state.pages[i];
    }
    createTab = (location) => {
        this.state.pages.push(createPageObject(location))
        this.setState({ pages: this.state.pages, currentPageIndex: this.state.pages.length - 1 });
    }
    closeTab = (pageIndex) => {
        // last tab, full reset
        if (this.state.pages.filter(Boolean).length === 1)
            return this.setState({ pages: [createPageObject()], currentPageIndex: 0 });

        this.state.pages[pageIndex] = null;
        this.setState({ pages: this.state.pages });

        // find the nearest adjacent page to make active
        if (this.state.currentPageIndex === pageIndex) {
            for (let i = pageIndex; i >= 0; i--) {
                if (this.state.pages[i])
                    return this.setState({ currentPageIndex: i });
            }
            for (let i = pageIndex; i < this.state.pages.length; i++) {
                if (this.state.pages[i])
                    return this.setState({ currentPageIndex: i });
            }
        }
    }
    tabContextMenu = (pageIndex) => {
        let self = this
        let menu = new Menu()
        menu.append(new MenuItem({ label: 'New Tab', click: () => { self.createTab(); } }))
        menu.append(new MenuItem({ label: 'Duplicate', click: () => { self.createTab(self.getPageObject(pageIndex).location); } }))
        menu.append(new MenuItem({ type: 'separator' }))
        menu.append(new MenuItem({ label: 'Close Tab', click: () => { self.closeTab(pageIndex); } }))
        menu.popup(remote.getCurrentWindow());
    }
    locationContextMenu = (el) => {
        let self = this
        let menu = new Menu()
        menu.append(new MenuItem({ label: 'Copy', click: () => {
            clipboard.writeText(el.value);
        }}))
        menu.append(new MenuItem({ label: 'Cut', click: () => {
            clipboard.writeText(el.value.slice(el.selectionStart, el.selectionEnd))
            self.getPageObject().location = el.value.slice(0, el.selectionStart) + el.value.slice(el.selectionEnd);
        }}))
        menu.append(new MenuItem({ label: 'Paste', click: () => {
            let l = el.value.slice(0, el.selectionStart) + clipboard.readText() + el.value.slice(el.selectionEnd)
            self.getPageObject().location = l;
        }}))
        menu.append(new MenuItem({ label: 'Paste and Go', click: () => {
            let l = el.value.slice(0, el.selectionStart) + clipboard.readText() + el.value.slice(el.selectionEnd)
            self.getPageObject().location = l
            self.getPage().navigateTo(l);
        }}))
        menu.popup(remote.getCurrentWindow());
    }
    webviewContextMenu = (e) => {
        let self = this
        let menu = new Menu()
        if (e.href) {
            menu.append(new MenuItem({ label: 'Open Link in New Tab', click: () => { self.createTab(e.href); } }))
            menu.append(new MenuItem({ label: 'Copy Link Address', click: () => { clipboard.writeText(e.href); } }));
        }
        if (e.img) {
            menu.append(new MenuItem({ label: 'Save Image As...', click: () => { alert('todo'); } }))
            menu.append(new MenuItem({ label: 'Copy Image URL', click: () => { clipboard.writeText(e.img); } }))
            menu.append(new MenuItem({ label: 'Open Image in New Tab', click: () => { self.createTab(e.img); } }));
        }
        if (e.hasSelection)
            menu.append(new MenuItem({ label: 'Copy', click: () => { self.getWebView().copy(); } }))
        menu.append(new MenuItem({ label: 'Select All', click: () => { self.getWebView().selectAll(); } }))
        menu.append(new MenuItem({ type: 'separator' }))
        menu.append(new MenuItem({ label: 'Inspect Element', click: () => { self.getWebView().inspectElement(e.x, e.y); } }))
        menu.popup(remote.getCurrentWindow());
    }

    tabHandlers = {
        onNewTab: () => {
            this.createTab();
        },
        onTabClick: (e, page, pageIndex) => {
            this.setState({ currentPageIndex: pageIndex });
        },
        onTabContextMenu: (e, page, pageIndex) => {
            this.tabContextMenu(pageIndex);
        },
        onTabClose: (e, page, pageIndex) => {
            this.closeTab(pageIndex);
        },
        onMaximize: () => {
            if (remote.getCurrentWindow())
                remote.getCurrentWindow().maximize()
            else
                remote.unmaximize();
        },
        onMinimize: () => {
            remote.getCurrentWindow().minimize();
        },
        onClose: () => {
            remote.getCurrentWindow().close();
        }
    }

    navHandlers = {
        onClickHome: () => {
            this.getWebView().goToIndex(0);
        },
        onClickBack: () => {
            this.getWebView().goBack();
        },
        onClickForward: () => {
            this.getWebView().goForward();
        },
        onClickRefresh: () => {
            console.log(this.getWebView());
            this.getWebView().reload();
        },
        onClickBundles: () => {
            let location = urllib.parse(this.getWebView().getURL()).path
            this.getPage().navigateTo('/bundles/view.html#' + location);
        },
        onClickVersions: () => {
            let location = urllib.parse(this.getWebView().getURL()).path
            this.getPage().navigateTo('/bundles/versions.html#' + location);
        },
        onClickSync: console.log.bind(console, 'sync'),
        onEnterLocation: (location) => {
            this.getPage().navigateTo(location);
        },
        onChangeLocation: (location) => {
            let page = this.getPageObject()
            page.location = location
            this.setState(this.state);
        },
        onLocationContextMenu: (e) => {
            this.locationContextMenu(e.target);
        }
    }
    pageHandlers = {
        onDidStartLoading: (e, page) => {
            page.isLoading = true
            page.title = false
            this.setState(this.state);
        },
        onNewWindow: (e, page, pageIndex) => {
            let webview = this.getWebView(pageIndex)
            webview.setAttribute('src', e.url);
        },
        onDomReady: (e, page, pageIndex) => {
            let webview = this.getWebView(pageIndex)
            page.canGoBack = webview.canGoBack()
            page.canGoForward = webview.canGoForward()
            page.canRefresh = true
            this.setState(this.state);
        },
        onDidStopLoading: (e, page, pageIndex) => {
            // update state
            let webview = this.getWebView(pageIndex)
            page.statusText = false
            page.location = webview.getURL()
            page.canGoBack = webview.canGoBack()
            page.canGoForward = webview.canGoForward()
            if (!page.title)
                page.title = page.location
            page.isLoading = false
            this.setState(this.state);
        },
        onPageTitleSet: (e) => {
            let page = this.getPageObject()
            page.title = e.title
            page.location = this.getWebView().getURL()
            this.setState(this.state);
        },
        onContextMenu: (e, page, pageIndex) => {
            this.getWebView(pageIndex).send('get-contextmenu-data', { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
        },
        onIpcMessage: (e, page) => {
            if (e.channel === 'status') {
                page.statusText = e.args[0]
                this.setState(this.state);
            }
            else if (e.channel === 'contextmenu-data') {
                this.webviewContextMenu(e.args[0]);
            }
        }
    }
    // Other code
    render () {
        const {
            pages,
            currentPageIndex
        } = this.state;
        const self = this
        return (
            <div >
                <BrowserTabs
                    ref={(el) => this.tabs = el}
                    pages={pages}
                    currentPageIndex={currentPageIndex}
                    {...this.tabHandlers}
                />
                <BrowserNavbar
                    ref={(el) => this.navbar = el}
                    {...this.navHandlers}
                    page={pages[currentPageIndex]}
                />
                {pages.map((page, i) => {
                    if (!page) {
                        return false;
                    } else {
                        return (
                            <BrowserPage
                                ref={`page-${i}`}
                                key={`page-${i}`}
                                {...self.pageHandlers}
                                page={page}
                                pageIndex={i}
                                isActive={i === self.state.currentPageIndex}
                            />
                        );
                    }
                })}
            </div>
        );
    }
}

