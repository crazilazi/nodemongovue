
import BootstrapVue from "bootstrap-vue";
import Vue from "vue";
import { KeycloakService } from "./keycloakservice";
import { createRouter } from "./router";
import { makeHot, reload } from "./util/hot-reload";
Vue.use(BootstrapVue);
const navbarComponent = () => import("./components/navbar").then(({ NavbarComponent }) => NavbarComponent);
// const navbarComponent = () =>
//   import(/* webpackChunkName: 'navbar' */"./components/navbar").then(({ NavbarComponent }) => NavbarComponent);

import "./sass/main.scss";

if (process.env.ENV === "development" && module.hot) {
  const navbarModuleId = "./components/navbar";

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
  makeHot(navbarModuleId, navbarComponent,
    module.hot.accept("./components/navbar", () =>
      reload(navbarModuleId, (require("./components/navbar") as any).NavbarComponent)));
}
// const keycloak = Keycloak({
//   realm: "CareplanningDev",
//   url: "https://identity.ahc.oneadvanced.io/auth",
//   clientId: "training-console",
// });
KeycloakService.init().success((authenticated) => {
  // tslint:disable-next-line:no-unused-expression
  console.log("%c I'm in initialization ", "background: #222; color: #bada55");
  new Vue({
    el: "#app-main",
    router: createRouter(KeycloakService.keycloak),
    components: {
      navbar: navbarComponent,
    },
    // beforeCreate: () => {
    //   // `this` points to the view model instance
    // },
    // render: (h) => h(App),
  });

  // console.log(keycloak);
});
