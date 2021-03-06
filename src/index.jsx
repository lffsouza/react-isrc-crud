import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import { App } from './app';
import './styles.less';

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();
import { configureFakeBackendAssociacao } from './_helpers';
configureFakeBackendAssociacao();
import { configureFakeBackendObra } from './_helpers';
configureFakeBackendObra();
import { configureFakeBackendFonogramas } from './_helpers';
configureFakeBackendFonogramas();



render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
);