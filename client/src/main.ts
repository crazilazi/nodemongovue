import Vue from "vue";
// tslint:disable-next-line:ordered-imports
import BootstrapVue from "bootstrap-vue";
import { createRouter } from "./router";
import { makeHot, reload } from "./util/hot-reload";
Vue.use(BootstrapVue);
// const navbarComponent = () => import('./components/navbar').then(({ NavbarComponent }) => NavbarComponent)
// const navbarComponent = () =>
// import(/* webpackChunkName: 'navbar' */'./components/navbar').then(({ NavbarComponent }) => NavbarComponent)

import "./sass/main.scss";

// if (process.env.ENV === 'development' && module.hot) {
//   const navbarModuleId = './components/navbar'

//   // first arguments for `module.hot.accept` and `require` methods have to be static strings
//   // see https://github.com/webpack/webpack/issues/5668
//   makeHot(navbarModuleId, navbarComponent,
//     module.hot.accept('./components/navbar', () =>
//     reload(navbarModuleId, (require('./components/navbar') as any).NavbarComponent)))
// }

// tslint:disable-next-line:no-unused-expression
new Vue({
  el: "#app-main",
  router: createRouter(),
  // render: (h) => h(App),
});
