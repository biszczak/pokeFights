import React, { Component, Fragment } from 'react';
import ProgressHp from '../UI/ProgressHp/ProgressHp';
import DecreaseHp from '../UI/DecreaseHp/DecreaseHp';
// import hitSound from '../../assets/HitSound.mp3';

import classes from './Enemy.css';

class Enemy extends Component {
    state = {
        enemyAttack: this.props.enemyMove,
        userTazzon: this.props.userTazzon,
        enemy: this.props.enemy,
        enemyHp: null
    }

    attacking = false;
    componentDidMount() {
        this.attacking = true
    }


    render() {
        // Audio
        // let hitSoundEffect = new Audio(hitSound);
        // hitSoundEffect.loop = false;
        const startHp = this.props.startHp;
        let actualHp = this.props.hp;
        let percentageValue = Math.floor(actualHp / startHp * 100);
        if (percentageValue < 0) {
            percentageValue = 0;
        }

        let animationClass;
        if (this.props.userAtacking) {
            animationClass = `${classes.IsAttacked}`;
        } else if (!this.props.userAtacking && this.attacking) {
            animationClass = `${classes.EnemyAtacking}`;
            // hitSoundEffect.play();  AUDIO
            // attacking = false;
        }
        return (
            <Fragment>
                <div style={{ position: 'absolute', top: 335, right: 15, }}>
                    <div>
                        <ProgressHp percent={percentageValue} />
                    </div>
                    <div className={classes.Enemy} style={{ textAlign: 'center', fontSize: 12 }}>
                        <div style={{ backgroundColor: 'lightgrey', padding: '5px' }}>
                            <div>{this.props.name}</div>
                            <div>{this.props.level} Lv</div>
                        </div>
                    </div>
                    <DecreaseHp
                        additionalClass={this.props.userAtacking ? 'Active' : null}>{this.props.userHitDamage}HP</DecreaseHp>
                </div>
                <div className={classes.EnemyLook}>
                    <img
                        className={animationClass}
                        style={{ marginTop: 10, marginBottom: 10 }}
                        src={this.props.look}
                        alt="" />
                </div>
            </Fragment>
        );
    }
}

export default Enemy;