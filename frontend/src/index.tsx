import React from 'react';
import ReactDOM from 'react-dom';
import 'src/index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import store from 'src/store';
import Routes from './routes/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import OpeningPage from './pages/OpeningPage';
import NotFound404 from './pages/NotFound404';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'rpg-awesome/scss/rpg-awesome.scss';
import { SnackbarProvider } from 'notistack';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()


ReactDOM.render(
    <React.Fragment>
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <StoreProvider store={store}>
                <BrowserRouter basename="/character-generator">
                  <Routes />
                  <ToastContainer theme={'colored'} />
                </BrowserRouter>
            </StoreProvider>
        </SnackbarProvider>
    </React.Fragment>,
    document.getElementById('app')
);
