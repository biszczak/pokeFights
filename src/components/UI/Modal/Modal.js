import React, { Component } from 'react';

import classes from './Modal.css';
// import Aux from '../../../hoc/Auxiliary/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        // console.log(`Aktualny props: ${this.props} Zmieniony props: ${nextProps}`)
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    componentDidUpdate() {
        // console.log('[Modal] willUpdate')
    }

    render() {
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0',
                    }}>
                    {this.props.children}
                </div>
            </React.Fragment>

        )
    }
}

export default Modal;
