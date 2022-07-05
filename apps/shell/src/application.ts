import { loadRemoteModule } from 'remote-loader';
import { registerApplication, start } from 'single-spa';

registerApplication({
  name: 'home',
  app: () => loadRemoteModule('layout', 'Header'),
  activeWhen: '/',
  customProps: {
    some: 'value',
  },
});

start();
