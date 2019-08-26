import React, {Component} from 'react';
import {  Platform, 
          StyleSheet, 
          Text, 
          View,
          Image,
          ImageBackground,
          StatusBar,
          TouchableOpacity } from 'react-native';

export default class Home extends Component {

  // No need for navigation options in this screen, so I clear everything
  static navigationOptions = ({ navigation }) => ({
      title: null,
      header: null,
      gesturesEnabled: false
  });  

  constructor(props) {
    super(props);
  }

  findCocktail = () => {
    this.props.navigation.navigate('FindCocktail');
  }

  render() {
    return (
      <ImageBackground style={styles.mainContainer} source={ require('../images/main_bg.png') }>
        <StatusBar translucent={true} backgroundColor='transparent' barStyle="light-content"/>
        <Image style={styles.logoContainer} source={ require('../images/app_logo.png') } />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonStyle} onPress={ () => { this.findCocktail() } }>
            <Image style={styles.searchIconContainer} source={ require('../images/search_icon.png') }/>
            <Text style={styles.buttonTextStyle}>Search your favorite cocktail</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    height: 150,
    width: 150, 
    resizeMode: 'contain'
  },
  buttonContainer: {
    width: '100%'
  },
  buttonStyle: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    height: 45,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowRadius: 15,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 10},
    elevation: 3,
    shadowOpacity: 0.3
  },
  searchIconContainer: {
    height: 24,
    width: 24,
    marginLeft: 25
  },
  buttonTextStyle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '400',
    color: '#727272',
    marginLeft: 10,
    width: '70%'
  }
});