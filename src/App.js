import React from 'react';
import { Provider } from 'react-redux'
import './App.css';
import store, {persistor} from "./state/store/store";
import { Router } from 'react-router-dom';
import Routes from "./routes/Routes";
import history from './routes/History'
import { PersistGate } from 'redux-persist/integration/react'

export default class App extends React.Component {
    componentDidMount() {
        if (window.Cypress) {
            Object.assign(window, { store });
        }
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router history={history}>
                        <Routes/>
                    </Router>
                </PersistGate>
            </Provider>
        );
    }
}
