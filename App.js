import React from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import { Text, View, Alert } from 'react-native';
import styles from './styles';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import distanceAlgo from './distanceAlgo';
import Indicator from './Indicator';
import { setSpeed } from './actions';

const Ap = connect(mapStateToProps, { setSpeed })(class App extends React.Component {
  state = {
    lat: 40.7162983,
    lon: -74.0331914,
    finished: false,
    animationInterval: 1000,
    animationSpeed: 1000,
    interval: null,
    distance: 1,
    l: 0,
    lo: 0,
    crossHairSize: 160,
    crossColor: '#000',
    winningDistance: .005,
    prevDistance: 1,
    hotOrCold: null,
  };

  async componentDidMount() {

    this.setState({ 
      animationInterval: setInterval(() => {
        this._animateIndicator();
      }, this.props.state.speed),
    });
    this._getLocation(false);
  }

  _getLocation = async end => {
    if (end) return;
    let finish = false;
    setTimeout(async () => {
      const { lat, lon } = this.state;
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        await this.setState({
          errorMessage: 'Permission to access location was denied',
        });
        clearInterval(this.state.interval);
        return;
      }

      let { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: 6 });
      const d = distanceAlgo(lat, lon, latitude, longitude);
      if (d <= this.state.winningDistance) {
        Alert.alert('Congratulations!', 'You found the beacon!', [{ text: 'Okay' }]);
        clearInterval(this.state.animationInterval);
        await this.setState({ crossColor: '#000' });
        finish = true;
      } else {
        const speed = this._getCrossHairSpeed(d);
        if (speed !== this.state.animationSpeed) {
          clearInterval(this.state.animationInterval);
          await this.setState({
            distance: d.toFixed(4),
            l: latitude,
            lo: longitude,
            animationSpeed: speed,
            animationInterval: setInterval(() => {
              this._animateIndicator();
            }, speed)
          });
        } else {
          await this.setState({ 
            distance: d.toFixed(4),
            l: latitude,
            lo: longitude,
            animationInterval: speed
          });
        }
      }
      this._getLocation(finish);
    }, 1000);
  };

  _determineHotterOrColder = d => {
    if (d === this.state.distance) return;
    if (d > this.state.distance) {

    } else {

    }
  };

  _displayHotterOrColder = () => {
    return 'ayooo';
  };

  _animateIndicator = () => {
    const color = this.state.crossColor === '#000'
      ? '#fff'
      : '#000';
    this.setState({ crossColor: color });
  };

  _getCrossHairSpeed = d => {
    let speed;
    if (d > 1.5) return 1300

    if (d < 1.5 && d > 1.45) {
      speed = 1250;
    } else if (d < 1.45 && d > 1.4) {
      speed = 1200;
    } else if (d < 1.4 && d > 1.35) {
      speed = 1150;
    } else if (d < 1.35 && d > 1.3) {
      speed = 1100;
    } else if (d < 1.3 && d > 1.25) {
      speed = 1050;
    } else if (d < 1.25 && d > 1.20) {
      speed = 1000;
    } else if (d < 1.2 && d > 1.15) {
      speed = 950;
    } else if (d < 1.15 && d > 1.10) {
      speed = 900;
    } else if (d < 1.10 && d > 1.05) {
      speed = 850;
    } else if (d < 1.10 && d > 1.05) {
      speed = 850;
    } else if (d < 1 && d > .8) {
      speed = 800;
    } else if (d < .8 && d > .75) {
      speed = 775;
    } else if (d < .75 && d > .7) {
      speed = 750;
    } else if (d < .7 && d > .65) {
      speed = 725;
    } else if (d < .65 && d > .6) {
      speed = 700;
    } else if (d < .6 && d > .55) {
      speed = 675;
    } else if (d < .55 && d > .5) {
      speed = 650;
    } else if (d < .5 && d > .45) {
      speed = 625;
    } else if (d < .45 && d > .4) {
      speed = 600;
    } else if (d < .4 && d > .35) {
      speed = 575;
    } else if (d < .35 && d > .3) {
      speed = 550;
    } else if (d < .3 && d > .25) {
      speed = 525;
    } else if (d < .25 && d > .2) {
      speed = 500;
    } else if (d < .2 && d > .15) {
      speed = 475;
    } else if (d < .15 && d > .1) {
      speed = 450;
    } else if (d < .05 && d > .01) {
      speed = 400;
    } else if (d < .01 && d > .08) {
      speed = 350;
    } else if (d < .08 && d > .07) {
      speed = 300;
    } else {
      speed = 100;
    }

    return speed;
  };

  render () {
    return (
        <View style={styles.container}>
          <View style={styles.headerView}>
            <Text style={styles.title}>Geo App</Text>
            <Text>Proof of Concept</Text>
          </View>
          <View>
            <Indicator
              speed={this.props.state.speed}
              crossHairSize={this.state.crossHairSize}
              crossColor={this.state.crossColor}
            />
          </View>
          <View style={styles.contentContainer}>
            <View>
              <Text>Within {this.state.distance} miles</Text>
            </View>
            <View>
              <Text>Lat: {this.state.l}</Text>
            </View>
            <View>
              <Text>Lo: {this.state.lo}</Text>
            </View>
            <View>
              <Text>Target</Text>
              <Text>lat: {this.state.lat}</Text>
              <Text>lon: {this.state.lon}</Text>
            </View>
            <View>
              <Text>Distance: {this.state.distance}</Text>
            </View>
          </View>
        </View>
    );
  }
});

function mapStateToProps(state) {
  return {
    state: {
      speed: state.speed,
    },
  };
}

class New extends React.Component {
  render() {
    return (
      <Provider store={createStore(rootReducer)}>
        <Ap />
      </Provider>
    );
  }
}

export default New;
