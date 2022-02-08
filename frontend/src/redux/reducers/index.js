import { combineReducers } from 'redux'
import userReducer from './userReducer'
import tokenReducer from './tokenReducer'
import historyReducer from './historyReducer'

const rootReducer = combineReducers({
	user: userReducer,
	token: tokenReducer,
	history: historyReducer,
})

export default rootReducer
