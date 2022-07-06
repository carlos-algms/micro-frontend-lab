import React from 'react';
import ReactDOM from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import Header from './Header';

const lifecycles = singleSpaReact({
  React,
  // This ignore is required because the single-spa-react package is not fully compatible with React 18
  // they are fixing it: https://github.com/single-spa/single-spa-react/pull/144
  // @ts-ignore
  ReactDOM,
  rootComponent: Header,
  errorBoundary(err, info, props) {
    return <div>Error with Header SPA</div>;
  },
  renderType: 'createRoot',
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
