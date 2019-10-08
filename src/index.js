import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import './styles.css';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

const rootElement = document.getElementById('root');

const theme = createMuiTheme();
const Root = () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
ReactDOM.render(<Root />, rootElement);
