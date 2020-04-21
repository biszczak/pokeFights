import React, { Component } from 'react';
import classes from './Battlefield.css';
import Tazzon from '../../../components/Tazzon/Tazzon';
import Button from '../../../components/UI/Button/Button';
import Enemy from '../../../components/Enemy/Enemy';
import background from '../../../assets/forest_background_battlefield.png';

class Battlefield extends Component {
    constructor(props) {
        super(props);
        this.end = React.createRef();
        this.state = {
            battleFieldType: 'forest',
            turn: 1,
            // enemyMove: false,
            userTazzon: null,
            userAtacking: false,
            enemy: null,
            userHitDamage: null,
            enemyHitDamage: null,
            enemyMove: false,
            lastSuperAttack: 1,
            superAttack: true,
            endGame: null

        }
    }

    componentWillMount() {
        this.setState({
            userTazzon: this.props.tazzon,
            enemy: this.props.enemy
        })
    }

    componentDidUpdate() {
        if (this.state.enemyMove) {
            setTimeout(() => {
                this.enemyAttack()
            }, 2000);
        }
    }

    reloadApp() {
        this.props.playAgain()
    }

    userTazzonBasicAttackHandler() {
        let turn = this.state.turn;
        turn = turn + 1;
        const attackPower = (Math.floor(Math.random() * (120 - 90 + 1) + 95) * this.state.userTazzon.stats.attack) / 100;
        let enemy = this.state.enemy;
        let extraPower = null;
        const enemyDefence = enemy.stats.defence;
        const bonusesAttacks = this.state.userTazzon.strongestAttack;
        let userAtacking = true;
        bonusesAttacks.forEach(element => {
            element === this.state.enemy.type ? extraPower = 1.1 : extraPower = 1;
        });
        const totalAttack = (Math.floor(attackPower * extraPower)) - enemyDefence;
        enemy.stats.hp -= totalAttack;
        this.setState({
            enemy,
            enemyMove: true,
            userHitDamage: -totalAttack,
            userAtacking: userAtacking,
            turn: turn
        })
    }
    userTazzonSuperAttackHandler() {
        let lastSuperAttack = this.state.turn;
        let turn = this.state.turn;
        turn = turn + 1;
        const attackPower = (Math.floor(Math.random() * (120 - 90 + 1) + 95) * this.state.userTazzon.stats.attack) / 100;
        let enemy = this.state.enemy;
        let extraPower = null;
        const enemyDefence = enemy.stats.defence;
        const bonusesAttacks = this.state.userTazzon.strongestAttack;
        let userAtacking = true;
        bonusesAttacks.forEach(element => {
            element === this.state.enemy.type ? extraPower = 1.1 : extraPower = 1;
        });
        const totalAttack = (Math.floor(attackPower * extraPower)) - enemyDefence + (this.state.userTazzon.level * 7);
        enemy.stats.hp -= totalAttack;
        this.setState({
            enemy,
            enemyMove: true,
            userHitDamage: -totalAttack,
            userAtacking: userAtacking,
            turn: turn,
            lastSuperAttack: lastSuperAttack,
            superAttack: false
        })
    }

    enemyAttack() {
        if (this.state.enemy.stats.hp > 0) {
            let attackPower = (Math.floor(Math.random() * (120 - 90 + 1) + 95) * this.state.enemy.stats.attack) / 100;
            let extraPower = null;
            const bonusesAttacks = this.state.enemy.strongestAttack;
            bonusesAttacks.forEach(element => {
                element === this.state.userTazzon.type ? extraPower = 1.1 : extraPower = 1;
            });
            if (this.state.turn % 3 === 0) {
                attackPower = Math.floor(((attackPower + (this.state.enemy.level * 7)) - this.state.userTazzon.stats.defence) * extraPower);
            } else {
                attackPower = Math.floor((attackPower - this.state.userTazzon.stats.defence) * extraPower);
            }

            let userTazzon = this.state.userTazzon;
            userTazzon.stats.hp -= attackPower;
            this.setState({
                enemyHitDamage: attackPower,
                enemyMove: false,
                userAtacking: false,
            })
        }
    }

    endGame() {
        setTimeout(() => {
            this.setState({
                endGame: true
            })
        }, 1500);
    }

    render() {
        let superAttack = this.state.turn - this.state.lastSuperAttack >= 3;
        let endFight;
        if (this.state.userTazzon.stats.hp <= 0 || this.state.enemy.stats.hp <= 0) {
            endFight = true
        }

        if (endFight) {
            this.endGame()
        }

        return (
            this.state.endGame ? (
                <div className={classes.EndGame} style={{ background: `url(${background}) no-repeat` }}>
                    <Button name='Menu' clicked={() => this.reloadApp()}></Button>
                    <h3>{this.state.userTazzon.stats.hp <= 0 ? 'You loose!' : 'You win!'}</h3>
                </div>
            )
                : (
                    <div className={classes.Battlefield} style={{ background: `url(${background}) no-repeat` }}>
                        <div>
                            <Tazzon
                                userAtacking={this.state.userAtacking}
                                enemyMove={this.state.enemyMove}
                                enemyHitDamage={this.state.enemyHitDamage}
                                hp={this.state.userTazzon.stats.hp}
                                startHp={this.state.userTazzon.stats.startHp}
                                name={this.state.userTazzon.name}
                                level={this.state.userTazzon.level}
                                look={this.state.userTazzon.look.lookBack}>{this.state.userTazzon.stats.hp}</Tazzon>
                            <Enemy
                                userAtacking={this.state.userAtacking}
                                userHitDamage={this.state.userHitDamage}
                                enemyMove={this.state.enemyMove}
                                hp={this.state.enemy.stats.hp}
                                startHp={this.state.enemy.stats.startHp}
                                name={this.state.enemy.name}
                                level={this.state.enemy.level}
                                look={this.state.enemy.look.lookFront}>{this.state.enemy.stats.hp}</Enemy>
                            <div style={{ background: 'rgba(255,255,255, 0.8)', position: 'absolute', bottom: 0, right: 0, padding: '15px', display: 'flex', justifyContent: 'space-between', width: 120 }}>
                                <Button
                                    disabled={this.state.userAtacking}
                                    name='B'
                                    clicked={() => { this.userTazzonBasicAttackHandler() }}>Basic</Button>
                                <Button
                                    disabled={!(superAttack && !this.state.enemyMove)}
                                    name='S'
                                    clicked={() => { this.userTazzonSuperAttackHandler() }}>Super</Button>
                            </div>
                        </div>
                    </div>
                )

        );
    }
}

export default Battlefield;