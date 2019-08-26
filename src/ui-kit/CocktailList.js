import React, {Component} from 'react';
import {  Platform, 
          StyleSheet, 
          Text, 
          View,
          Image,
          StatusBar,
          TouchableOpacity,
          FlatList } from 'react-native';

const Consts = require('../helpers/Consts');

export default class CocktailList extends Component {

    constructor(props) {
    super(props);
    }

    componentDidMount() {
    }

    _renderItem(item) {
        return  <View style={styles.itemContainer}>
                    <View style={{width: '30%', marginLeft: 10, marginTop: 10, marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={styles.drinkThumbImage} source={ { uri: item.strDrinkThumb } } />
                    </View>
                    <View style={styles.drinkNameContainer}>
                        <Text style={styles.drinkNameTextStyle}>{item.strDrink}</Text>
                    </View>    
                </View>
    }

    render() {
        return (
            <FlatList
                data={this.props.cocktailList}
                horizontal={false}
                keyExtractor={(item, index) => index.toString()}
                initialScrollIndex={0}
                renderItem={({ item }) => (
                    this._renderItem(item)
                )}/>
        );
    }
}

const styles = StyleSheet.create({
    flatListContainer: {
        backgroundColor: '#FFF',
        height: '100%'
    },
    itemContainer: {
        backgroundColor: '#FFF', 
        height: 120, 
        marginBottom: 20, 
        borderRadius: 8, 
        flexDirection: 'row'
    },
    drinkThumbImage: {
        height: 85, 
        width: 85, 
        resizeMode: 'cover', 
        borderRadius: 85 / 2
    },
    drinkNameContainer: {
        marginLeft: 10, 
        width: '60%', 
        marginTop: 10, 
        marginBottom: 10, 
        justifyContent: 'center', 
        alignItems: 'flex-start' 
    },
    drinkNameTextStyle: {
        fontSize: 23, 
        fontWeight: 'bold', 
        color: '#9B9B9B'
    }
});