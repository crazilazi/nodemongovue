import Vue from "vue";
import VueRouter, { Location, Route, RouteConfig } from "vue-router";
// import { KeycloakService } from "./keycloakservice";
import { makeHot, reload } from "./util/hot-reload";

const editComponent = () => import("./components/edit").then(({ EditComponent }) => EditComponent);
const detailsComponent = () => import("./components/details").then(({ DetailsComponent }) => DetailsComponent);
const listComponent = () => import("./components/list").then(({ ListComponent }) => ListComponent);

if (process.env.ENV === "development" && module.hot) {
  const editModuleId = "./components/edit";
  const detailsModuleId = "./components/details";
  const listModuleId = "./components/list";

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
  makeHot(editModuleId, editComponent,
    module.hot.accept("./components/edit", () =>
      reload(editModuleId, (require("./components/edit") as any).EditComponent)));

  makeHot(detailsModuleId, detailsComponent,
    module.hot.accept("./components/details", () =>
      reload(detailsModuleId, (require("./components/details") as any).DetailsComponent)));

  makeHot(listModuleId, listComponent,
    module.hot.accept("./components/list", () =>
      reload(listModuleId, (require("./components/list") as any).ListComponent)));
}

Vue.use(VueRouter);
// console.log(!KeycloakService.keycloak.authenticated);
// console.log(KeycloakService.keycloak);
// if (!KeycloakService.keycloak.authenticated) {
//   KeycloakService.init().then((authenticated) => {
//     console.log(!KeycloakService.keycloak.authenticated);
//     console.log(KeycloakService.keycloak);
//     // KeycloakService.login();
//   }).catch((error) => {
//     console.log(error);
//   });
// }
// console.log(!KeycloakService.keycloak.authenticated);
// console.log(KeycloakService.keycloak);
// if (!KeycloakService.keycloak.authenticated) {
//   KeycloakService.keycloak.init({ onLoad: "login-required" })
//     .success((authenticated) => {
//       console.log(authenticated ? "authenticated" : "not authenticated");
//       console.log(KeycloakService.keycloak.idTokenParsed);
//     })
//     .error((error) => {
//       console.log(error);
//     });
// }

export const createRoutes: (kcs: Keycloak.KeycloakInstance) => RouteConfig[] = (kcs: Keycloak.KeycloakInstance) => [
  {
    path: "/",
    name: "careuserList",
    component: listComponent,
    beforeEnter: (to, from, next) => {
      console.log("careuserList");
      // console.log(kcs);
      // console.log(to);
      // console.log(from);
      // console.log(next);
      // const t = kcs.isTokenExpired();
      // console.log(t);
      next();
    },
  },
  {
    path: "/details/:id",
    name: "careuserdetails",
    component: detailsComponent,
    beforeEnter: (to, from, next) => {
      console.log("careuserdetails");
      //  console.log(kcs);
      // console.log(to);
      // console.log(from);
      // console.log(next);
      next();
      // kcs.init({ onLoad: "login-required",
      // redirectUri: "http://localhost:9098/details/xcvsdfkljhsdkjhsdk" }).success((authenticated) => {
      //   console.log("chikka munde");
      //   next();
      // })
      //   .error((error) => {
      //     console.log(error);
      //   });
    },
  },
  {
    path: "/edit/:id",
    name: "careuseredit",
    component: editComponent,
    beforeEnter: (to, from, next) => {
      console.log("careuseredit");
      // console.log(kcs);
      // console.log(to);
      // console.log(from);
      // console.log(next);
      // const t = kcs.isTokenExpired();
      // console.log(t);
      next();
    },
  },
  // ,
  // {
  //   path: '/list',
  //   component: listComponent
  // }
];

export const createRouter = (keycloakservice: Keycloak.KeycloakInstance) =>
  new VueRouter({ mode: "history", routes: createRoutes(keycloakservice) });
