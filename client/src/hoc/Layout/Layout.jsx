import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Layout.scss';

const propTypes = {
    children: PropTypes.node
};

class Layout extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

Layout.propTypes = propTypes;

export default Layout;