# Casumo Mobile - React Stack Proof of Concept

## Table of Contents

- [How it works](#how-it-works)
- [Usage](#development-instructions)
- [Resources](#resources)
- [Error Handling](./docs/error-handling.md)
- [Tracking](./docs/tracking.md)
- Modules
  - [CometD](./src/models/cometd/README.md)

## How it works

`mobile-react-stack-poc` contains a couple of services that showcases the proof
of concept that enable us to build react components and embed them in the
current mobile application.

### `mobile-react-stack`

In simple terms, this is just a `create-react-app` with a couple of components
in it. For the sake of the proof of concept most of the wiring is left untouched
as these are not crucial in proving that this concept could work, and all
these details can be revisited and refined later on.

This service runs in dev mode (`yarn start`), so every time a change in the
source files is made, the target app will be reloaded.

## Development instructions

### Setup

- Required Node version: **>=8.9.0**
- Install [casumo-frontend-proxy](https://github.com/Casumo/casumo-frontend-proxy#install) (2.5.0+) along with [certificate](https://github.com/Casumo/casumo-frontend-proxy/blob/master/docs/HTTPS.md).
- Clone [casumo-frontend](https://github.com/Casumo/casumo-frontend) repo and create file `.casumo-proxy-local` under `/web` with this snippet:

```json
{
  "reactStackService": {
    "local": "host.docker.internal:3000"
  }
}
```

- Within the `casumo-frontend` repository under `/web` run `casumo-proxy use local` in order to proxy to local

### Daily development

- Within the `casumo-frontend` repository under `/web` run `casumo-proxy start`
- Within the `casumo-frontend` repository under `/web/mobile` run `gulp dev`
- Within the `mobile-react-stack-poc` repository run `yarn start`
- Go to [https://mobile.dev](https://mobile.dev)

### Forcing the react-stack to be used

By default there is an A/B test used in mobile which randomly gives either the old-stack or the react-stack to a
certain amount of users. In order to force the react-stack to be the one in use just set a feature flag in the URL:
`https://mobile.dev?features=react-stack-enabled`

**Note:** You have to be logged in!

### Linking Dependencies

Whilst developing CUDL components should generally be done within the storybook environment it can be useful to
see your changes in place in the PoC. This can be achieved by making use of npm/yarn link:

- Navigate to the [cudl-react](https://github.com/Casumo/cudl-react) checkout on your computer and run `yarn link-components` then run `lerna run --scope=@casumo/<name_of_component> build -- --watch` so changes you make to the component will cause the component to build.
- Return to the root of this repo and run `yarn link <name_of_component>` (e.g `yarn link @casumo/cmp-button`) to link it inside the react-stack
- In the react-stack find the file that consumes the component you've linked and append `/dist` to its path.
- You can suppress a flow error on a specific line by prepending it with `// $FlowFixMe` so that webpack compiles.
- Any changes you make to the component will now flow through to the PoC

### Deploy to test

```sh
ssh <assigned-ssh-username>@ttrelease01

deploy-service mobile-react-stack-poc <branch-name>
```

### Deploy to production

```sh
ssh <assigned-ssh-username>@live-release

deploy-service mobile-react-stack-poc master
```

## Contributing

See the [contributing guidelines](CONTRIBUTING.md).

---

## Resources

- [FAC Business Idea](https://docs.google.com/document/d/1VUJQ2RFFmRxU06dJRsL1vDy2QBPGjQUEJG8kr5qV3eQ/preview)
- [Project Board](https://github.com/Casumo/Home/projects/91)
