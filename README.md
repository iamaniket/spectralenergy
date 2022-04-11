# spectral-energy

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### storybook for component

```
npm run storybook
```

### cypress test cases

```
npm run test
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Description of project

Created Vue3(typescript) based Web application with vuetify UI, storybook UI doc and cypress test cases.
"components" folder has all the components
-> Each folder contains a separate component
-> Each Component has it's 'skeleton' that is UI (NO business logic!)
-> Each Component has it's 'container' folder tht can contain business logic and responsible for communicating to skeleton for top down transfer of data.
-> index.ts exposes 'container' to other components.
-> Each folder should have a separate story to extend good design, To save time i have just one story in lineChart component.
"services" is responsible for getting the data from Backend
-> In our case we are just grabbing it from JSOn file.
"state" folder has state management related classes
-> state getters are responsible for providing data that can be consumed by components.

In our case "App.vue" will decide to call Services to grab the data and have other components to perform their operations.
