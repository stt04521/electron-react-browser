/**
 * Created by shishitengteng on 2018/3/20.
 */
import React, { Component } from 'react';

export default class BrowserPageSearch extends Component {
    shouldComponentUpdate (nextProps, nextState) {
        return (this.props.isActive !== nextProps.isActive);
    }
    componentDidUpdate (prevProps) {
        if (!prevProps.isActive && this.props.isActive)
            this.refs.input.getDOMNode().focus();
    }
    onKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            this.props.onPageSearch(e.target.value);
        }
    }
    render () {
        return (
            <div id='browser-page-search' className={this.props.isActive ? 'visible' : 'hidden'}>
                <input ref='input' type='text' placeholder='Search...' onKeyDown={this.onKeyDown} />
            </div>
        );
    }
}