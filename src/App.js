import React from 'react';
import './App.css';
import Options from './Options.js'
import FishList from './FishList.js'
import fish_northern from './fish_northern'
import fish_southern from './fish_southern'
import MissingFish from './MissingFish';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addFish = this.addFish.bind(this);
    this.overwriteMonth = this.overwriteMonth.bind(this);
    this.changeHemisphere = this.changeHemisphere.bind(this);
    this.state = {
      caughtFish: [],
      hemisphere: "Northern Hemisphere",
      month: 3
    };
  }

  componentDidMount() {
    const caughtFishStorage = localStorage.getItem("ACNHCaughtFish") ? (localStorage.getItem("ACNHCaughtFish").split(',')) : []
    this.setState({caughtFish: caughtFishStorage})
  }

  overwriteMonth(newMonth) {
    this.setState({month: newMonth})
  }

  changeHemisphere(newHemisphere){
    this.setState({hemisphere: newHemisphere})
    localStorage.setItem('ACNHHemisphere', newHemisphere)
  }

  addFish(name) {
    let newFish = []
    if (this.state.caughtFish.includes(name)) {
      newFish = this.state.caughtFish.filter(function(v){return v !== name})
      this.setState({caughtFish: newFish})
    } else {
      newFish = [...this.state.caughtFish, name]
      this.setState({caughtFish: newFish})
    }
    localStorage.setItem('ACNHCaughtFish', newFish)
  }

  render() {
    const fishList = this.state.hemisphere === "Northern Hemisphere" ? fish_northern : fish_southern
    return (
      <div className="App">
        <header className="App-header">
          <span><a href="https://twitter.com/LeatsHere">Questions? Ask me on twitter!</a>Last updated: March 28 2020</span>
        </header>
        <div id="welcome-text">
          Hello! <br/>
          On this site you can find out which fish you can still catch in Animal Crossing: New Horizons.<br/>
          Just take a look at the options and then choose the fish you have already caught. You'll see the fish you still need to catch
          at the bottom :) <br />
          Don't worry! Your data gets saved between sessions!<br/>
          All data is taken from the <a href="https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)">Animal Crossing Fandom Wikia</a>.
        </div>
        <div className="Options">
          <Options month={this.state.month} overwriteMonth={this.overwriteMonth} changeHemisphere={this.changeHemisphere}/>
        </div>
        <div className="Fish">
          <FishList
            caughtFish={this.state.caughtFish}
            addFish={this.addFish}
            fishList={fishList}/>
          <MissingFish caughtFish={this.state.caughtFish} fishList={fishList} month={this.state.month}/>
        </div>
      </div>
    );
  }
}
export default App;
