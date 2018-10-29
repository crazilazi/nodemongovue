import axios, { AxiosResponse } from "axios";
// import * as Keycloak from "keycloak-js";
import { Component, Vue } from "vue-property-decorator";
import VueRouter, { Location, Route, RouteConfig } from "vue-router";
import { IUser, Paginate } from "../../Interface/User";
import { KeycloakService } from "../../keycloakservice";

@Component({
  template: require("./list.html"),

  methods: {
    gotoDetails(userId: string) {
      this.$router.push({ name: "careuserdetails", params: { id: userId } });
    },
  },
})
export class ListComponent extends Vue {
  searchuser = "";
  users: IUser[] = [];
  options: any[] = [{ value: 10, text: "10" }, { value: 20, text: "20" },
  { value: 30, text: "30" }];
  paginate = new Paginate();
  sortBy = "firstName";
  keycloakObj: Keycloak.KeycloakInstance = KeycloakService.keycloak;
  protected axios;
  private url = "http://localhost:3000/careuser";
  constructor() {
    super();
    this.axios = axios;
    this.paginate.limit = 10;
    this.paginate.page = 1;
  }
  data() {
    return {
      fields: [{ key: "firstName", sortable: true, variant: "success" },
      { key: "lastName", sortable: true, variant: "info" },
      { key: "details", sortable: false, variant: "warning" }],
    };
  }
  mounted() {
    this.$nextTick(() => {

      this.loadItems();
    });
  }
  searchUserAndAppendToList(ctx: string) {
    if (ctx.trim().length < 3) {
      this.loadItems();
      return;
    }
    this.paginate.page = 1;
    this.getDataBackFromServer
      (`${this.url}/${this.paginate.limit}/${this.paginate.page}/${this.sortBy}/${this.searchuser}`);
  }

  sortingChanged(ctx) {
    this.sortBy = `${ctx.sortDesc ? "-" : ""}${ctx.sortBy}`;
    this.getDataBackFromServer
      (`${this.url}/${this.paginate.limit}/${this.paginate.page}/${this.sortBy}/${this.searchuser}`);
  }

  limitChange(ctx) {
    // your code
    this.paginate.page = 1;
    const searchby: string = this.searchuser.length >= 3 ? this.searchuser : "all";
    this.getDataBackFromServer(`${this.url}/${this.paginate.limit}/${this.paginate.page}/${this.sortBy}/${searchby}`);
  }
  paginateChange(ctx) {
    const searchby: string = this.searchuser.length >= 3 ? this.searchuser : "all";
    this.getDataBackFromServer(`${this.url}/${this.paginate.limit}/${this.paginate.page}/${this.sortBy}/${searchby}`);
  }
  loadItems() {
    const searchby: string = this.searchuser.length >= 3 ? this.searchuser : "all";
    this.getDataBackFromServer(`${this.url}/${this.paginate.limit}/${this.paginate.page}/${this.sortBy}/${searchby}`);
  }

  private getDataBackFromServer(url: string) {
    console.log(`%c ${KeycloakService.keycloak.token}`, "background: blue; color: white");
    this.axios.get(url, { headers: { Authorization: `Bearer ${this.keycloakObj.token.toString()}` } })
      .then((response: AxiosResponse) => {
        this.paginate = response.data;
        this.users = [];
        this.users = this.paginate.docs;
      }, (error) => {
        console.log(error);
      });
  }
}
