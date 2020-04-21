import React from 'react';
import basicAttackIcon from '../../../assets/basicAttackIcon.png';
import classes from './Button.css'

// import classes from './Button.css';

const button = (props) => {
    let background = basicAttackIcon;
    const style = {
        background: `url(${background}) no-repeat`
    }
    // console.log(props.basicAttack)
    return (

        < div className={classes.ButtonContainer} >
            <button
                style={style}
                className={classes.Button}
                disabled={props.disabled}
                // style={props.basicAttack}
                onClick={props.clicked}>{props.name}
            </button>
            <p>{props.children}</p>
        </div >

    );
}

export default button;