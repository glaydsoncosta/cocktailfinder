import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const defaultState = {
    searchText: '',
    cocktailList: [],
    isLoading: false
}

function searchStore(state = defaultState, action) {
    switch (action.type) {
        case 'TYPE_SEARCH':
        case 'CLEAR_TEXT':
            return {...state, searchText: action.payload.searchText, isLoading: action.payload.isLoading};
        case 'FETCH_DATA':
            return {...state, cocktailList: action.payload.cocktailList, isLoading: action.payload.isLoading};
        default:
            return state;
    }
}

export default createStore(searchStore, applyMiddleware(thunk));