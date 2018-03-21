/**
 * Created by shishitengteng on 2018/3/20.
 */
import React, { Component } from 'react';

const normalizedUri = (input) => {
    const prefix = 'http://';

    if (!/^([^:\/]+)(:\/\/)/g.test(input) && !prefix.includes(input)) {
        input = prefix + input;
    }

    return input;
}

const BrowserNavbarLocation = (props) => {
    const onKeyDown = (e) => {
        if (e.keyCode === 13)
            props.onEnterLocation(normalizedUri(e.target.value));
    };
    const onChange = (e) => {
        props.onChangeLocation(normalizedUri(e.target.value));
    };
    return (
        <input
            type='text'
            onKeyDown={onKeyDown}
            onChange={onChange}
            onContextMenu={props.onContextMenu}
            value={props.page.location}
        />
    );
};

const BrowserNavbarBtn = (props) => {
    return (
        <a
            href='javascript:void(0)'
            className={props.disabled ? 'disabled' : ''}
            title={props.title}
            onClick={props.onClick}
        >
            <i className={`fa fa-${props.icon}`} />
        </a>
    );
};

class BrowserNavbar extends Component {
    render () {
        return (
            <div id='browser-navbar'>
                <BrowserNavbarBtn
                    title='Rewind'
                    icon='angle-double-left fa-lg'
                    onClick={this.props.onClickHome}
                    disabled={!this.props.page.canGoBack}
                />
                <BrowserNavbarBtn
                    title='Back'
                    icon='angle-left fa-lg'
                    onClick={this.props.onClickBack}
                    disabled={!this.props.page.canGoBack}
                />
                <BrowserNavbarBtn
                    title='Forward'
                    icon='angle-right fa-lg'
                    onClick={this.props.onClickForward}
                    disabled={!this.props.page.canGoForward}
                />
                <BrowserNavbarBtn
                    title='Refresh'
                    icon='circle-thin'
                    onClick={this.props.onClickRefresh}
                    disabled={!this.props.page.canRefresh}
                />
                <div className='input-group'>
                    <BrowserNavbarLocation
                        onEnterLocation={this.props.onEnterLocation}
                        onChangeLocation={this.props.onChangeLocation}
                        onContextMenu={this.props.onLocationContextMenu}
                        page={this.props.page}
                    />
                </div>
            </div>
        );
    }
}
export default BrowserNavbar;