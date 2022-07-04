export type ScriptLoader = Promise<HTMLScriptElement>;

const cache: Record<string, any> = {};

const createLoader = (src: string): ScriptLoader => {
  return new Promise<HTMLScriptElement>((resolve, reject) => {
    const { document } = window;
    const script = document.createElement('script');

    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', src);

    script.addEventListener('error', (err) => {
      delete cache[src];
      reject(err);
    });

    script.addEventListener('load', () => {
      resolve(script);
    });

    document.head.appendChild(script);
  });
};

export const loadScript = (src: string): ScriptLoader => {
  const [cacheKey] = src.split('?');

  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const loader = createLoader(src);
  cache[cacheKey] = loader;

  return loader;
};
