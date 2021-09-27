import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { Provider  } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers/blogReducer'
import thunk from 'redux-thunk'


const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
console.log(store)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)