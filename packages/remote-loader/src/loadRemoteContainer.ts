import { loadScript } from './loadScripts';

declare type FederatedModuleContainer = {
  get: (component: string) => Promise<() => any>;
  init: (shareScope: string) => Promise<void>;
};

export const loadRemoteContainer = async (
  name: string,
  url: string,
): Promise<FederatedModuleContainer> => {
  // load the remote
  await loadScript(url);

  // https://webpack.js.org/concepts/module-federation/#dynamic-remote-containers
  // Initializes the share scope. This fills it with known provided modules from this build and all remotes
  await __webpack_init_sharing__('default');

  // @ts-ignore
  const container = window[name] as FederatedModuleContainer | undefined;

  if (typeof container?.init !== 'function') {
    throw new Error(`Cannot load external remote: ${name} from url: ${url}`);
  }

  // Initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default);

  return container;
};

const cache: Record<string, Promise<any> | undefined> = {};

// TODO: how to get the URLs for the remote modules?
const urls: Record<string, string> = {
  layout: 'http://localhost:3001/remoteEntry.js',
};

export const loadRemoteModule = async (remoteName: string, moduleName: string) => {
  if (cache[remoteName]) {
    return cache[remoteName];
  }

  cache[remoteName] = (async () => {
    try {
      const container = await loadRemoteContainer(remoteName, urls[remoteName]);
      const loadModule = await container.get(`./${moduleName}`);
      return loadModule();
    } catch (error) {
      cache[remoteName] = undefined;
      throw error;
    }
  })();

  return cache[remoteName];
};
