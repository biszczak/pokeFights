import React from 'react';
import { Line } from 'rc-progress';

const ProgressHp = (props) => {
    return (
        <div>
            <Line percent={props.percent} strokeWidth="4" strokeColor="red" trailColor="#d3d3d3" />
        </div>

    );
}

export default ProgressHp;