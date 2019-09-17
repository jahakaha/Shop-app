import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducers";


const __DEV__ = process.env.NODE_ENV && process.env.NODE_ENV === "development";

export default !__DEV__
  ? createStore(reducer, applyMiddleware(thunk))
  : createStore(
      reducer,
      compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    );
