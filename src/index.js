import React from 'react'
import ReactDOM from 'react-dom'
import App from './App/App'
//Redux Setup
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import reducers from '../src/store/reducers/index'
import thunk from 'redux-thunk'
import { QueryClient, QueryClientProvider } from 'react-query'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(thunk)),
)

export const queryClient = new QueryClient()

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
)
