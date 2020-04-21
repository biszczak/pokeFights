import React, { Component, } from 'react';
import Battlefield from './containers/Worlds/Battlefield/Battlefield';
import StartScreen from './components/StartScreen/StartScreen';

class App extends Component {
  constructor(props) {
    super(props)

    this.handleLocalStorage = this.handleLocalStorage.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.state = { getData: false, enemy: null, tazzon: null }
  }


  handleLocalStorage(enemy, tazzon) {
    this.setState({ getData: true, enemy: enemy, tazzon: tazzon })
  }

  playAgain() {
    this.setState({ getData: false, enemy: null, tazzon: null })
  }



  render() {
    localStorage.clear();
    let mainView = this.state.getData ? <Battlefield enemy={this.state.enemy} tazzon={this.state.tazzon} playAgain={this.playAgain} /> : <StartScreen handleLocalStorage={this.handleLocalStorage} />

    return (
      <div>
        {mainView}
      </div>
    );
  }
}

export default App;
