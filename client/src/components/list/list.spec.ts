import BootstrapVue from "bootstrap-vue";
import { expect } from "chai";
import Vue from "vue";
import Component from "vue-class-component";
import { KeycloakService } from "../../keycloakservice";
import { ComponentTest } from "../../util/component-test";
import { ListComponent } from "./list";
@Component({
  template: require("./list.html"),
})
class MockListComponent extends ListComponent {
  constructor() {
    super();
    this.keycloakObj = KeycloakService.keycloak;
    this.keycloakObj.token = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    this.axios = {
      get: () => {
        return Promise.resolve({
          data: {
            docs: [{ _id: "5ba87a659219073708026c55", firstName: "Adelaide", lastName: "Poole" },
            { _id: "5ba87a659219073708026c58", firstName: "Adele", lastName: "Baker" },
            { _id: "5ba87a659219073708026c9c", firstName: "Adele", lastName: "Righini" },
            { _id: "5ba87a659219073708026c76", firstName: "Alma", lastName: "Willems" },
            { _id: "5ba87a659219073708026ca6", firstName: "Alvin", lastName: "Battaglia" },
            { _id: "5ba87a659219073708026c7d", firstName: "Anne", lastName: "Lynch" },
            { _id: "5ba87a659219073708026c89", firstName: "Belle", lastName: "de Wit" },
            { _id: "5ba87a659219073708026c59", firstName: "Bess", lastName: "Ballerini" },
            { _id: "5ba87a659219073708026ca8", firstName: "Bill", lastName: "de Jager" },
            { _id: "5ba87a659219073708026caa", firstName: "Billy", lastName: "van der Heijden" }],
            total: 100, limit: 10, page: 1, pages: 10,
          },
        });
      },
    };
  }
}

describe("List component", () => {
  let directiveTest: ComponentTest;

  beforeEach(() => {
    Vue.use(BootstrapVue);
    directiveTest = new ComponentTest("<div><list></list></div>", { list: MockListComponent });
  });

  it("should render correct contents", async () => {
    directiveTest.createComponent();

    await directiveTest.execute((vm) => { // ensure Vue has bootstrapped/run change detection
      // tslint:disable-next-line:no-debugger
      debugger;
      // console.log("i'm in test");
      // console.log(vm.$el.querySelectorAll(".content .table tbody tr"));
      expect(vm.$el.querySelectorAll(".content .table tbody tr").length).to.equal(10);
    });
  });
});
