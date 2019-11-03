import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import itemReducer from './itemReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';


const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    item: itemReducer,
    error: errorReducer,
    auth: authReducer
});

export default createRootReducer;