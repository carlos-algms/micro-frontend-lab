## What's inside?

This repo is an experiment with single-spa + module-federation.
The idea is to prove that is possible to load a remote module and render it using single-spa.

The `apps/shell` folder is the **starting point**, it will load the first App start single-spa engine.

### Apps, Packages, and Remotes

- `apps/shell`: An orchestrator for loading remote packages and single-spa apps.
- `packages/remote-loader`: A Standard npm package for loading federated modules as consumable values
- `remotes/layout`: A remote module with layout components being exposed as single-spa applications

### Build

To build all apps and packages, run the following command:

```bash
yarn run build
```

### Develop

The local dev task will:

1. wait for the build of all packages to complete
1. run in parallel:
   1. shell on port 3000
   1. all remotes in different ports (defined on the `dev` task in their respective package.json)

```bash
yarn run dev
```

If you need to `watch` an specific package, you can do it by running:

```bash
cd packages/[package-name]
yarn run watch
```

## References:

- [Turbo Repo](https://turborepo.org/docs)
- [single-spa](https://single-spa.js.org/docs/getting-started-overview)
- [single-spa React](https://single-spa.js.org/docs/ecosystem-react/) (helper to create spa lifecycles like mount/unmount)
