import React from 'react';

// import classes from './Backdrop.css';

const backdrop = (props) => {
    return (
        props.show ? <div onClick={props.clicked}></div> : null
    );
}

export default backdrop;