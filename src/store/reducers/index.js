import  dataReducer from './dataReducer';
import statusReducer from './statusReducer'

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    dataReducer, statusReducer

})

export default rootReducer
