
import BootstrapVue from "bootstrap-vue";
import Vue from "vue";
import { KeycloakService } from "./keycloakservice";
import { createRouter } from "./router";
import "./sass/main.scss";
import { makeHot, reload } from "./util/hot-reload";
Vue.use(BootstrapVue);
const navbarComponent = () => import("./components/navbar").then(({ NavbarComponent }) => NavbarComponent);

if (process.env.ENV === "development" && module.hot) {
  const navbarModuleId = "./components/navbar";

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
  makeHot(navbarModuleId, navbarComponent,
    module.hot.accept("./components/navbar", () =>
      reload(navbarModuleId, (require("./components/navbar") as any).NavbarComponent)));
}

KeycloakService.init().success((authenticated) => {
  // console.log("%c I'm in initialization ", "background: black; color: white");
  // console.log(`%c ${KeycloakService.keycloak.refreshToken}`, "background: black; color: white");
  console.log("%c I'm in initialization - AccessToken ", "background: black; color: white");
  console.log(`%c ${KeycloakService.keycloak.token}`, "background: black; color: white");
  // initialize vue app
  new Vue({
    el: "#app-main",
    router: createRouter(KeycloakService.keycloak),
    components: {
      navbar: navbarComponent,
    },
  });
});
// keycloak events
KeycloakService.keycloak.onTokenExpired = () => {
  console.log("%c Token is expired", "background: yellow; color: black");
  // your code
  KeycloakService.keycloak.updateToken(0).success((refreshed) => {
    if (refreshed) {
      console.log("%c Token was successfully refreshed", "background: green; color: white");
      console.log("%c Token is refreshed - AccessToken", "background: black; color: white");
      console.log(`%c ${KeycloakService.keycloak.token}`, "background: black; color: white");
    } else {
      console.log("%c Token is still valid", "background: green; color: white");
    }
  }).error(() => {
    console.log("%c Failed to refresh the token, or the session has expired", "background: red; color: white");
  });
};
KeycloakService.keycloak.onAuthRefreshSuccess = () => {
  console.log("%c Token is refreshed - RefreshToken", "background: black; color: white");
  console.log(`%c ${KeycloakService.keycloak.refreshToken}`, "background: black; color: white");
};
