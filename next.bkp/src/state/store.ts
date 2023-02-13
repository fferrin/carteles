import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import userReducer from "@/state/reducers/users";
import notificationReducer from "@/state/reducers/notification";

const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)
export default store