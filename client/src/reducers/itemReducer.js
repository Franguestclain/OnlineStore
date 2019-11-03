import {GET_ITEMS, GET_ITEMS_BY_ID, ADD_ITEMS, DELETE_ITEMS} from '../actions/types';


const initialState = {
    items: [],
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case GET_ITEMS_BY_ID:
            return {
                ...state,
                items: state.items.filter(item => item._id === action.payload._id)[0]
            };
        case DELETE_ITEMS:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            }
        default:
            return state;
    }
}