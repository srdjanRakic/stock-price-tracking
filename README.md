# [Stock Price Tracking App](https://stock-price-tracking.netlify.app/)

---

This project includes:
- [React](https://reactjs.org/) (with custom hooks)
- [Redux](https://redux.js.org/) (for state management in combination with [toolkit](https://redux-toolkit.js.org/))
- [Typescript](https://www.typescriptlang.org/)
- [Cypress](https://www.cypress.io/) (for e2e tests)
- [Material-UI](https://mui.com/)

## Up & Running

To install dependencies with Yarn, run:

```sh
$ yarn install
```

or to install with npm, run:

```sh
$ npm install
```

for runnging Cypress e2e tests, run:

```sh
$ yarn test:e2e
```

## Setup

Create an [IEX Cloud account](https://iexcloud.io/docs/api/#introduction) and acquire an auth token, then create a `.env` file with the token value(look at `.env.example` for example).

## Folder structure

The folder structure is functional/feature based:
- `Quote` - feature
- `store` - for global state initialization

Within the `Quote` feature a more technical folder structure exists, which makes it predictable and easy to navigate through:
- `components` - where the .tsx files live
- `hooks` - for custom React hooks
- `state` - for feature specific state management
- `types` - for the feature specific types

## State management

The global state is set up using [Redux](https://redux.js.org/) together with [redux-toolkit](https://redux-toolkit.js.org/), which makes the Redux implementation in React (especially in combination with Typescript) much much more user friendly.

The one thing I'm really enthusiastic about are so called [slices](https://redux-toolkit.js.org/tutorials/quick-start#create-a-redux-state-slice) which basically brings the actions and reducers together in great harmony. It uses [immer](https://github.com/immerjs/immer) in the background for immutable state modification, which I also really like.

## Custom hooks

The custom React hook in the `Quote` feature was created in the name of separation of concerns. It fetches some data from the [IEXcloud API](https://cloud.iexapis.com) and stores it in the global store. That's code you absolutely don't want in your components. The only thing that's exported is the `getQuote()` and `getCompanyInfo()` function which _is_ called in the component.
