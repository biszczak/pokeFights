import React, { Component, Fragment } from 'react';
// import hitSound from '../../assets/HitSound.mp3';
import ProgressHp from '../UI/ProgressHp/ProgressHp';
import DecreaseHp from '../UI/DecreaseHp/DecreaseHp';
import classes from './Tazzon.css';

class Tazzon extends Component {
    state = {
        enemyAtacking: false
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.hp > this.props.hp) {
            this.setState({ enemyAtacking: true })

            setTimeout(() => {
                this.setState({ enemyAtacking: false })
            }, 1000);

        }
    }


    render() {
        // AUDIO
        // let hitSoundEffect = new Audio(hitSound);
        // hitSoundEffect.loop = false;
        // this.props.userAtacking ? hitSoundEffect.play() : hitSoundEffect.pause();
        const startHp = this.props.startHp;
        let actualHp = this.props.hp;
        let percentageValue = Math.floor(actualHp / startHp * 100);
        if (percentageValue < 0) {
            percentageValue = 0;
        }

        return (
            <Fragment>
                <div style={{ position: 'absolute', bottom: 105, left: 15, }}>
                    <div>
                        {/* <div style={{ textAlign: 'center' }}>{this.props.children}</div> */}
                        <ProgressHp percent={percentageValue} />
                    </div>
                    <div className={classes.Tazzon} style={{ textAlign: 'center', fontSize: 12 }}>
                        <div style={{ backgroundColor: 'lightgrey', padding: '5px' }}>
                            <div>{this.props.name}</div>
                            <div>{this.props.level} Lv</div>
                        </div>
                    </div>
                    <DecreaseHp
                        additionalClass={this.state.enemyAtacking ? 'EnemyActive' : null}>-{this.props.enemyHitDamage}HP</DecreaseHp>
                </div>
                <div className={classes.TazzonLook}>
                    <img style={{ marginTop: 10, marginBottom: 10 }} className={this.props.userAtacking ? `${classes.Atacking}` : null} src={this.props.look} alt="" />
                </div>
            </Fragment>
        );
    }
}

export default Tazzon;