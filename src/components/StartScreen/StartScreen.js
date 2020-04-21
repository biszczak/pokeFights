import React, { Component } from 'react';
import SelectTazzon from '../../containers/SelectTazzon/SelectTazzon';
import Button from '../UI/Button/Button';
import background from '../../assets/main_background.png';

import classes from './StartScreen.css';

class StartScreen extends Component {
    state = {
        clickPlay: false
    }
    render() {

        const startView = (
            <div className={classes.StartScreen} style={{ background: `url(${background}) no-repeat` }}>
                <Button
                    name='Play Game'
                    clicked={() => { this.setState({ clickPlay: true }) }}></Button>
            </div>
        )


        return (
            this.state.clickPlay ? <SelectTazzon handleLocalStorage={this.props.handleLocalStorage} /> : startView
        );
    }

}

export default StartScreen;