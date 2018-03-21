/**
 * Created by shishitengteng on 2018/3/20.
 */
import React, { Component } from 'react';

export default class BrowserTab extends Component {
    render () {
        let title = this.props.page.title || 'loading'
        return (
            <div
                className={this.props.isActive ? 'active' : ''}
                title={title}
                onClick={this.props.onClick}
                onContextMenu={this.props.onContextMenu}
            >
                <span>
                    {title}
                    {this.props.page.isLoading ? <i className='fa fa-spinner fa-pulse' /> : undefined}
                </span>
                <a onClick={this.props.onClose}><i className='fa fa-close' /></a>
            </div>
        );
    }
}
