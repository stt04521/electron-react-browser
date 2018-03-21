/**
 * Created by shishitengteng on 2018/3/19.
 */
import React, { Component } from 'react';
import BrowserTab from './browser.tab';

export default class BTabs extends Component {
    render () {
        let self = this
        return (
            <div id='browser-tabs'>
                <a className='close' onClick={this.props.onClose}><i className='fa fa-circle' /></a>
                <a className='minimize' onClick={this.props.onMinimize}><i className='fa fa-circle' /></a>
                <a className='maximize' onClick={this.props.onMaximize}><i className='fa fa-circle' /></a>
                {this.props.pages.map((page, i) => {
                    if (!page)
                        return false
                    function onClick (e) { self.props.onTabClick(e, page, i);}
                    function onContextMenu (e) { self.props.onTabContextMenu(e, page, i); }
                    function onClose (e) { e.preventDefault(); e.stopPropagation(); self.props.onTabClose(e, page, i);}
                    return (
                        <BrowserTab
                            key={`browser-tab-${i}`}
                            isActive={self.props.currentPageIndex === i}
                            page={page}
                            onClick={onClick}
                            onContextMenu={onContextMenu}
                            onClose={onClose}
                        />
                    );
                })}
                <a
                    className='newtab'
                    onClick={this.props.onNewTab}
                >
                    <i className='fa fa-plus' />
                </a>
            </div>
        );
    }
}
