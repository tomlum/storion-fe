import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import WebFont from "webfontloader"
import { createStore, applyMiddleware, compose } from "redux"
import { Provider } from "react-redux"
import createSagaMiddleware from "redux-saga"
import reducers from "./reducers"
import sagas from "./sagas"

import "./index.css"
import App from "./pages/Routes"
import * as serviceWorker from "./serviceWorker"

WebFont.load({
	google: {
		families: ["Roboto:500", "Noto+Serif+TC:500"]
	}
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
	reducers,
	composeEnhancers(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(sagas)

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
