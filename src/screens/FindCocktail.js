import React, {Component} from 'react';
import {  Platform, 
          StyleSheet, 
          Text, 
          View,
          Image,
          ImageBackground,
          StatusBar,
          TouchableOpacity,
          TextInput,
          ActivityIndicator } from 'react-native';
import store from '../stores/SearchStore';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as API from '../services/API';
import CocktailList from '../ui-kit/CocktailList';

const Consts = require('../helpers/Consts');

export default class FindCocktail extends Component {

// Using the native header to provide user interactions
static navigationOptions = ({ navigation }) => ({
    title: null,
    gesturesEnabled: false,
    headerStyle:  {
      height: 110,
      backgroundColor: '#FFF',
      shadowColor: 'transparent',
      shadowRadius: 0,
      shadowOffset: { height: 0 }
    },
    headerTitle: (
      <View style={styles.searchBarContainer}>
        <View style={styles.textInputContainer}>
          <View style={styles.searchIconContainer}>
            <Image style={styles.searchIconImage} source={ require('../images/search_icon_grayed.png') }/>
          </View>
          <View style={styles.textInputBox}>
            <TextInput
                ref={(ref) => this.searchTextInput = ref}
                autoFocus={true} 
                keyboardType='default'
                returnKeyType='done'
                style={styles.textInputStyle}
                placeholder='Search'
                onChangeText={ (text) => { navigation.state.params.handleSearchTextChanged(text)} }/>
          </View>  
        </View>
      </View>
    ),
    headerRight: (
      <View style={styles.headerRightButtonContainer}>
        <TouchableOpacity onPress={ () => { this.searchTextInput.clear(); navigation.state.params.handleCancelClick();  }}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    )
  });

  constructor(props, context) {
    super(props, context);
    this.state = store.getState();
    self = this;
    // Subscribing to the redux state changing event
    store.subscribe( () => { this.setState(store.getState())});
  }

  componentDidMount() {
    // Mapping main component methods in order that they can be called inside the header (where "this" is not accessible)
    this.props.navigation.setParams({
      handleCancelClick: this.handleCancelClick,
      handleSearchTextChanged: this.handleSearchTextChanged
    });
  }

  // Handle action when searchbar "cancel" button is clicked
  handleCancelClick = () => {
    store.dispatch({ type: 'CLEAR_TEXT', payload: { searchText: '', isLoading: false}});
    store.dispatch({ type: 'FETCH_DATA', payload: { cocktailList: [], isLoading: false}});
  }

  // Update the cocktail list inside our state
  updateCocktaiList = (drinks) => {

    store.dispatch({ type: 'FETCH_DATA', payload: { cocktailList: (drinks == null) ? [] : drinks, isLoading: false } });
  }

  // Handle type text to know when to perform data fetch
  handleSearchTextChanged = (text) => {
    if (text.length >= 3) {
      store.dispatch({ type: 'TYPE_TEXT', payload: { searchText: text, isLoading: true}});
      this.performDataFetch(text);
    } else {
      store.dispatch({ type: 'CLEAR_TEXT', payload: { searchText: '', isLoading: false}});
      store.dispatch({ type: 'FETCH_DATA', payload: { cocktailList: [], isLoading: false}});
    }
  }

  // Performing the API fetching and passing result to the state
  performDataFetch(text) {
    store.dispatch({ type: 'FETCH_DATA', payload: { cocktailList: [], isLoading: true } });
    API.get('search.php?s=' + text).then(res => {
      if (res.status == Consts.HTTP_OK) {
        this.updateCocktaiList(res.data.drinks);
      } else {
        store.dispatch({ type: 'FETCH_DATA', payload: { cocktailList: [], isLoading: false } });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  // Render current view based in the actual component state
  getView() {
    if (this.state.isLoading == true) {
      return  <View style={styles.fullWidthCenterView}>
                <ActivityIndicator size="large" color='#FFF' style={ {marginBottom: 10}}/>
                <Text style={styles.loadingTextStyle}>Searching your favorite cocktail...</Text>
              </View>
    } else if ((this.state.isLoading == false) && (this.state.cocktailList.length > 0)) {
      return <CocktailList cocktailList={this.state.cocktailList} />
    } else {
      return  <View style={styles.fullWidthCenterView}>
                <Image style={styles.emptyStateImage} source={ require('../images/cocktail_empty_state.png') }/>
                <Text style={styles.emptyStateHeaderText}>Ops, we coudln't find any cocktail.</Text>
                <Text style={styles.emptyStateSubtext}>Please type cocktail name in the top search bar.</Text>
              </View>
    }
  }

  render() {
    return (
      <ImageBackground style={styles.mainContainer} source={ require('../images/main_bg.png') }>
        <StatusBar translucent={true} backgroundColor='transparent' barStyle="dark-content"/>
        <View style={styles.resultsContainer}>
          <View style={styles.listContainer}>
            { this.getView() }
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  searchBarContainer: {
    flexDirection: 'row'
  },
  textInputContainer: {
    backgroundColor: '#E9E9E9',
    borderRadius: 10,
    width: (Platform.OS == "android") ? '97%' : '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  cancelText: {
    color: Consts.colorPrimary,
    fontWeight: 'bold',
    fontSize: 15
  },
  headerRightButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  searchIconContainer: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  searchIconImage: {
    height: 20,
    width: 20,
    marginLeft: 15
  },
  textInputBox: {
    width: '80%', 
    marginLeft: 3, 
    marginTop: 5, 
    marginBottom: 5, 
    justifyContent: 'center'
  },
  textInputStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 0, // Adjust to avoid Android RN bug that cauases wasting of space in top and bottom of the TextInput
    paddingTop: 0
  },
  resultsContainer: {
    height: '100%'
  },
  listContainer: {
    marginLeft: 20,
    marginRight: 20,
    height: '100%',
    marginTop: 20
  },
  fullWidthCenterView: {
    height: '100%',
    justifyContent: 'center', 
    alignItems: 'center'
  },
  emptyStateHeaderText:{
    color: '#FFF', 
    fontSize: 18, 
    fontWeight: 'bold'
  },
  emptyStateSubtext: {
    color: '#FFF', 
    fontSize: 14, 
    fontWeight: 'normal', 
    marginTop: 5
  },
  emptyStateImage: {
    height: 110, 
    width: 110,
    resizeMode: 'contain', 
    marginBottom: 10
  },
  loadingTextStyle: {
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: 'bold', 
    textAlign: 'center'
  }
});