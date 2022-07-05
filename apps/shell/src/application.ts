import { loadRemoteModule } from 'remote-loader';
import { registerApplication, start } from 'single-spa';

registerApplication({
  name: 'skeleton',
  app: () => import('template/dist/Skeleton/SkeletonSpa'),
  activeWhen: '/',
});

registerApplication({
  name: 'header',
  app: () => loadRemoteModule('layout', 'Header'),
  activeWhen: '/',
  customProps: {
    some: 'value',
  },
});

start();
