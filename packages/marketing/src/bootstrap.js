import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from 'history';

import App from './App';

const mount = (el, { onNavigate, defaultHistory }) => {
    const history = defaultHistory || createMemoryHistory();

    if (onNavigate) {
        history.listen(onNavigate);
    }


    ReactDOM.render(
        <App history={history} />, el
    );

    return {
        onContainerNavigate({ pathname: nextPathname }) {
            const { pathname } = history.location;
            console.log(nextPathname);
            console.log(pathname);
            if (nextPathname !== pathname) {
                history.push(nextPathname);
            }
        }
    }

};


//if in dev run in isolation
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root');
    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}

export { mount };