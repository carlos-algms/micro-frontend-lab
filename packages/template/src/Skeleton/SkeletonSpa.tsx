import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Skeleton from './Skeleton';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Skeleton,
  errorBoundary(err, info, props) {
    return <div>Error with Skeleton SPA</div>;
  },
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
