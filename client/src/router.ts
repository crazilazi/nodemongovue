import Vue from "vue";
import VueRouter, { Location, Route, RouteConfig } from "vue-router";
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

export const createRoutes: () => RouteConfig[] = () => [
  {
    path: "/",
    component: listComponent,
  },
  {
    path: "/details/:id",
    name: "careuserdetails",
    component: detailsComponent,
  },
  {
    path: "/edit/:id",
    name: "careuseredit",
    component: editComponent,
  },
  // ,
  // {
  //   path: '/list',
  //   component: listComponent
  // }
];

export const createRouter = () => new VueRouter({ mode: "history", routes: createRoutes() });
