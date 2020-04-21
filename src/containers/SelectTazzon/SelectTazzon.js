import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';

import classes from './SelectTazzon.css';
import background from '../../assets/select_background.png';
import pokeball from '../../assets/pokeball_1.png';
import pokeball2 from '../../assets/pokeball_2.png';
import pokeball3 from '../../assets/pokeball_3.png';
import bulbosaur from '../../assets/bulbosaur-big.png';
import bulbosaurFront from '../../assets/bulbosaur-front.png';
import bulbosaurBack from '../../assets/bulbosaur-back.png';
import charmander from '../../assets/charmander-big.png';
import charmanderFront from '../../assets/charmander-front.png';
import charmanderBack from '../../assets/charmander-back.png';
import squirtle from '../../assets/squirtle-big.png';
import squirtleFront from '../../assets/squirtle-front.png';
import squirtleBack from '../../assets/squirtle-back.png';

class SelectTazzon extends Component {
    state = {
        tazzons: [
            {
                name: 'Charmander',
                type: 'Fire',
                id: 1,
                level: 1,
                exp: 0,
                stats: {
                    startHp: 100,
                    hp: 100,
                    attack: 24,
                    defence: 10,
                    luck: 0.05
                },
                strongestAttack: ['Forest'],
                look: {
                    img: charmander,
                    lookFront: charmanderFront,
                    lookBack: charmanderBack
                }
            },
            {
                name: 'Bulbosaur',
                type: 'Grass',
                id: 2,
                level: 1,
                exp: 0,
                stats: {
                    startHp: 110,
                    hp: 110,
                    attack: 20,
                    defence: 12,
                    luck: 0.05
                },
                strongestAttack: ['Water'],
                look: {
                    img: bulbosaur,
                    lookFront: bulbosaurFront,
                    lookBack: bulbosaurBack
                }
            },
            {
                name: 'Squirtle',
                type: 'Water',
                id: 3,
                level: 1,
                exp: 0,
                stats: {
                    startHp: 105,
                    hp: 105,
                    attack: 22,
                    defence: 11,
                    luck: 0.05
                },
                strongestAttack: ['Fire'],
                look: {
                    img: squirtle,
                    lookFront: squirtleFront,
                    lookBack: squirtleBack
                }
            }
        ],
        selected: null,
        enemy: null,
        name: null,
        button: null,
        fight: false
    }

    randomTazzon(id) {
        let tazzonIndex = (Math.floor(Math.random() * 3));
        const tazzons = [...this.state.tazzons]
        const selectedTazzon = tazzons[tazzonIndex];
        tazzons.splice(tazzonIndex, 1);
        let enemyIndex = (Math.floor(Math.random() * 2));
        this.state.tazzons.forEach(tazzon => {
            if (tazzonIndex + 1 === tazzon.id) {
                this.setState({
                    selected: selectedTazzon,
                    enemy: tazzons[enemyIndex]
                })
            }
        });
        const selectedPokeball = document.getElementsByTagName('img')
        const selectedPokeballArr = [...selectedPokeball]
        selectedPokeballArr.forEach(element => {
            if (element.id !== id) {
                element.style.display = 'none';
            } else {
                element.style.top = 'calc(50% - 50px)';
                element.style.left = 'calc(50% - 50px)';
                setTimeout(() => {
                    element.src = pokeball2;
                }, 300);
                setTimeout(() => {
                    element.src = pokeball3;
                    const pokeLight = document.createElement("div");
                    pokeLight.setAttribute("class", `${classes.Light}`)
                    document.getElementById('PokeballsContainer').appendChild(pokeLight);
                }, 400);
                setTimeout(() => {
                    element.style.transform = 'scale(0)';
                    // element.style.display = 'none';
                    let selectedTazzon = document.createElement("img");
                    selectedTazzon.setAttribute("src", `${this.state.selected.look.img}`);
                    selectedTazzon.setAttribute("class", `${classes.Tazzon}`);
                    selectedTazzon.style.transform = 'scale(1)';
                    document.getElementById('PokeballsContainer').appendChild(selectedTazzon);
                }, 600);
            }
        });
    }

    setDataInLocal() {
        this.props.handleLocalStorage(this.state.enemy, this.state.selected)
    }

    render() {
        const pokeballs = this.state.tazzons.map(elem => {
            return <img
                id={'pokeball' + elem.id}
                className={classes.Pokeball}
                src={pokeball}
                alt=""
                key={'pokeball' + elem.id}
                onClick={() => this.randomTazzon('pokeball' + elem.id)}
            />
        })
        if (this.state.selected) {
            setTimeout(() => {
                this.setState({
                    name: this.state.selected.name,
                    button: <Button
                        // className={classes.FightButton}
                        name='Fight'
                        clicked={() => { this.setDataInLocal() }} />
                })
            }, 1100);
        }
        return (
            <div className={classes.SelectTazzon} style={{ background: `url(${background}) no-repeat` }}>
                {this.state.selected ? <h3>{this.state.name}</h3> : <h3>Select pokeball</h3>}
                <div id='PokeballsContainer'>
                    {pokeballs}
                </div>
                {this.state.selected ? this.state.button : null}
            </div>
        );
    }
}

export default SelectTazzon;