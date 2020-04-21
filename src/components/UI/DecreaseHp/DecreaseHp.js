import React, { Fragment, Component } from 'react';
import classes from './DecreaseHp.css'

class DecreaseHp extends Component {
    state = {
        userHit: false,
        enemyHit: false
    }

    render() {
        // console.log(this.props.additionalClass)
        return (
            < Fragment >
                <p className={[classes.Hp, classes[this.props.additionalClass]].join(' ')} >{this.props.children}</p>
            </Fragment >
        );
    }
}

export default DecreaseHp;